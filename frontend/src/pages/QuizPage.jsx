import { useState } from 'react'
import * as S from './QuizPage.styles'

const VERDICT_META = {
  original:     { label: 'Original',      color: 'var(--success)' },
  copy_pasted:  { label: 'Copy-Pasted',   color: 'var(--danger)'  },
  ai_generated: { label: 'AI-Generated',  color: 'var(--warn)'    },
}

const gradeColor = g => g >= 8 ? 'var(--success)' : g >= 5 ? 'var(--warn)' : 'var(--danger)'

export default function QuizPage({ question, questionNumber, lastEval, history, onAnswer, loading, error }) {
  const [answer, setAnswer] = useState('')
  const [showEval, setShowEval] = useState(false)

  const handleSubmit = async () => {
    if (!answer.trim() || loading) return
    setShowEval(false)
    await onAnswer(answer.trim())
    setAnswer('')
    setShowEval(true)
  }

  const progress = Math.min((questionNumber - 1) / 20, 1)

  return (
    <S.Page>
      <S.Header>
        <S.Logo>DQ</S.Logo>
        <S.Progress>
          <S.ProgressBar>
            <S.ProgressFill $progress={progress} />
          </S.ProgressBar>
          <S.ProgressLabel>Q {questionNumber}</S.ProgressLabel>
        </S.Progress>
      </S.Header>

      <S.Main>
        {showEval && lastEval && !lastEval.is_complete ? (
          <EvalCard eval={lastEval} onNext={() => setShowEval(false)} />
        ) : (
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
        )}
      </S.Main>
    </S.Page>
  )
}

function EvalCard({ eval: ev, onNext }) {
  return (
    <S.EvalCard>
      <S.EvalGrade $color={gradeColor(ev.grade)}>
        {ev.grade}<span>/10</span>
      </S.EvalGrade>
      <S.EvalFeedback>{ev.feedback}</S.EvalFeedback>
      <S.NextButton onClick={onNext}>Next Question</S.NextButton>
    </S.EvalCard>
  )
}
