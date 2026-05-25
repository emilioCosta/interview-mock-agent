import { useState } from 'react'
import * as S from './QuizPage.styles'

export default function QuizPage({ question, questionNumber, lastEval, history, onAnswer, loading, error }) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = async () => {
    if (!answer.trim() || loading) return
    await onAnswer(answer.trim())
    setAnswer('')
  }

  const progress = Math.min((questionNumber - 1) / 20, 1)

  return (
    <S.Page>
      <S.Header>
        <S.ProgressLabel>Q {questionNumber}</S.ProgressLabel>
      </S.Header>

      <S.Main>
        <S.QuestionArea>
          <S.QuestionMeta>
            <span>Question {questionNumber}</span>
            <S.Dot />
          </S.QuestionMeta>
          <S.Question>{question}</S.Question>
          <S.Textarea
            placeholder="Write your answer here…"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={6}
            disabled={loading}
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.SubmitButton onClick={handleSubmit} disabled={!answer.trim() || loading}>
            {loading ? 'Evaluating…' : 'Submit Answer'}
          </S.SubmitButton>
        </S.QuestionArea>
      </S.Main>
    </S.Page>
  )
}
