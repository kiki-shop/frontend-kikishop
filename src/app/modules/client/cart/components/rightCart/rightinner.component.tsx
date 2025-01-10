import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useCartRedux } from '../../../redux/hook/useCartReducer'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
interface RightCartProps {
  props?: any
}

const RightCart: FunctionComponent<RightCartProps> = () => {
  const [totalPrice, setTotalPrice] = useState<any>(0)
  const navigate = useNavigate()
  const {
    data: { listProductBuy },
    actions
  } = useCartRedux()

  useEffect(() => {
    actions.getAllCart()
  }, [])
  const checkProductBuy = localStorage.getItem('listSelectCart')
  useEffect(() => {
    if (listProductBuy) {
      const calculatedTotal = listProductBuy.reduce(
        (total: any, item: any) => total + item?.product?.price * item?.quantityOrder?.quantity,
        0
      )
      setTotalPrice(calculatedTotal)
    }
  }, [listProductBuy])
  const handelNavigate = () => {
    if (listProductBuy.length == 0) {
      toast.error('chưa chọn mua sản phẩm nào')
    } else {
      navigate('/payment')
    }
  }
  return (
    <div css={cssRightCart}>
      <div className='prices-item mt-[45px]'>
        <h2 className='text-[20px] font-semibold text-center'>Tổng tiền giỏ hàng</h2>
        <ul className='price'>
          <li className='sm:flex max-sm:flex justify-between py-5'>
            <div className='text-[16px]'>Tạm tính</div>
            <div className='value text-[16px]'>
              {checkProductBuy
                ? totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                : (0)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </div>
          </li>
          <li className='sm:flex max-sm:flex justify-between'>
            <div className='text-[16px]'>Giảm giá</div>
            <div className='value text-[16px]'>{(0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
          </li>
        </ul>
        <div className='prices-total sm:flex justify-between max-sm:flex'>
          <span className='text-[16px]'>Tổng tiền</span>
          <div className='content'>
            <p className='price-total'>
              {checkProductBuy
                ? totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                : (0)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </p>
          </div>
        </div>
      </div>
      <button onClick={handelNavigate}>Mua hàng ({checkProductBuy ? listProductBuy.length : 0})</button>
    </div>
  )
}
export default RightCart

const cssRightCart = css`
  .information {
    border-radius: 4px;
    margin-bottom: 12px;
    background-color: var(--color-white);
  }
  .prices-item {
    border-radius: 4px;
    margin-bottom: 12px;
    background-color: var(--color-white);
  }
  i {
    display: block;
    width: 1px;
    height: 13px;
    background-color: rgb(235, 235, 240);
    margin: 1px 8px;
  }

  .price-total {
    color: rgb(254, 56, 52);
    font-size: 22px;
    font-weight: 400;
    text-align: right;
  }
  .note {
    font-weight: 300;
    font-style: normal;
    display: block;
    font-size: 12px;
    color: rgb(51, 51, 51);
    margin-top: 3px;
    text-align: right;
  }
  .address .home {
    color: rgb(0, 171, 86);
    background-color: rgb(239, 255, 244);
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    padding: 0px 6px;
    border-radius: 100px;
    margin-right: 4px;
    height: 18px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .address p {
    color: rgb(128, 128, 137);
  }
  .title-right {
    color: rgb(128, 128, 137);
    font-weight: normal;
    margin: 0px;
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .nav {
    color: rgb(11, 116, 229);
    text-decoration: none;
    font-size: 14px;
    line-height: 20px;
  }
  .nav:hover {
    color: red;
  }
  .name {
    text-transform: uppercase;
  }
  .price {
    list-style: none;
    margin: 0px;
    padding: 17px 20px;
    border-bottom: 1px solid rgb(244, 244, 244);
  }
  .prices-total {
    padding: 17px 20px;
    display: flex;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 0px;
  }
  button {
    background: #000;
    color: rgb(255, 255, 255);
    font-size: 18px;
    padding: 13px 10px;
    text-align: center;
    border-radius: 20px;
    border: none;
    width: 80%;
    display: block;
    cursor: pointer;
    margin: 15px 0px 0px;
    transition: background-color 0.3s;
    margin: 0 auto;
  }
  button: hover {
    background: #ffaa00;
  }
`
