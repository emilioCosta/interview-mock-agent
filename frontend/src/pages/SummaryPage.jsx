import * as S from './SummaryPage.styles'

const VERDICT_META = {
  original:     { label: 'Original',     color: 'var(--success)' },
  copy_pasted:  { label: 'Copy-Pasted',  color: 'var(--danger)'  },
  ai_generated: { label: 'AI-Generated', color: 'var(--warn)'    },
}

const gradeColor = g => g >= 8 ? 'var(--success)' : g >= 5 ? 'var(--warn)' : 'var(--danger)'

export default function SummaryPage({ summary, onReset }) {
  if (!summary) return null
  const { average_grade: avg, total_questions, trust_scores, grades, feedback_list, questions, answers } = summary
  const counts = {
    original:     trust_scores.filter(v => v >= 7).length,
    copy_pasted:  trust_scores.filter(v => v >= 4 && v < 7).length,
    ai_generated: trust_scores.filter(v => v < 4).length,
  }

  return (
    <S.Page>
      <S.Header>
        <S.Logo>DQ</S.Logo>
        <S.Title>Examination Complete</S.Title>
      </S.Header>

      <S.Hero>
        <S.AverageGrade $color={gradeColor(avg)}>
          {avg.toFixed(1)}<span>/10</span>
        </S.AverageGrade>
        <S.AverageLabel>Average Score</S.AverageLabel>
        <S.QuestionCount>{total_questions} questions answered</S.QuestionCount>
      </S.Hero>

      <S.Stats>
        <StatCard value={counts.original}     label="Original"      color="var(--success)" />
        <StatCard value={counts.copy_pasted}  label="Copy-Pasted"   color="var(--danger)"  />
        <StatCard value={counts.ai_generated} label="AI-Generated"  color="var(--warn)"    />
      </S.Stats>

      <S.Breakdown>
        <S.SectionTitle>Full Breakdown</S.SectionTitle>
        {questions.map((q, i) => {
          const v = VERDICT_META[verdicts[i]] || VERDICT_META.original
          return (
            <S.Card key={i}>
              <S.CardHeader>
                <S.CardNum>Q{i + 1}</S.CardNum>
                <S.CardGrade $color={gradeColor(grades[i])}>{grades[i]}/10</S.CardGrade>
                <S.CardVerdict $color={v.color}>{v.label}</S.CardVerdict>
              </S.CardHeader>
              <S.CardQuestion>{q}</S.CardQuestion>
              <S.CardAnswer>{answers[i]}</S.CardAnswer>
              <S.CardFeedback>{feedback_list[i]}</S.CardFeedback>
            </S.Card>
          )
        })}
      </S.Breakdown>

      <S.ResetButton onClick={onReset}>← Start New Session</S.ResetButton>
    </S.Page>
  )
}

function StatCard({ value, label, color }) {
  return (
    <S.StatCard>
      <S.StatValue $color={color}>{value}</S.StatValue>
      <S.StatLabel>{label}</S.StatLabel>
    </S.StatCard>
  )
}
