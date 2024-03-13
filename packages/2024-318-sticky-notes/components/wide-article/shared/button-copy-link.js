import { useState } from 'react'

import styled from 'styled-components'
import Image from 'next/image'
import useSharedUrl from '~/hooks/useSharedUrl'
import { staticFileDestination } from '~/config'
import gtag from '~/utils/gtag'

const CopiedMessage = styled.div`
  position: fixed;
  top: 64px;
  left: calc((100vw - min(80vw, 480px)) / 2);
  color: #fff;
  background: rgba(0, 0, 0, 0.87);
  border-radius: 2px;
  z-index: 100;
  margin: 0 auto;
  width: 80vw;
  max-width: 480px;
  padding: 12px;
  visibility: ${
    /**
     * @param {{shouldShowMessage: Boolean}} param
     */
    ({ shouldShowMessage }) => (shouldShowMessage ? 'visible' : 'hidden')
  };
  opacity: ${
    /**
     * @param {{shouldShowMessage: Boolean}} param
     */
    ({ shouldShowMessage }) => (shouldShowMessage ? 1 : 0)
  };

  transition: all 0.3s ease-in;
`

const ClickButton = styled.button`
  &:focus {
    outline: none;
  }
`

/**
 * @param {Object} props
 * @param {number} [props.width] - width of the button
 * @param {number} [props.height] - height of the button
 * @returns {JSX.Element}
 */
export default function ButtonCopyLink({ width = 35, height = 35 }) {
  const [shouldShowMessage, setShouldShowMessage] = useState(false)
  const sharedUrl = useSharedUrl()
  const handleCopyLink = () => {
    if (window.navigator.clipboard) {
      /**
       * Since `window.navigator.clipboard` is only available in https protocol,
       * we add optional chaining to hide error when developing in http protocol, such as `http://localhost:3000`
       * Must to know that this is a work-around solution, not solved problem of unable copy in http protocol.
       */
      window.navigator?.clipboard?.writeText(sharedUrl)

      setShouldShowMessage(true)
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        setShouldShowMessage(false)
      }, 3000)
    }
  }

  const onLogoClicked = () => {
    gtag.sendGAEvent('click', {
      projects: `share-link`,
    })
  }

  return (
    <>
      <CopiedMessage shouldShowMessage={shouldShowMessage}>
        已複製連結
      </CopiedMessage>

      <ClickButton
        onClick={() => {
          handleCopyLink()
          onLogoClicked()
        }}
        aria-label="link-share-icon"
        // @ts-ignore
        on="tap:clipboard-example.copy"
      >
        <Image
          src={`${staticFileDestination}/wide-article/link-logo.svg`}
          width={width}
          height={height}
          alt="copy link button"
        />
      </ClickButton>

      <input
        aria-label="link-share-icon"
        id="clipboard-example"
        type="text"
        value={sharedUrl}
        readOnly
        style={{ position: 'absolute', left: '-9999px' }}
      />
    </>
  )
}
