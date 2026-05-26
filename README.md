# DocuQuiz — AI-Powered Document Examination Platform

An intelligent examination system with **two evaluation approaches** built with **LangChain + FastAPI + React**.

Upload two documents, and the AI examiner will:
- Generate adaptive questions based on document content
- Evaluate answers with plagiarism/AI detection
- Provide detailed feedback on each response
- Compute final grades with plagiarism penalties

## Two API Versions

| Version | Approach | Use Case |
|---------|----------|----------|
| **V1** | Simple prompt chains | Quick assessments |
| **V2** | Autonomous tool-calling with reference lookup | Interview prep, certification |

**V2** uses agentic patterns: Claude autonomously calls a lookup tool to verify claims before scoring, enabling more reliable plagiarism detection.

## Features

✅ **Document Upload** — Upload reference documents (TXT/PDF/etc.)  
✅ **Adaptive Questioning** — AI generates 10-20 context-aware questions  
✅ **V1 Evaluation** — Direct chains for fast assessment  
✅ **V2 Evaluation** — Tool-calling loops for autonomous verification  
✅ **Plagiarism Detection** — Classify answers: AI, COPY, or ORIGINAL  
✅ **Grade Adjustment** — Plagiarized answers (AI/COPY) scored as 0  
✅ **Real-time Feedback** — Instant feedback on each answer  
✅ **Comprehensive Summary** — Final grades, trust scores, feedback, and verdicts  
✅ **Session Management** — Track multiple quiz sessions  

## Project Structure

```
docuquiz/
├── backend/
│   ├── main.py                   # FastAPI entry point, route registration
│   ├── pyproject.toml            # Dependencies (uv)
│   ├── .env.example              # Environment variables template
│   ├── constants/
│   │   ├── limits.py             # API limits, model config
│   │   └── prompts.py            # System prompts for V1 & V2
│   ├── models/
│   │   └── __init__.py           # Pydantic data models
│   ├── routes/
│   │   ├── session.py            # Session creation & summary (shared)
│   │   ├── quiz.py               # V1 answer endpoint
│   │   └── quiz_v2/              # V2 endpoints (autonomous tool calling)
│   │       └── quiz.py
│   └── services/
│       ├── utils.py              # Shared utilities (history building, JSON parsing)
│       ├── session_store.py      # Session storage with plagiarism tracking
│       ├── v1/
│       │   └── ai_service.py     # V1: Simple chains
│       └── v2/
│           └── ai_service.py     # V2: Tool-calling loops with reference lookup
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── hooks/
        │   └── useQuiz.js        # State management
        ├── pages/
        │   ├── UploadPage.jsx
        │   ├── QuizPage.jsx
        │   └── SummaryPage.jsx
        ├── styles/
        │   └── globalStyles.js
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

# Create virtual environment (using uv for faster installs)
uv venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt
# OR using uv directly:
uv sync

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

### Option 1: Development (Local)

**Terminal 1 — Backend:**
```bash
cd backend
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv run uvicorn main:app --reload --port 8000
```

Backend: **http://localhost:8000**  
API Docs: **http://localhost:8000/docs**  
Health Check: **http://localhost:8000/health**

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend: **http://localhost:5173**

### Option 2: Production Build

**Backend:**
```bash
cd backend
source .venv/bin/activate
uv run uvicorn main:app --port 8000
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Choosing V1 vs V2

### Use V1 When:
- Fast turnaround needed (3-5 seconds per answer)
- Quick assessments or practice quizzes
- Lower token cost acceptable

### Use V2 When:
- Interview preparation or certification
- Can tolerate longer response time (5-8 seconds)
- Plagiarism/AI detection critical
- Need audit trail of verified claims


## API Endpoints

### Session Management (Shared)
```
POST /api/session/create
POST /api/session/{session_id}/summary
GET /health
```

### V1 Evaluation (Simple Chains)
```
POST /api/quiz/v1/answer
```
Fast evaluation with direct prompt chains. Good for quick assessments.

### V2 Evaluation (Autonomous Tool-Calling)
```
POST /api/quiz/v2/answer
GET /api/quiz/v2/answer/{session_id}/references
```
Autonomous verification with document reference lookup. Better accuracy for plagiarism/AI detection.

