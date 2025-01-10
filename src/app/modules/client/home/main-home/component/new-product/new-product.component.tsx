import { css } from '@emotion/react'
import { FunctionComponent, useEffect } from 'react'
import ItemProduct from '~/app/component/parts/itemproduct/itemproduct.component'
import { useProductRedux } from '~/app/modules/client/redux/hook/useProductReducer'
import { Link } from 'react-router-dom'
import ButtonSqua from '~/app/component/parts/button/ButtonSqua'
interface NewProductProps {
  props?: any
}
const NewProduct: FunctionComponent<NewProductProps> = () => {
  const {
    data: { products },
    actions
  } = useProductRedux()
  useEffect(() => {
    actions.getAllProduct()
  }, [])
  return (
    <div css={cssProduct}>
      <div className='titles'>MỚI RA MẮT</div>
      <p className='text-center titles-desc'>Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ</p>
      <div className='list-product '>
        {products.slice(-5).map((item: any, index: any) => (
          <Link to={`/detail/${item._id}`} key={index}>
            <ItemProduct itemProduct={item} />
          </Link>
        ))}
      </div>
      <div className='list-product-mobile'>
        {products.slice(-2).map((item: any, index: any) => (
          <Link to={`/detail/${item._id}`} key={index}>
            <ItemProduct itemProduct={item} />
          </Link>
        ))}
      </div>
      <div className='text-center sm:mt-[8rem] mt-[20px]'>
        <Link to={'/products'}>
          {' '}
          <ButtonSqua children='Xem tất cả' css={cssButton} />
        </Link>
      </div>
    </div>
  )
}
export default NewProduct
const cssProduct = css`
  padding: 12px 0px;
  border-radius: 8px;
  background-color: var(--color-white);
  .titles {
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 30px;
    line-height: 32px;
    font-family: 'Montserrat';
    color: #221f20;
    margin-top: 40px;
  }

  .titles-desc {
    font-size: 20px;
    font-family: 'MuliDisplayVN', sans-serif;
    font-weight: 300;
    color: #333;
    margin: 20px auto 40px;
  }
  .list-product {
    display: grid;
    justify-content: center;
    align-self: stretch;
    gap: 20px;
    grid-template-columns: repeat(5, 257px);
  }
  .list-product-mobile {
    display:none
  }
  @media (min-width: 0) and (max-width: 739px) {
    .list-product{
      display: none
    }
    .list-product-mobile {
      grid-template-columns: 1fr 1fr;
      padding: 5px 10px;
      display:grid;
      gap: 10px;
    }
    .titles {
      font-size: 20px;
      margin-top: 0;
    }
    .titles-desc{
      font-size: 16px;
      margin: 16px auto 32px;
    }
  }
`
const cssButton = css`
  border: 1px solid #221f20;
  box-sizing: border-box;
  border-radius: 24px 0px;
  padding: 13px 24px;
  font-size: 16px;
  line-height: 20px;
  display: inline-block;
  position: relative;
`
