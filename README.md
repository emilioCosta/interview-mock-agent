# DocuQuiz — AI-Powered Document Examination Platform

An intelligent examination platform built with **LangChain + FastAPI + React**.

Upload two documents as context, and an LLM-powered examiner will:
- 🤖 Ask 10-20 adaptive questions based on the documents
- 🎓 Grade each answer from 0-10
- 🔍 Detect copy-pasted responses
- 🛡️ Identify AI-generated answers
- 📊 Provide detailed feedback and final summary

## Features

✅ **Document Upload** — Upload two reference documents (TXT, PDF, etc.)  
✅ **Adaptive Questioning** — AI asks 10-20 questions, stopping when it has enough information  
✅ **Smart Evaluation** — Grades answers and detects copy-paste or AI-generated content  
✅ **Real-time Feedback** — Get instant feedback on each answer  
✅ **Comprehensive Summary** — View all questions, answers, grades, and verdicts  
✅ **Session Management** — Track multiple quiz sessions  

## Project Structure

```
docuquiz/
├── backend/
│   ├── main.py                   # FastAPI entry point
│   ├── requirements.txt          # Dependencies
│   ├── .env.example              # Environment variables template
│   ├── models/
│   │   └── __init__.py           # Pydantic data models
│   ├── routes/
│   │   ├── session.py            # Session creation & summary endpoints
│   │   └── quiz.py               # Answer submission endpoint
│   └── services/
│       ├── ai_service.py         # LangChain AI chains
│       └── session_store.py      # In-memory session storage
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx               # Main component
        ├── main.jsx              # Entry point
        ├── index.css
        ├── hooks/
        │   └── useQuiz.js        # Quiz state management
        ├── pages/
        │   ├── UploadPage.jsx    # Document upload
        │   ├── QuizPage.jsx      # Answer submission
        │   └── SummaryPage.jsx   # Results display
        └── utils/
            └── api.js            # Axios API client
```

## Quick Start

### Prerequisites

- **Python 3.9+**
- **Node.js 18+** and npm
- **Anthropic API Key** (from [console.anthropic.com](https://console.anthropic.com))

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure API key
cp .env.example .env
# Edit .env and add your Anthropic API key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Option 1: Run Both Backend and Frontend (Recommended)

**Terminal 1 — Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn main:app --reload --port 8000
```

Backend will be available at: **http://localhost:8000**  
API documentation: **http://localhost:8000/docs**

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### Option 2: Production Build

**Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn main:app --port 8000
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## API Endpoints

### Create Quiz Session
```
POST /api/session/create
Content-Type: multipart/form-data

Body:
  - doc1: File (document 1)
  - doc2: File (document 2)

Response:
  {
    "session_id": "unique-session-id",
    "first_question": "Your first exam question..."
  }
```

### Submit Answer
```
POST /api/quiz/answer
Content-Type: application/json

Body:
  {
    "session_id": "session-id",
    "answer": "User's answer text"
  }

Response:
  {
    "verdict": "original|copy_pasted|ai_generated",
    "grade": 8.5,
    "feedback": "Excellent response because...",
    "is_complete": false,
    "next_question": "Next question...",
    "question_number": 2,
    "total_questions": 15
  }
```

### Get Quiz Summary
```
GET /api/session/{session_id}/summary

Response:
  {
    "session_id": "session-id",
    "total_questions": 15,
    "average_grade": 7.8,
    "trust_scores": ["original", "copy_pasted", ...],
    "grades": [8.5, 6.0, ...],
    "feedback_list": ["Feedback 1", ...],
    "questions": ["Question 1", ...],
    "answers": ["Answer 1", ...]
  }
```

## How It Works

1. **Upload Documents** — Upload two reference documents (any text format)
2. **First Question** — System generates an opening question about the documents
3. **Answer & Evaluate** — You answer, and the AI:
   - Grades the answer (0-10)
   - Detects if you copy-pasted from the document
   - Detects if the answer was AI-generated
   - Provides constructive feedback
4. **Adaptive Questions** — The system continues asking (10-20 questions total) until it has enough information
5. **Summary** — View your results, average grade, and detailed feedback for each answer

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Anthropic API Key (required)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Optional: Adjust model if needed
# MODEL=claude-sonnet-4-20250514

# Optional: Adjust question range
# MIN_QUESTIONS=10
# MAX_QUESTIONS=20
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | FastAPI, LangChain, Claude AI (Anthropic) |
| **Frontend** | React 18, Vite, Axios |
| **AI Model** | Claude Sonnet 4 |
| **State Management** | React Hooks |
| **Styling** | CSS Modules |

## Troubleshooting

### Backend won't start
- Check Python version: `python --version` (must be 3.9+)
- Verify venv is activated
- Ensure all dependencies installed: `pip install -r requirements.txt`

### "Module not found" errors
- Activate virtual environment first
- Reinstall dependencies: `pip install --upgrade -r requirements.txt`

### Frontend won't connect to backend
- Check backend is running on port 8000
- Verify CORS is enabled (should be in `main.py`)
- Check browser console for errors

### API Key errors
- Verify `.env` file exists in `backend/` directory
- Check `ANTHROPIC_API_KEY` is set correctly
- Ensure no extra spaces or quotes in `.env`

### Questions/Feedback

For issues or suggestions, check the logs in both terminal windows for detailed error messages.

uvicorn main:app --reload
# → http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## LangChain Architecture

### Chain 1 — `question_chain`
```
ChatPromptTemplate → ChatAnthropic → .content
```
Takes `doc1` + `doc2`, returns the first question as plain text.

### Chain 2 — `eval_chain`
```
ChatPromptTemplate(MessagesPlaceholder) → ChatAnthropic → JsonOutputParser
```
- Receives the full conversation history as LangChain `HumanMessage` / `AIMessage` pairs
- Returns structured JSON: `{ verdict, grade, feedback, is_complete, next_question }`
- `MessagesPlaceholder` lets LangChain manage multi-turn context naturally

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/session/create` | Upload 2 docs → `{ session_id, first_question }` |
| POST | `/api/quiz/answer` | Submit answer → evaluation + next question |
| GET | `/api/session/{id}/summary` | Full quiz results (completed sessions only) |
| GET | `/health` | Health check |

## How It Works

1. **Upload** — two `.txt` / `.md` files sent as multipart form data
2. **Session** — documents stored in memory; `question_chain` generates question #1
3. **Quiz loop** — each answer is appended to LangChain message history and passed to `eval_chain`:
   - **Verdict**: `original` / `copy_pasted` / `ai_generated`
   - **Grade**: 0–10
   - **Feedback**: constructive 1–2 sentence comment
   - **Completion**: enforced min 10 / max 20 questions
4. **Summary** — per-question breakdown with average grade and verdict counts
