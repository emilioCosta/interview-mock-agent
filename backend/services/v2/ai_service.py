import os
import json
import re
import logging
from typing import Any, Dict

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import ToolMessage
from langchain_core.tools import tool

from constants import prompts, limits
from services.utils import build_conversation_history, extract_json_from_response

load_dotenv()
logger = logging.getLogger(__name__)

llm = ChatAnthropic(
    model=limits.MODEL,
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
    max_tokens=limits.MAX_RESPONSE_TOKENS,
)

context = {
    "doc1": None,
    "doc2": None,
}

def _search_document(text: str, query: str, context_lines: int = 2) -> list:
    if not query or not text:
        return []
    
    lines = text.split('\n')
    relevant_passages = []
    query_lower = query.lower()
    keywords = [kw.strip() for kw in query_lower.split() if len(kw.strip()) > 2]
    
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(kw in line_lower for kw in keywords):
            start = max(0, i - context_lines)
            end = min(len(lines), i + context_lines + 1)
            passage = '\n'.join(lines[start:end])
            relevance_score = sum(line_lower.count(kw) for kw in keywords)
            relevant_passages.append({
                'passage': passage,
                'line_number': i + 1,
                'relevance': relevance_score
            })
    
    relevant_passages.sort(key=lambda x: x['relevance'], reverse=True)
    return relevant_passages[:3]


def _lookup_document_reference_impl(query: str, document: str = "both") -> str:
    results = []
    
    if document in ["doc1", "both"] and context["doc1"]:
        passages = _search_document(context["doc1"], query)
        if passages:
            results.append("**From Document 1 (Position Description):**")
            for i, p in enumerate(passages, 1):
                results.append(f"\n[Ref {i}] Line {p['line_number']}:\n{p['passage']}\n")
    
    if document in ["doc2", "both"] and context["doc2"]:
        passages = _search_document(context["doc2"], query)
        if passages:
            results.append("**From Document 2 (Job Offer):**")
            for i, p in enumerate(passages, 1):
                results.append(f"\n[Ref {i}] Line {p['line_number']}:\n{p['passage']}\n")
    
    if results:
        return '\n'.join(results)

    return f"No references found for: '{query}'"


@tool
def lookup_document_reference(query: str, document: str = "both") -> str:
    """Look up references in the documents by keyword search.
    
    Args:
        query: The search query to find in documents
        document: Which document to search - "doc1", "doc2", or "both" (default)
    
    Returns:
        Relevant passages with line numbers and relevance scores
    """
    return _lookup_document_reference_impl(query, document)

eval_prompt = ChatPromptTemplate.from_messages([
    ("system", prompts._EVAL_SYSTEM_V2),
    MessagesPlaceholder(variable_name="history"),
    ("human", "Evaluate the latest answer. Use reference lookup tools if needed to verify claims. Then respond with JSON only."),
])

final_json_prompt = ChatPromptTemplate.from_messages([
    ("system", prompts._FINAL_JSON_SYSTEM),
    MessagesPlaceholder(variable_name="history"),
    ("human", "Based on the conversation above, produce the final evaluation JSON now."),
])

llm_with_tools = llm.bind_tools([lookup_document_reference])
eval_chain = eval_prompt | llm_with_tools
final_json_chain = final_json_prompt | llm

def evaluate_answer(
    doc1_text: str,
    doc2_text: str,
    questions: list,
    answers: list
) -> Dict[str, Any]:
    global context
    context["doc1"] = doc1_text
    context["doc2"] = doc2_text
    
    history = build_conversation_history(questions, answers)
    
    response = eval_chain.invoke({
        "history": history,
    })
    
    iteration = 0
    max_iterations = limits.MAX_ITERATIONS
    
    while response.tool_calls and iteration < max_iterations:
        iteration += 1
        
        tool_results = []
        for tool_call in response.tool_calls:
            if tool_call["name"] == "lookup_document_reference":
                result = _lookup_document_reference_impl(
                    query=tool_call["args"].get("query", ""),
                    document=tool_call["args"].get("document", "both")
                )
                tool_results.append(
                    ToolMessage(
                        tool_call_id=tool_call["id"],
                        name=tool_call["name"],
                        content=result
                    )
                )
        
        history.append(response)
        history.extend(tool_results)
        
        response = eval_chain.invoke({"history": history})
    
    if response.tool_calls and iteration >= max_iterations:
        logger.warning(f"[V2] Max iterations ({max_iterations}) reached with pending tool calls.")
    
    history.append(response)
    
    final_response = final_json_chain.invoke({"history": history})
    
    try:
        json_str = extract_json_from_response(final_response.content)
        result = json.loads(json_str)
        
        return result
        
    except (json.JSONDecodeError, TypeError, ValueError) as e:
        logger.error(f"[V2] Failed to parse JSON: {e}")
        
        return {
            "off_topic": 0.5,
            "trust": 5,
            "plagiarism": "ORIGINAL",
            "grade": 5,
            "feedback": "Evaluation processing error. Please try again.",
            "is_enough": False,
            "next_question": "Can you elaborate on your answer?",
            "references_checked": []
        }
