import { useState, useCallback } from 'react'
import { createSession, submitAnswer, getSummary } from '../utils/api'

export function useQuiz() {
  const [phase, setPhase] = useState('upload') // upload | quiz | summary
  const [sessionId, setSessionId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [lastEval, setLastEval] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  const startSession = useCallback(async (doc1, doc2) => {
    setLoading(true)
    setError(null)
    try {
      const data = await createSession(doc1, doc2)
      setSessionId(data.session_id)
      setCurrentQuestion(data.first_question)
      setQuestionNumber(1)
      setPhase('quiz')
    } catch (e) {
      setError(e?.response?.data?.detail || 'Failed to start session')
    } finally {
      setLoading(false)
    }
  }, [])

  const answerQuestion = useCallback(async (answer) => {
    if (!sessionId) return
    setLoading(true)
    setError(null)
    try {
      const eval_ = await submitAnswer(sessionId, answer)
      setLastEval(eval_)
      setHistory(prev => [...prev, {
        question: currentQuestion,
        answer,
        grade: eval_.grade,
        verdict: eval_.verdict,
        feedback: eval_.feedback,
      }])
      if (eval_.is_complete) {
        const sum = await getSummary(sessionId)
        setSummary(sum)
        setPhase('summary')
      } else {
        setCurrentQuestion(eval_.next_question)
        setQuestionNumber(q => q + 1)
      }
    } catch (e) {
      setError(e?.response?.data?.detail || 'Failed to submit answer')
    } finally {
      setLoading(false)
    }
  }, [sessionId, currentQuestion])

  const reset = useCallback(() => {
    setPhase('upload')
    setSessionId(null)
    setCurrentQuestion('')
    setQuestionNumber(1)
    setLastEval(null)
    setSummary(null)
    setLoading(false)
    setError(null)
    setHistory([])
  }, [])

  return {
    phase, sessionId, currentQuestion, questionNumber,
    lastEval, summary, loading, error, history,
    startSession, answerQuestion, reset,
  }
}