### Detailed Endpoints

#### Create Session
```
POST /api/session/create
Content-Type: multipart/form-data

Body:
  - doc1: File (document 1)
  - doc2: File (document 2)

Response:
  {
    "session_id": "uuid",
    "first_question": "Question text"
  }
```

#### Submit Answer (V1)
```
POST /api/quiz/v1/answer
Content-Type: application/json

Body:
  {
    "session_id": "session-id",
    "answer": "Your answer"
  }

Response:
  {
    "trust": 8,
    "grade": 8,
    "feedback": "Feedback text",
    "is_complete": false,
    "next_question": "Next question",
    "plagiarism": "ORIGINAL"
  }
```

#### Submit Answer (V2)
```
POST /api/quiz/v2/answer
Content-Type: application/json

Body:
  {
    "session_id": "session-id",
    "answer": "Your answer"
  }

Response:
  {
    "trust": 9,
    "grade": 9,
    "feedback": "Detailed feedback",
    "is_complete": false,
    "next_question": "Next question",
    "plagiarism": "ORIGINAL",
    "references_checked": ["claim 1", "claim 2"]
  }
```

#### Get Quiz Summary
```
GET /api/session/{session_id}/summary

Response:
  {
    "session_id": "session-id",
    "total_questions": 12,
    "average_grade": 8.1,
    "grades": [8, 9, 7, ...],
    "trust_scores": [8, 9, 7, ...],
    "feedback_list": ["Feedback 1", ...],
    "questions": ["Question 1", ...],
    "answers": ["Answer 1", ...]
  }

Note: Grades adjusted to 0 for "AI" or "COPY" plagiarism verdicts
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

## Learning Resources

This project demonstrates several LLM and software architecture concepts:

- **LangChain**: Chains, prompts, tools, message history management
- **Agentic Patterns**: Tool-calling loops, autonomous decision-making
- **Prompt Engineering**: System prompts, messaging placeholders, context management
- **Plagiarism Detection**: AI/COPY/ORIGINAL classification with multi-phase evaluation
- **API Design**: RESTful endpoints, session management, version coexistence
- **Separation of Concerns**: V1/V2 isolation, utils extraction, role-specific chains

## Future Improvements

### Short-term
- [ ] Semantic search for better reference matching (embeddings instead of keywords)
- [ ] Caching for repeated reference lookups
- [ ] Batch evaluation mode for multiple sessions
- [ ] Tool calling analytics and audit trail

### Medium-term
- [ ] Database persistence (replace in-memory storage)
- [ ] User authentication and dashboard
- [ ] Multiple AI model support (Claude, GPT-4, Llama)
- [ ] Document pagination for large files

### Long-term
- [ ] Advanced prompt optimization (few-shot learning)
- [ ] Fine-tuned models for plagiarism detection
- [ ] Multi-language support

## Project Context

Built to explore agentic AI patterns and tool-calling in production systems. The V2 implementation showcases how autonomous verification improves reliability while maintaining transparency through audit trails.

Great for:
- Interview preparation and technical assessments
- Understanding LLM evaluation systems
- Learning LangChain and agentic patterns
- Building similar document-based Q&A systems


## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | FastAPI, LangChain, Claude Sonnet |
| **Frontend** | React 18, Vite, Styled Components |
| **AI Model** | Claude 3.5 Sonnet (Anthropic) |
| **Package Manager** | uv (fast Python package management) |
| **State Management** | React Hooks + custom useQuiz hook |
| **HTTP Client** | Axios |
| **Data Validation** | Pydantic |

## Key Implementation Details

### Shared Utilities
- `services/utils.py`:
  - `build_conversation_history()` — Constructs LangChain message history from Q/A pairs
  - `extract_json_from_response()` — Robust JSON extraction handling multiple response formats

### Session Management
- In-memory storage with plagiarism verdict tracking
- Grade adjustment: AI/COPY answers scored as 0
- Average calculation accounts for plagiarism penalties

### Prompting Strategy
- **V1**: Direct evaluation with implicit reasoning
- **V2**: "MAY use tools" (not "MUST") to allow autonomous decision-making
- Separate final JSON extraction chain to prevent infinite loops


## Troubleshooting

### Backend Issues

| Issue | Solution |
|-------|----------|
| Python version error | Check: `python --version` (must be 3.9+) |
| Virtual env not found | Run: `uv venv` then activate it |
| Dependencies not installed | Run: `uv sync` or `uv pip install -r requirements.txt` |
| API Key errors | Verify `.env` file exists in `backend/`, check `ANTHROPIC_API_KEY` format |
| Port 8000 already in use | Use: `uv run uvicorn main:app --port 8001` |

### Frontend Issues

| Issue | Solution |
|-------|----------|
| Can't connect to backend | Ensure backend running on port 8000, check CORS errors in console |
| Module not found | Run: `npm install` in frontend directory |
| Port 5173 in use | Vite will auto-select next available port |

### V2 Specific

| Issue | Solution |
|-------|----------|
| Tool calling timeout | Check token count, verify `MAX_ITERATIONS` in constants |
| Infinite loop errors | System uses max 5 iterations per evaluation by design |
| Reference lookup returns empty | Ensure documents have enough content, check keyword matching |

### Common Errors

**"Session not found"**
- Session expired or wrong session_id
- Verify session created successfully before submitting answers

**"off-topic" response rejected**
- Answer flagged as off-topic (>70% score)
- Reword answer to be more relevant to documents

**JSON parsing failed**
- Rare edge case with LLM response format
- System returns safe default response
- Check logs for details

## Environment Variables

```env
# Required
ANTHROPIC_API_KEY=sk-ant-your-api-key

