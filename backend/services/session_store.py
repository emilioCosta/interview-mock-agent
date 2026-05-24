import uuid
from typing import Dict, Any

_sessions: Dict[str, Dict[str, Any]] = {}


def create_session(doc1_text: str, doc2_text: str) -> str:
    session_id = str(uuid.uuid4())
    _sessions[session_id] = {
        "doc1_text": doc1_text,
        "doc2_text": doc2_text,
        "questions": [],
        "answers": [],
        "grades": [],
        "trust_scores": [],
        "feedbacks": [],
        "is_complete": False,
        "chat_history": [],
    }
    return session_id


def get_session(session_id: str) -> Dict[str, Any]:
    session = _sessions.get(session_id)
    if not session:
        raise KeyError(f"Session {session_id} not found")
    return session


def update_session(session_id: str, data: Dict[str, Any]) -> None:
    if session_id not in _sessions:
        raise KeyError(f"Session {session_id} not found")
    _sessions[session_id].update(data)
