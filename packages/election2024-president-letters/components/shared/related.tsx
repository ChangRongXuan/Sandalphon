import InviteLetter from './invite-letter'
import styled from 'styled-components'
import { CANDIDATES_LETTER } from '../../constants'
import { color, breakpoint, font } from '../../styles/theme'
const { h3 } = font
const { background, text } = color
const Wrapper = styled.section`
  background-color: ${background.gray};
  padding: 40px 20px 40px 20px;
  margin: 0 auto;
  ${breakpoint.xl} {
    padding: 40px 40px 40px 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
`
const Title = styled.h3`
  text-align: center;
  font-size: ${h3.size};
  line-height: ${h3.lineHeight};
  font-weight: ${h3.weight};
  color: ${text.secondary};
  margin-bottom: 25px;
`
type Props = {
  renderCandidatesId: ('lai-ching-te' | 'ko-wen-je' | 'hou-yu-ih')[]
}
export default function Related({
  renderCandidatesId = ['lai-ching-te', 'hou-yu-ih', 'ko-wen-je'],
}: Props) {
  const hasAllCandidates = renderCandidatesId.every((item) =>
    ['lai-ching-te', 'hou-yu-ih', 'ko-wen-je'].includes(item)
  )
  const renderCandidates = CANDIDATES_LETTER.map((person) => {
    if (renderCandidatesId.find((item) => item === person.id)) {
      return person
    }
  }).filter((person) => person)
  return (
    <Wrapper>
      <Title>{hasAllCandidates ? '選擇你想打開的信件' : '打開更多信件'}</Title>
      {renderCandidates.map(
        (person) =>
          person && (
            <InviteLetter
              key={person.id}
              id={person.id}
              name={person.name}
              description={person.letterDescription}
              image={person.letterAvatar}
            ></InviteLetter>
          )
      )}
    </Wrapper>
  )
}