# Optional
MODEL=claude-3-5-sonnet-20241022
MAX_RESPONSE_TOKENS=2000
MIN_QUESTIONS=10
MAX_QUESTIONS=20
MAX_ITERATIONS=5
```

## Architecture

### V1 — Simple Chains
```
1. Question Chain
   ChatPromptTemplate → ChatAnthropic → Text
   
2. Evaluation Chain
   ChatPromptTemplate(MessagesPlaceholder) → ChatAnthropic → JsonOutputParser
   
   Flow:
   - Receives full conversation history (questions + answers as messages)
   - Returns JSON: { grade, plagiarism, feedback, is_complete, next_question }
   - No tools, pure reasoning
```

### V2 — Autonomous Tool-Calling (Agentic)
```
1. Question Chain (same as V1)

2. Evaluation Chain with Tools
   ChatPromptTemplate(MessagesPlaceholder) → ChatAnthropic.bind_tools()
   
   Loop (max 5 iterations):
   - Claude receives evaluation prompt + conversation history
   - Claude autonomously decides: "Should I verify this claim?"
   - If yes: Calls lookup_document_reference tool
   - System executes: Keyword-based document search
   - Claude receives results, re-invokes chain
   - Repeats until Claude stops calling tools or hits max iterations

3. Final JSON Chain (no tools)
   ChatPromptTemplate(MessagesPlaceholder) → ChatAnthropic
   
   - Takes full conversation history including tool results
   - Forces JSON output (no tools available)
   - Returns structured evaluation
   
Reference Lookup Tool:
   lookup_document_reference(query, document="both")
   - Searches doc1 and/or doc2 for keyword matches
   - Returns top 3 passages with line numbers and relevance scores
   - Claude uses results to verify claims in answers
```

### Plagiarism Scoring
- **ORIGINAL** → Grade unchanged
- **AI** → Grade becomes 0
- **COPY** → Grade becomes 0
- Final average calculated from adjusted grades

### Data Flow
```
User Upload Documents
    ↓
Session Created, First Question Generated (V1/V2)
    ↓
User Submits Answer
    ↓
V1: Evaluation Chain → Grade + Plagiarism Verdict
    OR
V2: Evaluation Loop → Tool Calls → Reference Lookup → Final JSON → Grade + Plagiarism
    ↓
Grade Stored with Plagiarism Verdict
    ↓
Summary Calculates Average with Plagiarism Penalties
```

4. **Summary** — per-question breakdown with average grade and verdict counts
