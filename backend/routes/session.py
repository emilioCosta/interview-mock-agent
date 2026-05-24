from fastapi import APIRouter, HTTPException, UploadFile, File
from models import SessionResponse, QuizSummary
from services import session_store, ai_service

router = APIRouter()


@router.post("/create", response_model=SessionResponse)
async def create_session(
    doc1: UploadFile = File(...),
    doc2: UploadFile = File(...),
):
    try:
        doc1_text = (await doc1.read()).decode("utf-8", errors="ignore")
        doc2_text = (await doc2.read()).decode("utf-8", errors="ignore")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read documents: {e}")

    if not doc1_text.strip() or not doc2_text.strip():
        raise HTTPException(status_code=400, detail="Both documents must have content.")

    session_id = session_store.create_session(doc1_text, doc2_text)

    first_question = ai_service.generate_first_question(doc1_text, doc2_text)

    session = session_store.get_session(session_id)
    session["questions"].append(first_question)
    session_store.update_session(session_id, session)

    return SessionResponse(session_id=session_id, first_question=first_question)


@router.get("/{session_id}/summary", response_model=QuizSummary)
async def get_summary(session_id: str):
    try:
        session = session_store.get_session(session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Session not found")

    # if not session["is_complete"]:
    #     raise HTTPException(status_code=400, detail="Quiz is not yet complete")

    grades = session["grades"]
    avg = sum(grades) / len(grades) if grades else 0

    return QuizSummary(
        session_id=session_id,
        total_questions=len(session["questions"]),
        average_grade=round(avg, 2),
        grades=grades,
        trust_scores=session["trust_scores"],
        feedback_list=session["feedbacks"],
        questions=session["questions"],
        answers=session["answers"],
    )
