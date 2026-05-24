import os
import json
from typing import Any, Dict

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.output_parsers import JsonOutputParser

from constants import prompts, limits

load_dotenv()

llm = ChatAnthropic(
    model=limits.MODEL,
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
    max_tokens=800,
)

question_prompt = ChatPromptTemplate.from_messages([
    ("system", prompts._QUESTION_SYSTEM),
    ("human", "Document 1:\n{doc1}\n\nDocument 2:\n{doc2}\n\nGenerate the first exam question."),
])

question_chain = question_prompt | llm

eval_prompt = ChatPromptTemplate.from_messages([
    ("system", prompts._EVAL_SYSTEM),
    MessagesPlaceholder(variable_name="history"),
    ("human", "Evaluate my last answer and follow the JSON schema."),
])

eval_chain = eval_prompt | llm | JsonOutputParser()

def generate_first_question(doc1_text: str, doc2_text: str) -> str:
    result = question_chain.invoke({"doc1": doc1_text, "doc2": doc2_text})
    return result.content.strip()


def evaluate_answer(
    doc1_text: str,
    doc2_text: str,
    questions: list,
    answers: list
) -> Dict[str, Any]:
    history = []
    for q, a in zip(questions, answers):
        history.append(AIMessage(content=q))
        history.append(HumanMessage(content=a))

    result = eval_chain.invoke({
        "doc1": doc1_text,
        "doc2": doc2_text,
        "history": history,
        "min_q": limits.MIN_QUESTIONS,
        "max_q": limits.MAX_QUESTIONS,
    })
    return result
