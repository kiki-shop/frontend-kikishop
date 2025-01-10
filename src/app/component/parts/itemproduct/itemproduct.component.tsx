import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { PiHandbagSimpleThin } from 'react-icons/pi'
import { AiOutlineHeart } from 'react-icons/ai'
import ButtonSqua from '../button/ButtonSqua'
import { getListColor, getListSize } from '~/app/modules/client/helper/tranform.data'
interface ItemProductProps {
  props?: any
  className?: string
  itemProduct?: any
}
const ItemProduct: FunctionComponent<ItemProductProps> = ({ className, itemProduct }) => {
  const [listSize, setListSize] = useState([])
  const [listColor, setListColor] = useState([])
  useEffect(() => {
    const tempColor = getListColor(itemProduct)
    const tempSize = getListSize(itemProduct)
    setListColor(tempColor)
    setListSize(tempSize)
  }, [itemProduct])
  return (
    <div css={cssProduct} className={className}>
      <div className=' mb-[17px]'>
        <img src={itemProduct?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt='' className='sm:width-[100%] min-h-[240px] max-sm:max-w-[160px] m-auto' />
      </div>
      <div className='main'>
        <div className='flex justify-between mb-4 max-sm:mb-2'>
          <div className='text-item'>
            <h3 className='truncate'>{itemProduct?.name}</h3>
          </div>
          <div>
            <AiOutlineHeart className='max-sm:text-[16px] text-[23px] max-sm:mt-[-1px] mt-[-4px] text-red-600' />
          </div>
        </div>
        <div className='sm:flex justify-between  h-[24px] sm:mt-8 sm:mb-10 mb-[3.5rem]'>
          <div className='color max-sm:mb-4 max-sm:px-[4px]'>
            {listColor &&
              listColor?.map((item: any, key = 0) => {
                if (item.nameColor)
                  return (
                    <div
                      key={item.id}
                      className=
                      {`${(key === 0) ? 'colorSelected' : ''} product-color inline-flex items-center justify-center mr-2`}
                    >
                      <div style={{ backgroundColor: `${item?.colorHex}` }} className={` h-[18px] w-[18px] rounded-[50%]`}></div>
                    </div>
                  )
              })}
          </div>
          <div className='size flex'>
            {listSize &&
              listSize?.map((item: any) => {
                if (item.nameSize)
                  return (
                    <div key={item.id} className='product-size ml-2'>
                      {item.nameSize}
                    </div>
                  )
              })}
          </div>
        </div>
        <div className='flex justify-between items-end'>
          <div className='price'>
            {itemProduct?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
          </div>
          <div>
            <ButtonSqua css={cssBtn} children={<PiHandbagSimpleThin className='text-[16px] ' />} outline={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ItemProduct
const cssProduct = css`
  overflow: hidden;
  border-radius: 4px;
  // background: rgb(255, 255, 255);
  .product-color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #d1d1d1;
  }
  .colorSelected{
    border: 1px solid gray;
  }
  .product-size {
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    width: 28px;
    height: 22px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .color li {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .text-item {
    color: #373737;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-bottom: 10px;
    text-transform: capitalize;
    width: 75%;
    overflow: hidden;
  }
  .price {
    font-size: 100%;
    font-size: 16px;
    color: #3e3e3f;
    font-weight: 600;
    vertical-align: baseline;
    margin: auto 0;
  }
  .asa {
    margin-top: 5px;
    text-align: left;
    font-size: 1rem;
    color: rgb(39, 39, 42);
  }
  .time {
    margin-top: 5px;
    text-align: left;
    font-size: 1rem;
    color: rgb(128, 128, 137);
    padding: 10px 10px;
  }
  &:hover {
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    transform: translateY(-3px);
    // box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 640px){
      .text-item {
       width: 130px;
       font-size: 13px;
      }
}
`
const cssBtn = css`
  padding: 8px;
  border-radius: 8px 0;
`
