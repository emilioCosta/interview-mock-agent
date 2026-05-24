import styled from 'styled-components'
import { colors, fonts, radius } from '../styles/globalStyles'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 24px;
  gap: 32px;
`

export const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

export const Badge = styled.span`
  font-family: ${fonts.mono};
  font-size: 10px;
  letter-spacing: 4px;
  color: ${colors.accent2};
  border: 1px solid ${colors.accent2};
  padding: 4px 10px;
  text-transform: uppercase;
`

export const Title = styled.h1`
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
`

export const Subtitle = styled.p`
  color: ${colors.textMuted};
  font-size: 15px;
  font-family: ${fonts.mono};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  max-width: 700px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const DropzoneContainer = styled.div`
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  padding: 40px 24px;
  cursor: pointer;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${colors.bg2};
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${colors.accent};
    background: ${colors.bg3};
  }

  ${({ $dragOver }) =>
    $dragOver &&
    `
    border-color: ${colors.accent};
    background: ${colors.bg3};
    box-shadow: 0 0 20px rgba(232, 255, 71, 0.08);
  `}

  ${({ $filled }) =>
    $filled &&
    `
    border-color: ${colors.success};
    background: rgba(46, 213, 115, 0.04);
  `}
`

export const DropzoneLabel = styled.div`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 3px;
  color: ${colors.textMuted};
  text-transform: uppercase;
`

export const DropzoneIcon = styled.span`
  font-size: 28px;
  color: ${({ $filled }) => ($filled ? colors.success : 'inherit')};
`

export const DropzoneFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

export const DropzoneFileName = styled.span`
  font-family: ${fonts.mono};
  font-size: 13px;
  color: ${colors.text};
  word-break: break-all;
  text-align: center;
`

export const DropzonePrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${colors.textDim};
  font-size: 14px;
`

export const HiddenInput = styled.input`
  display: none;
`

export const StartButton = styled.button`
  background: ${colors.accent};
  color: #000;
  border: none;
  padding: 16px 48px;
  font-family: ${fonts.display};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.p`
  color: ${colors.danger};
  font-family: ${fonts.mono};
  font-size: 13px;
`

export const Hint = styled.p`
  font-family: ${fonts.mono};
  font-size: 12px;
  color: ${colors.textDim};
`
