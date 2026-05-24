from pydantic import BaseModel
from typing import Optional, List

class SessionResponse(BaseModel):
    session_id: str
    first_question: str


class AnswerSubmit(BaseModel):
    session_id: str
    answer: str


class EvaluationResult(BaseModel):
    trust: float
    grade: float
    feedback: str
    is_complete: bool
    next_question: Optional[str] = None
    question_number: int
    total_questions: int


class QuizSummary(BaseModel):
    session_id: str
    total_questions: int
    average_grade: float
    trust_scores: List[float]
    grades: List[float]
    feedback_list: List[str]
    questions: List[str]
    answers: List[str]
