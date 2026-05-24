from fastapi import APIRouter, HTTPException
from models import AnswerSubmit, EvaluationResult
from services import session_store, ai_service

router = APIRouter()


@router.post("/answer", response_model=EvaluationResult)
async def submit_answer(payload: AnswerSubmit):
    """Submit an answer; receive grade, verdict, feedback, and next question."""
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

    # Guardrails from not running from the question topic

    result = ai_service.evaluate_answer(
        doc1_text=session["doc1_text"],
        doc2_text=session["doc2_text"],
        questions=session["questions"],
        answers=session["answers"]
    )
    session["grades"].append(result["grade"])
    session["trust_scores"].append(result["trust"])
    session["feedbacks"].append(result["feedback"])

    # Check from quiz completion

    if result["is_complete"]:
        session["is_complete"] = True
    elif result.get("next_question"):
        session["questions"].append(result["next_question"])

    session_store.update_session(payload.session_id, session)

    return EvaluationResult(
        trust=result["trust"],
        grade=result["grade"],
        feedback=result["feedback"],
        is_complete=result["is_complete"],
        next_question=result.get("next_question"),
        question_number=total_answered,
        total_questions=len(session["questions"]),
    )
