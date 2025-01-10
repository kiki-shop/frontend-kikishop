import { FunctionComponent, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import StarIcon from '~/app/component/parts/rating/star.component'
import QuantityProduct from '~/app/component/parts/quantity/QuantityProduct'
import ButtonSqua from '~/app/component/parts/button/ButtonSqua'
import { useProductRedux } from '~/app/modules/client/redux/hook/useProductReducer'
import { getListColor, getListSize } from '~/app/modules/client/helper/tranform.data'
import { useCartRedux } from '~/app/modules/client/redux/hook/useCartReducer'
import { addProductToCarts } from '~/app/api/cart/cart.api'
import { message } from 'antd'
import { AiOutlineHeart, AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { CiRuler } from 'react-icons/ci'
import { TiTick } from 'react-icons/ti'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { getAllComment } from '~/app/api/comment/comment.api'
import ButtonComponent from '~/app/component/parts/button/Button.componet'
import mongoose from 'mongoose'
import toast from 'react-hot-toast'
interface DetailInformation {}

const DetailInformation: FunctionComponent<DetailInformation> = ({}) => {
  const {
    data: { product: productDetail }
  } = useProductRedux()
  const {
    data: { carts, cartAccount },
    actions
  } = useCartRedux()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [colorSelect, setColorSelect] = useState<any>()
  const [sizeSelect, setSizeSelect] = useState<any>()
  const [checkQuantity, setCheckQuantity] = useState<any[]>([])
  const [quantityRemainProduct, setquantityRemainProduct] = useState<any>({})
  const [listColor, setListColor] = useState([])
  const [listSize, setListSize] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [showInfo, setIsShowInfo] = useState()
  const [optionInfo, setOptionInfo] = useState('intro')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  useEffect(() => {
    setCheckQuantity([])
    const tempColor = getListColor(productDetail)
    const tempSize = getListSize(productDetail)
    setListColor(tempColor)
    setListSize(tempSize)
    setIsShowInfo(productDetail?.description)
  }, [productDetail])

  const handleSelectColor = (colorId: any) => {
    const findElement = listColor.find((item: any) => item.id == colorId)
    if (colorId == colorSelect?.id) {
      setColorSelect(null)
    } else {
      setColorSelect(findElement)
    }
  }

  const handleSelectSize = (sizeId: any) => {
    const findElement = listSize.find((item: any) => item.id == sizeId)
    if (sizeId == sizeSelect?.id) {
      setSizeSelect(null)
    } else {
      setSizeSelect(findElement)
    }
  }

  useEffect(() => {
    const filterListQuantity = productDetail.listQuantityRemain?.filter(
      (item: any) => item.nameColor === colorSelect?.nameColor || item.nameSize === sizeSelect?.nameSize
    )
    const findQuantityRemain = productDetail.listQuantityRemain?.find(
      (item: any) => item.nameColor === colorSelect?.nameColor && item.nameSize === sizeSelect?.nameSize
    )
    setCheckQuantity(filterListQuantity)
    setquantityRemainProduct(findQuantityRemain)
  }, [colorSelect, sizeSelect])
  const generateUniqueId = () => {
    const objectId = new mongoose.Types.ObjectId()
    return objectId.toString()
  }

  const handelAddProductToCart = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!colorSelect || !sizeSelect) {
      messageApi.error('Vui lòng chọn thông tin')
      return
    }
    if (quantityRemainProduct.quantity == null || quantityRemainProduct.quantity == 0) {
      message.error('hêt hàng')
      return
    }
    if (!accessToken) {
      const storedCartString = localStorage.getItem('cartNoAccount')
      actions.addProductToCartNoUser({
        _id: generateUniqueId(),
        product: productDetail,
        quantityOrder: {
          quantity,
          nameColor: colorSelect.nameColor,
          nameSize: sizeSelect.nameSize
        }
      })
      if (storedCartString !== null) {
        try {
          const existingCart = JSON.parse(storedCartString)

          const newProduct = {
            _id: generateUniqueId(),
            product: productDetail,
            quantityOrder: {
              quantity,
              nameColor: colorSelect.nameColor,
              nameSize: sizeSelect.nameSize
            }
          }

          const existingProductIndex = existingCart.findIndex((item: any) => {
            return (
              item.product._id === productDetail._id &&
              item.quantityOrder.nameColor === colorSelect.nameColor &&
              item.quantityOrder.nameSize === sizeSelect.nameSize
            )
          })

          if (existingProductIndex !== -1) {
            existingCart[existingProductIndex].quantityOrder.quantity += quantity
          } else {
            existingCart.push(newProduct)
          }
          localStorage.setItem('cartNoAccount', JSON.stringify(existingCart))
          toast.success('thêm vào giỏ hàng thành công')
        } catch (error) {}
      } else {
        const newCart = [
          {
            _id: generateUniqueId(),
            product: productDetail,
            quantityOrder: {
              quantity,
              nameColor: colorSelect.nameColor,
              nameSize: sizeSelect.nameSize
            }
          }
        ]

        localStorage.setItem('cartNoAccount', JSON.stringify(newCart))
      }
    }

    if (!colorSelect || !sizeSelect) {
      messageApi.error('Vui lòng chọn thông tin')
      return
    }
    if (quantityRemainProduct.quantity == null || quantityRemainProduct.quantity == 0) {
      message.error('hêt hàng')
      return
    }
    if (accessToken) {
      const requestApiCart = {
        productId: productDetail._id,
        quantityOrder: {
          quantity,
          nameColor: colorSelect.nameColor,
          nameSize: sizeSelect.nameSize
        }
      }

      addProductToCarts(requestApiCart).then(
        (res) => {
          if (res) {
            const requestProduct = {
              product: productDetail,
              quantityOrder: {
                quantity,
                nameColor: colorSelect.nameColor,
                nameSize: sizeSelect.nameSize
              }
            }
            actions.addProductToCart(requestProduct)
            toast.success('Thêm vào giỏ hàng thành công')
          }
        },
        (err) => {
          message.error(err?.response?.data)
        }
      )
    }
  }

  const changeInfo = (type: any) => {
    setOptionInfo(type)
    if (type === 'intro') setIsShowInfo(productDetail?.description)
    if (type === 'detail') setIsShowInfo(productDetail?.detail)
    if (type === 'protect') setIsShowInfo(productDetail?.protect)
  }
  const [averageStar, setAverageStar] = useState<any>(0)
  const [lengthEvaluate, setLengthEvaluate] = useState<any>()
  let { id } = useParams()
  useEffect(() => {
    getAllComment().then((res) => {
      if (res) {
        const productComments = res.filter((item: any) => item.productId._id === id)
        setLengthEvaluate(productComments)
        const totalStars = productComments.reduce((sum: any, comment: any) => sum + parseInt(comment.star), 0)
        const avgStar = productComments.length > 0 ? totalStars / productComments.length : 5
        setAverageStar(avgStar)
      }
    })
  }, [])

  const starComponents = []
  for (let i = 1; i <= averageStar; i++) {
    starComponents.push(<StarIcon key={i} />)
  }
  return (
    <div css={cssInfomation}>
      {contextHolder}
      <div>
        <h1 className='font-semibold text-[30px] '> {productDetail?.name}</h1>
      </div>
      <div className='flex mt-2 space-x-5'>
        <p className='text-2xl hidden sm:block'>Thương hiệu: {productDetail?.brand}</p>
        <div className='flex star'>{starComponents}</div>
        <div>({lengthEvaluate?.length} đánh giá)</div>
      </div>
      <div className='mt-5 text-[20px]'>MASP: {productDetail?.code}</div>
      <div className='grid grid-cols-7 xl:mt-10'>
        <div className='col-span-12 '>
          <div className='flex pt-5 mb-[20px] p-3'>
            <h1 className='text-black font-semibold text-[26px] '>
              {productDetail?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </h1>
            {productDetail?.cost !== productDetail?.price && (
              <h3 className='pl-5 text-[18px] text-[#a8a9ad]'>
                <del>{productDetail?.cost?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</del>
              </h3>
            )}
            {productDetail?.cost !== productDetail?.price && (
              <div className='px-6'>
                <p className='text-white bg-[#dc633a] p-2'>
                  -{Math.floor(((productDetail?.cost - productDetail?.price) / productDetail?.cost) * 100)}%
                </p>
              </div>
            )}
          </div>
          <div className='mt-5 max-sm:ml-5'>
            <div>
              <div className='mt-5 '>
                <div className='mb-5 text-[18px]'>
                  Màu Sắc: <span className='font-semibold'>{colorSelect?.nameColor}</span>
                </div>
                <div className='flex items-center my-[30px]'>
                  {listColor?.map((item: any) => (
                    <div
                      key={item.id}
                      className={`h-[40px] w-[40px] border rounded-[50%] inline-flex items-center justify-center mr-[20px] cursor-pointer ${
                        colorSelect?.id === item.id && 'border-black'
                      } ${
                        !checkQuantity?.flatMap((itemType: any) => itemType?.nameColor).includes(item.nameColor) &&
                        checkQuantity.length > 0 &&
                        'bg-slate-100 pointer-events-none text-gray-400'
                      }`}
                    >
                      <div
                        key={item.id}
                        style={{ backgroundColor: `${item.colorHex}` }}
                        className={`p-3 border h-[32px] w-[32px]  rounded-[50%]  ${colorSelect?.id === item.id && ''} ${
                          !checkQuantity?.flatMap((itemType: any) => itemType?.nameColor).includes(item.nameColor) &&
                          checkQuantity.length > 0 &&
                          'bg-slate-100 pointer-events-none text-gray-400'
                        }`}
                        onClick={() => handleSelectColor(item.id)}
                      >
                        {colorSelect?.id === item.id && <TiTick className=' text-black text-[16px] m-auto' />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='mt-5 '>
                <div className='mb-3 text-[18px]'>
                  Kích cỡ: <span className='font-semibold'>{sizeSelect?.nameSize}</span>
                </div>
                <div className='flex items-center my-[30px]'>
                  {listSize?.map((item: any) => (
                    <div
                      key={item.id}
                      className={`p-3 border w-[48px] items-center inline-flex justify-center rounded-[2px] mr-[2rem] cursor-pointer ${
                        sizeSelect?.id === item.id && 'border-black'
                      } ${
                        !checkQuantity?.flatMap((itemType: any) => itemType?.nameSize).includes(item.nameSize) &&
                        checkQuantity.length > 0 &&
                        'bg-slate-100 pointer-events-none text-gray-400'
                      }`}
                      onClick={() => handleSelectSize(item.id)}
                    >
                      {item.nameSize}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='ruler w-[180px]'>
            <Popup
              modal
              trigger={
                <button className='flex gap-[10px]'>
                  <CiRuler className='inline-block' /> <span>Kiểm tra size của bạn</span>
                </button>
              }
            >
              <div className='popup-contents h-[500px] overflow-x-hidden'>
                <img width={'100%'} src='https://canifa.com/assets/Boy-measurement.png' />
              </div>
            </Popup>
          </div>

          <div className='mt-[3rem] space-x-5 items-center'>
            {/* <ButtonSqua className='btn'>MUA HÀNG</ButtonSqua> */}
            <div className='flex items-center'>
              <label htmlFor='quantity' className='text-[18px]'>
                Số Lượng:
              </label>
              <div className='mx-3'>
                <QuantityProduct
                  quantity={quantity}
                  listQuantityRemain={productDetail?.listQuantityRemain}
                  setQuantity={setQuantity}
                  sizeSelect={sizeSelect}
                  colorSelect={colorSelect}
                />
              </div>
              <div>
                {quantityRemainProduct && (
                  <div className='my-auto ml-4 text-gray-600 text-[1.6rem]'>
                    {quantityRemainProduct?.quantity} sản phẩm có sẵn
                  </div>
                )}
              </div>
            </div>
            <ButtonSqua outline className='btn mt-[3rem]' onClick={handelAddProductToCart}>
              THÊM VÀO GIỎ
            </ButtonSqua>
          </div>
          <div className='mt-[50px]'>
            <div className='tab-header flex space-x-8'>
              <div className={optionInfo === 'intro' ? 'active' : 'placeholder:'} onClick={() => changeInfo('intro')}>
                GIỚI THIỆU
              </div>
              <div className={optionInfo === 'detail' ? 'active' : ''} onClick={() => changeInfo('detail')}>
                CHI TIẾT SẢN PHẨM
              </div>
              <div className={optionInfo === 'protect' ? 'active' : ''} onClick={() => changeInfo('protect')}>
                BẢO QUẢN
              </div>
            </div>
            <div className='tab-body pt-6'>
              <div className={hidden ? `tab-body pt-6` : 'tab-body pt-6 w-full h-[100px] overflow-hidden'}>
                {showInfo}
              </div>
            </div>
            <div className='h-[2px] bg-gray-300 flex items-center '>
              <a className='mx-auto bg-white text-[34px]  text-gray-300 '>
                {hidden ? (
                  <AiOutlineUpCircle onClick={() => setHidden(!hidden)} />
                ) : (
                  <AiOutlineDownCircle onClick={() => setHidden(!hidden)} />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailInformation

const cssInfomation = css`
  margin: 5px 10px 0px 100px;
  font-family: sans-serif;
  .ruler {
    font-size: 14px;
    margin: 20px 0;
  }
  .popup-contents {
    height: 411px !important;
    overflow-x: hidden !important;
  }
  .popup-content {
    width: 100% !important;
  }
  .popup-contents img {
    overflow-y: hidden;
    width: 100%;
  }
  .ruler:hover {
    color: #ffaa00;
    cursor: pointer;
  }
  .fa-star {
    color: gold;
    font-size: 24px;
  }
  .changeAdress {
    color: rgb(11, 116, 229);
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px 0;
    padding: 15px 50px 15px 50px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    height: 48px;
  }
  .tab-header div {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    padding: 18px 0;
    color: #6c6d70;
    cursor: pointer;
    position: relative;
  }
  .tab-body div {
    font-size: 16px;
    line-height: 24px;
    color: #3e3e3f;
    margin-bottom: 2em;
    width: 555px;
  }
  .active {
    border-bottom: 2px solid #000;
  }
  @media (max-width: 640px) {
    margin: 10px;
    .title {
      font-size: 20px;
      padding: 0px 5px;
    }
    .star {
      padding: 3px 5px;
    }
    .sale {
      border: 1px solid rgb(252 165 165);
      padding: 2px;
      margin-left: 5px;
      background-color: rgb(254 242 242);
    }
    .tab-body div {
      font-size: 16px;
      line-height: 24px;
      color: #3e3e3f;
      margin-bottom: 2em;
      width: 100%;
    }
    .tab-header div {
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      padding: 18px 0;
      color: #6c6d70;
      cursor: pointer;
      position: relative;
    }
  }
  @media (max-width: 1024px) {
    margin: 10px;
    .tab-body div {
      font-size: 16px;
      line-height: 24px;
      color: #3e3e3f;
      margin-bottom: 2em;
      width: 100%;
    }
    .tab-header div {
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      padding: 18px 0;
      color: #6c6d70;
      cursor: pointer;
      position: relative;
    }
  }
`
