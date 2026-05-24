import styled from 'styled-components'
import { colors, fonts, radius, spacing, typography } from '../styles/globalStyles'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${spacing.xl} ${spacing.lg};
  gap: ${spacing.xxl};
  background: ${colors.canvas};
`

export const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
`

export const Badge = styled.span`
  ${typography.navLink};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  padding: ${spacing.xxs} ${spacing.xs};
  text-transform: uppercase;
`

export const Title = styled.h1`
  ${typography.heroDisplay};
  line-height: 1.07;
`

export const Subtitle = styled.p`
  ${typography.caption};
  color: ${colors.inkMuted48};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  width: 100%;
  max-width: 700px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const DropzoneContainer = styled.div`
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  padding: ${spacing.xxl} ${spacing.lg};
  cursor: pointer;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  background: ${colors.canvasParchment};
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${colors.primary};
    background: ${colors.surfacePearl};
  }

  ${({ $dragOver }) =>
    $dragOver &&
    `
    border-color: ${colors.primary};
    background: ${colors.surfacePearl};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  `}

  ${({ $filled }) =>
    $filled &&
    `
    border-color: ${colors.primary};
    background: rgba(0, 102, 204, 0.04);
  `}
`

export const DropzoneLabel = styled.div`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  text-transform: uppercase;
`

export const DropzoneIcon = styled.span`
  font-size: 28px;
  color: ${({ $filled }) => ($filled ? colors.primary : 'inherit')};
`

export const DropzoneFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.xs};
`

export const DropzoneFileName = styled.span`
  ${typography.caption};
  color: ${colors.body};
  word-break: break-all;
  text-align: center;
`

export const DropzonePrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.inkMuted48};
  ${typography.caption};
`

export const HiddenInput = styled.input`
  display: none;
`

export const StartButton = styled.button`
  background: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  padding: ${spacing.md} ${spacing.xl};
  ${typography.bodyStrong};
  border-radius: ${radius.pill};
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;

  &:hover:not(:disabled) {
    background: ${colors.primaryFocus};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.p`
  color: ${colors.primary};
  ${typography.caption};
`

export const Hint = styled.p`
  ${typography.caption};
  color: ${colors.inkMuted48};
`
