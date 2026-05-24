import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export async function createSession(doc1File, doc2File) {
  const form = new FormData()
  form.append('doc1', doc1File)
  form.append('doc2', doc2File)
  const { data } = await api.post('/session/create', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  // Returns { session_id, first_question }
  return data
}

export async function submitAnswer(sessionId, answer) {
  const { data } = await api.post('/quiz/answer', { session_id: sessionId, answer })
  return data
}

export async function getSummary(sessionId) {
  const { data } = await api.get(`/session/${sessionId}/summary`)
  return data
}
