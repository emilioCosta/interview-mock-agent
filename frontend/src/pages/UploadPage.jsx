import { useState, useRef } from 'react'
import * as S from './UploadPage.styles'

export default function UploadPage({ onStart, loading, error }) {
  const [doc1, setDoc1] = useState(null)
  const [doc2, setDoc2] = useState(null)
  const ref1 = useRef()
  const ref2 = useRef()

  return (
    <S.Page>
      <S.Header>
        <S.Title>Mock Interview</S.Title>
        <S.Subtitle>Upload two documents. Face the examiner.</S.Subtitle>
      </S.Header>

      <S.Grid>
        <DropZone label="Role description" file={doc1} inputRef={ref1} onChange={setDoc1} />
        <DropZone label="Job offer" file={doc2} inputRef={ref2} onChange={setDoc2} />
      </S.Grid>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <S.StartButton
        onClick={() => doc1 && doc2 && onStart(doc1, doc2)}
        disabled={!doc1 || !doc2 || loading}
      >
        {loading ? 'Analyzing documents…' : 'Begin Examination'}
      </S.StartButton>
      <S.Hint>Accepts .txt and .md files</S.Hint>
    </S.Page>
  )
}

function DropZone({ label, file, inputRef, onChange }) {
  const [drag, setDrag] = useState(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(false)
    const f = e.dataTransfer.files[0]
    if (f) onChange(f)
  }
  return (
    <S.DropzoneContainer
      $dragOver={drag}
      $filled={!!file}
      onDragOver={(e) => {
        e.preventDefault()
        setDrag(true)
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <S.HiddenInput
        ref={inputRef}
        type="file"
        accept=".txt,.md"
        onChange={(e) => onChange(e.target.files[0])}
      />
      <S.DropzoneLabel>{label}</S.DropzoneLabel>
      {file ? (
        <S.DropzoneFile>
          <S.DropzoneIcon $filled>✓</S.DropzoneIcon>
          <S.DropzoneFileName>{file.name}</S.DropzoneFileName>
        </S.DropzoneFile>
      ) : (
        <S.DropzonePrompt>
          <S.DropzoneIcon>+</S.DropzoneIcon>
          <span>Drop file or click</span>
        </S.DropzonePrompt>
      )}
    </S.DropzoneContainer>
  )
}
