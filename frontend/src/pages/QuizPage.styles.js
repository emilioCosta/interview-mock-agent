import styled from 'styled-components'
import { colors, fonts, radius } from '../styles/globalStyles'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${colors.border};
  margin-bottom: 48px;
`

export const Logo = styled.span`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 4px;
  color: ${colors.accent};
  border: 1px solid ${colors.accent};
  padding: 4px 8px;
  flex-shrink: 0;
`

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`

export const ProgressBar = styled.div`
  flex: 1;
  height: 2px;
  background: ${colors.border};
  border-radius: 1px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
  background: ${colors.accent};
  border-radius: 1px;
  transition: width 0.5s ease;
  width: ${({ $progress }) => `${$progress * 100}%`};
`

export const ProgressLabel = styled.span`
  font-family: ${fonts.mono};
  font-size: 12px;
  color: ${colors.textMuted};
  white-space: nowrap;
`

export const Main = styled.main`
  flex: 1;
`

export const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.mono};
  font-size: 12px;
  letter-spacing: 2px;
  color: ${colors.textMuted};
  text-transform: uppercase;
`

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: ${colors.accent};
  border-radius: 50%;
  animation: pulse 2s infinite;
`

export const Question = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  text-align: justify;
`

export const Textarea = styled.textarea`
  background: ${colors.bg2};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  padding: 20px;
  color: ${colors.text};
  font-family: ${fonts.mono};
  font-size: 15px;
  line-height: 1.6;
  resize: vertical;
  width: 100%;
  transition: border-color 0.2s;
  outline: none;

  &:focus {
    border-color: ${colors.accent};
  }

  &:disabled {
    opacity: 0.5;
  }
`

export const SubmitButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: 1px solid ${colors.accent};
  color: ${colors.accent};
  padding: 12px 32px;
  font-family: ${fonts.display};
  font-size: 15px;
  font-weight: 600;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover:not(:disabled) {
    background: ${colors.accent};
    color: #000;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const EvalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 48px 32px;
  text-align: center;
  animation: fadeIn 0.3s ease;
`

export const EvalGrade = styled.div`
  font-size: 96px;
  font-weight: 800;
  line-height: 1;
  color: ${({ $color }) => $color};

  & span {
    font-size: 32px;
    color: ${colors.textMuted};
  }
`

export const EvalVerdict = styled.div`
  border: 1px solid;
  border-color: ${({ $color }) => $color};
  border-radius: 100px;
  padding: 6px 20px;
  font-family: ${fonts.mono};
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`

export const EvalFeedback = styled.p`
  max-width: 520px;
  color: ${colors.textMuted};
  font-size: 16px;
  line-height: 1.6;
`

export const NextButton = styled.button`
  background: ${colors.accent};
  color: #000;
  border: none;
  padding: 14px 40px;
  font-family: ${fonts.display};
  font-size: 15px;
  font-weight: 700;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`

export const Sidebar = styled.aside`
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid ${colors.border};
`

export const SidebarTitle = styled.p`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 3px;
  color: ${colors.textDim};
  text-transform: uppercase;
  margin-bottom: 12px;
`

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.bg3};
`

export const HistoryQuestion = styled.span`
  font-family: ${fonts.mono};
  font-size: 12px;
  color: ${colors.textMuted};
  width: 28px;
`

export const HistoryGrade = styled.span`
  font-family: ${fonts.mono};
  font-size: 14px;
  font-weight: 500;
  color: ${({ $color }) => $color};
`

export const HistoryVerdict = styled.span`
  font-family: ${fonts.mono};
  font-size: 12px;
  margin-left: auto;
  color: ${({ $color }) => $color};
`

export const ErrorMessage = styled.p`
  color: ${colors.danger};
  font-family: ${fonts.mono};
  font-size: 13px;
`
