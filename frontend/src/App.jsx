import { useQuiz } from './hooks/useQuiz'
import UploadPage from './pages/UploadPage'
import QuizPage from './pages/QuizPage'
import SummaryPage from './pages/SummaryPage'
import { GlobalStyle } from './styles/globalStyles'

export default function App() {
  const quiz = useQuiz()

  return (
    <>
      <GlobalStyle />
      {quiz.phase === 'upload' && (
        <UploadPage onStart={quiz.startSession} loading={quiz.loading} error={quiz.error} />
      )}
      {quiz.phase === 'quiz' && (
        <QuizPage
          question={quiz.currentQuestion}
          questionNumber={quiz.questionNumber}
          lastEval={quiz.lastEval}
          history={quiz.history}
          onAnswer={quiz.answerQuestion}
          loading={quiz.loading}
          error={quiz.error}
        />
      )}
      {quiz.phase === 'summary' && (
        <SummaryPage summary={quiz.summary} onReset={quiz.reset} />
      )}
    </>
  )
}
