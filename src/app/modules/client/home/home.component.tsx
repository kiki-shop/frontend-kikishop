import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import MainHome from './main-home/main-home.component'

interface HomeProps {
  props?: any
}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div css={cssHome}>
      <MainHome />
    </div>
  )
}

export default Home

const cssHome = css`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 0) and (max-width: 739px) {
    width: 100%;
    display: unset;
    width: auto;
  }
`
