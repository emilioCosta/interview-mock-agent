from typing import List, Any
from langchain_core.messages import AIMessage, HumanMessage


def build_conversation_history(questions: List[str], answers: List[str]) -> List:
    history = []
    for q, a in zip(questions, answers):
        history.append(AIMessage(content=q))
        history.append(HumanMessage(content=a))
    return history


def extract_json_from_response(response_content: Any) -> str:
    # Extract text from content blocks if list
    if isinstance(response_content, list):
        json_str = ""
        for block in response_content:
            if isinstance(block, dict) and "text" in block:
                json_str += block["text"]
            elif isinstance(block, str):
                json_str += block
    else:
        json_str = str(response_content) if response_content else ""
    
    # Handle markdown code blocks
    if "```json" in json_str:
        json_str = json_str.split("```json")[1].split("```")[0].strip()
    elif "```" in json_str:
        json_str = json_str.split("```")[1].split("```")[0].strip()
    
    if not json_str.strip():
        raise ValueError("No JSON content extracted from response after all attempts")
    
    # Extract just the JSON object if there's extra text
    json_str = json_str.strip()
    if "{" in json_str and "}" in json_str:
        start_idx = json_str.find("{")
        end_idx = json_str.rfind("}") + 1
        json_str = json_str[start_idx:end_idx]
    
    return json_str
