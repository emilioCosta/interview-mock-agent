import logging
from constants import limits
from fastapi import APIRouter, HTTPException
from models import AnswerSubmit, EvaluationResult
from services import session_store
from services.v2 import ai_service

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/answer", response_model=EvaluationResult)
async def submit_answer_v2(payload: AnswerSubmit):
    try:
        session = session_store.get_session(payload.session_id)
    except KeyError:
        logger.warning(f"[V2] Session not found: {payload.session_id}")
        raise HTTPException(status_code=404, detail="Session not found")

    if session["is_complete"]:
        logger.info(f"[V2] Quiz already complete for session: {payload.session_id}")
        raise HTTPException(status_code=400, detail="Quiz is already complete")

    if not session["questions"]:
        logger.warning(f"[V2] No questions generated for session: {payload.session_id}")
        raise HTTPException(status_code=400, detail="No question has been generated yet")

    session["answers"].append(payload.answer)
    total_answered = len(session["answers"])

    try:
        answerResult = ai_service.evaluate_answer(
            doc1_text=session["doc1_text"],
            doc2_text=session["doc2_text"],
            questions=session["questions"],
            answers=session["answers"]
        )
    except Exception as e:
        logger.error(f"[V2] Evaluation error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Evaluation failed")

    if answerResult["off_topic"] > 0.7:
        logger.warning(
            f"[V2] Session {payload.session_id}: "
            f"Answer flagged as off-topic (score: {answerResult['off_topic']})"
        )
        raise HTTPException(status_code=403, detail="The answer is off-topic and must not be evaluated.")

    # Store evaluation results
    session["grades"].append(answerResult["grade"])
    session["trust_scores"].append(answerResult["trust"])
    session["feedbacks"].append(answerResult["feedback"])
    session["plagiarism_verdicts"].append(answerResult["plagiarism"])

    # Determine if quiz should continue
    nextQuestion = answerResult.get("next_question")
    is_quiz_complete = False

    if (answerResult["is_enough"] and total_answered >= limits.MIN_QUESTIONS) or limits.MAX_QUESTIONS <= total_answered:
        is_quiz_complete = True
        session["is_complete"] = True
        nextQuestion = None
    elif nextQuestion:
        session["questions"].append(nextQuestion)

    session_store.update_session(payload.session_id, session)

    refs_checked = answerResult.get("references_checked", [])
    if refs_checked:
        logger.info(f"[V2] References verified: {', '.join(refs_checked)}")

    return EvaluationResult(
        trust=answerResult["trust"],
        grade=answerResult["grade"],
        feedback=answerResult["feedback"],
        is_complete=is_quiz_complete,
        next_question=nextQuestion,
        question_number=total_answered,
        total_questions=len(session["questions"]),
        plagiarism=answerResult["plagiarism"],
    )
