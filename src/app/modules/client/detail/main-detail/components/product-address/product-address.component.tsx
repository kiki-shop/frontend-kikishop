import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
type ProductAddressProps = {}

const ProductAddress: FunctionComponent<ProductAddressProps> = () => {
  return (
    <div css={cssAddress}>
      <ul className='flex pb-2'>
        <li className='inline pr-4'>
          <a href=''>
            Trang chủ<span className='ml-2'>&#8250;</span>
          </a>
        </li>
        <li className='inline pr-4'>
          <a href=''>
            Sản Phẩm <span className='ml-2'>&#8250;</span>
          </a>
        </li>
        <li className='inline pr-4'>
          <a href=''>Vali du lịch BAMOZO</a>
        </li>
      </ul>
    </div>
  )
}

export default ProductAddress
const cssAddress = css`
  a {
    color: #848990;
    font-size: 13px;
    opacity: 0.7;
  }
  a:hover {
    text-decoration: underline;
  }
`
