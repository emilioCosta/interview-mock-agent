import styled from 'styled-components'
import { colors, fonts, radius, spacing, typography } from '../styles/globalStyles'

export const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.lg} calc(${spacing.xxl} * 3.33);
  display: flex;
  flex-direction: column;
  gap: ${spacing.xxl};
  background: ${colors.canvas};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xl};
  padding-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.hairline};
`

export const Logo = styled.span`
  ${typography.navLink};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  padding: ${spacing.xxs} ${spacing.xs};
`

export const Title = styled.h2`
  ${typography.bodyStrong};
  color: ${colors.inkMuted48};
`

export const Hero = styled.section`
  text-align: center;
  padding: ${spacing.lg} 0;
`

export const AverageGrade = styled.div`
  font-size: 112px;
  font-weight: 800;
  line-height: 1;
  color: ${({ $color }) => $color};
  animation: fadeIn 0.5s ease;

  & span {
    font-size: 40px;
    color: ${colors.inkMuted48};
  }
`

export const AverageLabel = styled.p`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  text-transform: uppercase;
  margin-top: ${spacing.xs};
`

export const QuestionCount = styled.p`
  ${typography.caption};
  color: ${colors.inkMuted48};
  margin-top: ${spacing.xxs};
`

export const Stats = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.sm};
`

export const StatCard = styled.div`
  background: ${colors.canvasParchment};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.xs};
`

export const StatValue = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: ${({ $color }) => $color};
`

export const StatLabel = styled.span`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  text-transform: uppercase;
`

export const Breakdown = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`

export const SectionTitle = styled.h3`
  ${typography.navLink};
  color: ${colors.inkMuted48};
  text-transform: uppercase;
  margin-bottom: ${spacing.md};
`

export const Card = styled.div`
  background: ${colors.canvasParchment};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
`

export const CardNum = styled.span`
  ${typography.caption};
  color: ${colors.inkMuted48};
`

export const CardGrade = styled.span`
  ${typography.captionStrong};
  color: ${({ $color }) => $color};
`

export const CardVerdict = styled.span`
  ${typography.caption};
  text-transform: uppercase;
  margin-left: auto;
  color: ${({ $color }) => $color};
`

export const CardQuestion = styled.p`
  ${typography.bodyStrong};
`

export const CardAnswer = styled.p`
  ${typography.caption};
  color: ${colors.inkMuted48};
  background: ${colors.canvasParchment};
  padding: ${spacing.sm};
  border-radius: ${radius.sm};
  border-left: 2px solid ${colors.hairline};
  line-height: 1.5;
`

export const CardFeedback = styled.p`
  ${typography.caption};
  color: ${colors.inkMuted48};
  line-height: 1.5;
  font-style: italic;
`

export const ResetButton = styled.button`
  align-self: center;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  color: ${colors.inkMuted48};
  padding: ${spacing.sm} ${spacing.xl};
  ${typography.bodyStrong};
  border-radius: ${radius.pill};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;

  &:hover {
    border-color: ${colors.primary};
    background: rgba(0, 102, 204, 0.04);
    color: ${colors.primary};
  }
`
