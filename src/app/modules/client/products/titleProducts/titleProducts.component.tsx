import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMinus } from 'react-icons/ai'

interface TitleProductProps {
  props?: any
  children?: React.ReactNode
}

const TitleProducts: FunctionComponent<TitleProductProps> = ({ children }) => {
  return (
    <div css={cssTitleProduct}>
      <ol className='arrival'>
        <li>
          <Link className='arrival_link text-[#6c6d70;]' to={'/'}>
            Trang chủ
          </Link>
        </li>
        <li>
          <AiOutlineMinus className='mx-6' />
        </li>
        <li>
          <Link className='arrival_link' to={''}>
            {children}
          </Link>
        </li>
      </ol>
    </div>
  )
}

export default TitleProducts

const cssTitleProduct = css`
margin: 0 auto 8px;
@media screen and (min-width: 640px){
  width: 1380px;
}
  .arrival {
    display: flex;
    list-style-type: none;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f7f8f9;
    border-top: 1px solid #f7f8f9;
    color: #6c6d70;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .arrival_link {
    font-size: 14px;
    line-height: 24px;
  }
  @media screen and (max-width: 640px){
    .arrival {
      padding: 16px 10px;
    }
}
`
