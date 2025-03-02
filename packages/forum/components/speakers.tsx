import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from '~/components/shared/content-block'
import Image from '@readr-media/react-image'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const SpeakerLists = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 50px;
`

const SpeakerItem = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
`

const HeadPhoto = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #d9d9d9;
  object-fit: cover;
  object-position: center;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
`

const Title = styled.h2`
  font-family: 'Noto Serif TC', serif;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin: 40px auto;
  line-height: 1.6;
  letter-spacing: 3px;
`

const Description = styled(ContentBlock)`
  line-height: 1.8;
  text-align: left;
`

type Speaker = {
  name: string
  order: string
  image: string
  description: string
}

type SpeakersProps = {
  speakers: Speaker[]
}

export default function Speakers({
  speakers = [],
}: SpeakersProps): JSX.Element {
  const speakerLists = speakers.map((speaker: Speaker, index) => {
    const formattedImgUrl = {
      original: speaker.image,
    }

    return (
      <SpeakerItem key={index}>
        <HeadPhoto>
          <Image
            images={formattedImgUrl}
            defaultImage={'/default-head-shot.png'}
            alt={speaker.name}
            objectFit={'cover'}
            priority={true}
          />
        </HeadPhoto>
        <Title>{speaker.name}</Title>

        <Description content={speaker.description} />
      </SpeakerItem>
    )
  })

  return (
    <Wrapper>
      <h1>與會陣容</h1>
      <SpeakerLists>{speakerLists}</SpeakerLists>
    </Wrapper>
  )
}
