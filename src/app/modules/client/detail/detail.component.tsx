import { FunctionComponent, useEffect } from 'react'
import { css } from '@emotion/react'
import MainDetail from './main-detail/main-detail.component'
import { useProductRedux } from '../redux/hook/useProductReducer'
import { useParams } from 'react-router-dom'

interface DetailProps {

}

const Detail: FunctionComponent<DetailProps> = () => {
  const { actions } = useProductRedux()
  const { id } = useParams()
  useEffect(() => {
    actions.getOneProduct(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id])
  return (
    <div css={cssDetail}>
      <MainDetail />
    </div>
  )
}

export default Detail

const cssDetail = css`
display: flex;
justify-content: space-between;
padding-top: 16px;
// width: 1600px;
margin:auto;
@media (min-width: 0) and (max-width: 739px) {
    width:100%;
    display: unset;
    width: auto;
  }
`
