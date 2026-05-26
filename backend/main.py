from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import session
from routes.v1 import quiz as quiz_v1
from routes.v2 import quiz as quiz_v2

app = FastAPI(title="InterviewMockAgent API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session.router, prefix="/api/v1/session", tags=["session"])
app.include_router(session.router, prefix="/api/v2/session", tags=["session"])
app.include_router(quiz_v1.router, prefix="/api/v1/quiz", tags=["quiz"])
app.include_router(quiz_v2.router, prefix="/api/v2/quiz", tags=["quiz"])


@app.get("/health")
def health():
    return {"status": "ok", "engine": "langchain", "features": ["v1", "v2-autonomous-references"]}
