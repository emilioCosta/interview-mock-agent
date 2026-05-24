import styled from 'styled-components'
import { colors, fonts, radius } from '../styles/globalStyles'

export const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${colors.border};
`

export const Logo = styled.span`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 4px;
  color: ${colors.accent};
  border: 1px solid ${colors.accent};
  padding: 4px 8px;
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textMuted};
`

export const Hero = styled.section`
  text-align: center;
  padding: 24px 0;
`

export const AverageGrade = styled.div`
  font-size: 112px;
  font-weight: 800;
  line-height: 1;
  color: ${({ $color }) => $color};
  animation: fadeIn 0.5s ease;

  & span {
    font-size: 40px;
    color: ${colors.textMuted};
  }
`

export const AverageLabel = styled.p`
  font-family: ${fonts.mono};
  font-size: 13px;
  letter-spacing: 3px;
  color: ${colors.textMuted};
  text-transform: uppercase;
  margin-top: 8px;
`

export const QuestionCount = styled.p`
  font-family: ${fonts.mono};
  font-size: 12px;
  color: ${colors.textDim};
  margin-top: 4px;
`

export const Stats = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`

export const StatCard = styled.div`
  background: ${colors.bg2};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const StatValue = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: ${({ $color }) => $color};
`

export const StatLabel = styled.span`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 2px;
  color: ${colors.textMuted};
  text-transform: uppercase;
`

export const Breakdown = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SectionTitle = styled.h3`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 3px;
  color: ${colors.textDim};
  text-transform: uppercase;
  margin-bottom: 16px;
`

export const Card = styled.div`
  background: ${colors.bg2};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const CardNum = styled.span`
  font-family: ${fonts.mono};
  font-size: 12px;
  color: ${colors.textMuted};
  letter-spacing: 2px;
`

export const CardGrade = styled.span`
  font-family: ${fonts.mono};
  font-size: 18px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`

export const CardVerdict = styled.span`
  font-family: ${fonts.mono};
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-left: auto;
  color: ${({ $color }) => $color};
`

export const CardQuestion = styled.p`
  font-weight: 600;
  font-size: 15px;
`

export const CardAnswer = styled.p`
  font-family: ${fonts.mono};
  font-size: 13px;
  color: ${colors.textMuted};
  background: ${colors.bg3};
  padding: 12px;
  border-radius: ${radius.sm};
  border-left: 2px solid ${colors.border};
  line-height: 1.5;
`

export const CardFeedback = styled.p`
  font-size: 14px;
  color: ${colors.textMuted};
  line-height: 1.5;
  font-style: italic;
`

export const ResetButton = styled.button`
  align-self: center;
  background: transparent;
  border: 1px solid ${colors.border};
  color: ${colors.textMuted};
  padding: 12px 32px;
  font-family: ${fonts.display};
  font-size: 15px;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`
