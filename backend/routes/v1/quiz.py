import logging

from constants import limits
from routes import session
from fastapi import APIRouter, HTTPException
from models import AnswerSubmit, EvaluationResult
from services import session_store
from services.v1 import ai_service

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/answer", response_model=EvaluationResult)
async def submit_answer(payload: AnswerSubmit):
    try:
        session = session_store.get_session(payload.session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Session not found")

    if session["is_complete"]:
        raise HTTPException(status_code=400, detail="Quiz is already complete")

    if not session["questions"]:
        raise HTTPException(status_code=400, detail="No question has been generated yet")

    # Append answer so eval_chain sees the full pair
    session["answers"].append(payload.answer)
    total_answered = len(session["answers"])

    answerResult = ai_service.evaluate_answer(
        doc1_text=session["doc1_text"],
        doc2_text=session["doc2_text"],
        questions=session["questions"],
        answers=session["answers"]
    )

    if answerResult["off_topic"] > 0.7:  # Adjust threshold as needed
        logger.warning(f"Answer flagged as off-topic (score: {answerResult['off_topic']}). Rejecting answer.")
        raise HTTPException(status_code=403, detail="The answer is off-topic and must not be evaluated.")

    session["grades"].append(answerResult["grade"])
    session["trust_scores"].append(answerResult["trust"])
    session["feedbacks"].append(answerResult["feedback"])

    logger.warning(f"Total responses answered: {total_answered}.")
    nextQuestion = answerResult.get("next_question")
    if (answerResult["is_enough"] and total_answered >= limits.MIN_QUESTIONS) or limits.MAX_QUESTIONS <= total_answered:
        logger.warning(f"Total responses answered: {total_answered}.")
        session["is_complete"] = True
        nextQuestion = None
    elif answerResult.get("next_question"):
        session["questions"].append(nextQuestion)

    session_store.update_session(payload.session_id, session)

    return EvaluationResult(
        trust=answerResult["trust"],
        grade=answerResult["grade"],
        feedback=answerResult["feedback"],
        is_complete=session["is_complete"],
        next_question=nextQuestion,
        question_number=total_answered,
        total_questions=len(session["questions"]),
        plagiarism=answerResult["plagiarism"],
    )
