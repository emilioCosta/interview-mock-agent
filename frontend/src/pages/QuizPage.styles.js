import styled from 'styled-components'
import { colors, fonts, radius, spacing, typography } from '../styles/globalStyles'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.lg};
  background: ${colors.canvas};
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  padding-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.hairline};
  margin-bottom: ${spacing.xxl};
`

export const Logo = styled.span`
  ${typography.navLink};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  padding: ${spacing.xxs} ${spacing.xs};
  flex-shrink: 0;
`

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex: 1;
`

export const ProgressBar = styled.div`
  flex: 1;
  height: 2px;
  background: ${colors.hairline};
  border-radius: 1px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
  background: ${colors.primary};
  border-radius: 1px;
  transition: width 0.5s ease;
  width: ${({ $progress }) => `${$progress * 100}%`};
`

export const ProgressLabel = styled.span`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  white-space: nowrap;
`

export const Main = styled.main`
  flex: 1;
`

export const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`

export const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  ${typography.navLink};
  color: ${colors.inkMuted48};
  text-transform: uppercase;
`

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: ${colors.primary};
  border-radius: 50%;
  animation: pulse 2s infinite;
`

export const Question = styled.p`
  ${typography.bodyStrong};
  line-height: 1.5;
  text-align: justify;
`

export const Textarea = styled.textarea`
  background: ${colors.canvasParchment};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  padding: ${spacing.lg};
  color: ${colors.body};
  ${typography.caption};
  resize: vertical;
  width: 100%;
  transition: border-color 0.2s;
  outline: none;

  &:focus {
    border-color: ${colors.primary};
  }

  &:disabled {
    opacity: 0.5;
  }
`

export const SubmitButton = styled.button`
  align-self: flex-end;
  background: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  padding: ${spacing.sm} ${spacing.xl};
  ${typography.bodyStrong};
  border-radius: ${radius.pill};
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${colors.primaryFocus};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const EvalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
  padding: ${spacing.xxl} ${spacing.xl};
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
    color: ${colors.inkMuted48};
  }
`

export const EvalVerdict = styled.div`
  border: 1px solid;
  border-color: ${({ $color }) => $color};
  border-radius: ${radius.pill};
  padding: ${spacing.xxs} ${spacing.md};
  ${typography.navLink};
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`

export const EvalFeedback = styled.p`
  max-width: 520px;
  color: ${colors.inkMuted48};
  ${typography.caption};
  line-height: 1.6;
`

export const NextButton = styled.button`
  background: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  padding: ${spacing.md} ${spacing.xl};
  ${typography.bodyStrong};
  border-radius: ${radius.pill};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${colors.primaryFocus};
  }
`

export const Sidebar = styled.aside`
  margin-top: ${spacing.xxl};
  padding-top: ${spacing.lg};
  border-top: 1px solid ${colors.hairline};
`

export const SidebarTitle = styled.p`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  text-transform: uppercase;
  margin-bottom: ${spacing.sm};
`

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  padding: ${spacing.xs} 0;
  border-bottom: 1px solid ${colors.dividerSoft};
`

export const HistoryQuestion = styled.span`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  width: 28px;
`

export const HistoryGrade = styled.span`
  ${typography.captionStrong};
  color: ${({ $color }) => $color};
`

export const HistoryVerdict = styled.span`
  ${typography.caption};
  margin-left: auto;
  color: ${({ $color }) => $color};
`

export const ErrorMessage = styled.p`
  color: ${colors.primary};
  ${typography.caption};
`
