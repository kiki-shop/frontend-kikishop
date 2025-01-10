import { FunctionComponent, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import SidePayment from './component/side-payment/side-payment.component'
import Shipping from './component/shipping/shipping.component'
import Payments from './component/payments/payments.componet'
import { useForm } from 'react-hook-form'
import { schema } from '../utils/validateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { addOrder } from '~/app/api/order/order.api'
import toast from 'react-hot-toast'
import LayoutLoading from '~/app/component/stack/layout-loadding/layout-loadding.component'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'antd'
import { getOneUserSystem } from '~/app/api/auth/auth.api'
import { useVorcherRedux } from '../redux/hook/useVorcherReducer'
import { useOrderRedux } from '../redux/hook/useOrderReducer'
import { createPayment, getPayment } from '~/app/api/payment/payment.api'
import { useCartRedux } from '../redux/hook/useCartReducer'

interface CheckOutProps {
  props?: any
}

const CheckOut: FunctionComponent<CheckOutProps> = () => {
  const [loadingCreate, setLoadingCreate] = useState(false)
  const navigate = useNavigate()
  const id = localStorage.getItem('userID')
  const arrayField = ['fullname', 'phoneNumber']
  const [totalPrice, setTotalPrice] = useState<any>(0)
  const {
    data: { vorchers },
    actions: actionsVorcher
  } = useVorcherRedux()
  const {
    data: { infoOrder },
    actions: actionsOrder
  } = useOrderRedux()

  useEffect(() => {
    actionsVorcher.getVorcher()
  }, [])

  const {
    data: { listProductBuy },
    actions
  } = useCartRedux()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const userData = (await getOneUserSystem(id)).data
      const filteredData: any = {}
      arrayField.forEach((key: any) => {
        if (userData.hasOwnProperty(key)) {
          filteredData[key] = userData[key]
        }
      })
      return filteredData
    }
  })

  useEffect(() => {
    if (listProductBuy) {
      const calculatedTotal = listProductBuy.reduce(
        (total: any, item: any) => total + item?.product?.price * item?.quantityOrder.quantity,
        0
      )
      setTotalPrice(calculatedTotal)
    }
  }, [listProductBuy])

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Thanh toán khi nhận hàng')

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method)
  }
  const onSubmit = async (data: any) => {
    const voucherCode = localStorage.getItem('voucherCode')
    const voucher = vorchers?.find((item: any) => item.code === voucherCode)
    const discount = voucher?.discount
    const discountAmount = discount ? (discount / 100) * totalPrice : 0
    let sumOrderPrice = totalPrice - discountAmount
    sumOrderPrice = Math.max(sumOrderPrice, 0)
    if (!voucher && voucherCode) {
      toast.error('Voucher không khớp')
      return
    }

    setLoadingCreate(true)
    const voucherCodeData = voucherCode || null
    const cartData = {
      ...data,
      totalprice: sumOrderPrice,
      productOrder: listProductBuy,
      payment_methods: selectedPaymentMethod,
      voucherCode: voucherCodeData
    }
    actionsOrder.addressOrder({ ...data })

    if (selectedPaymentMethod === 'vnpay') {
      try {
        const response: any = await createPayment({ infoOrder, productOrder: sumOrderPrice })
        const vnpayUrl = response.data
        window.location.href = vnpayUrl
        getPayment().then((res) => console.log(res.data))
      } catch (error: any) {
        setLoadingCreate(false)
        toast.error('Lỗi khi tạo đơn hàng: ' + error.message)
      }
      const res = await addOrder(cartData)
      if (res) {
        setLoadingCreate(false)
        const cartLocal = localStorage.getItem('cartNoAccount')
        const cartFromStorage = JSON.parse(cartLocal || '[]')
        if (cartData) {
          cartData.productOrder.forEach((orderedProduct: any) => {
            const productIndex = cartFromStorage.findIndex((item: any) => item._id === orderedProduct._id)
            if (productIndex !== -1) {
              cartFromStorage.splice(productIndex, 1)
            }
          })
          localStorage.setItem('cartNoAccount', JSON.stringify(cartFromStorage))
        }
        localStorage.removeItem('listSelectCart')
        localStorage.removeItem('voucherCode')
        localStorage.removeItem('sale')
        localStorage.removeItem('total')
        actions.clearCart()
        toast.success('Tạo đơn hàng thành công')
        navigate('/thankcustomers')
      } else {
        toast.error('Tạo đơn hàng lỗi')
      }
    } else {
      const res = await addOrder(cartData)
      if (res) {
        setLoadingCreate(false)
        const cartLocal = localStorage.getItem('cartNoAccount')
        const cartFromStorage = JSON.parse(cartLocal || '[]')
        if (cartData) {
          cartData.productOrder.forEach((orderedProduct: any) => {
            const productIndex = cartFromStorage.findIndex((item: any) => item._id === orderedProduct._id)
            if (productIndex !== -1) {
              cartFromStorage.splice(productIndex, 1)
            }
          })
          localStorage.setItem('cartNoAccount', JSON.stringify(cartFromStorage))
        }
        localStorage.removeItem('listSelectCart')
        localStorage.removeItem('voucherCode')
        actions.clearCart()
        toast.success('Tạo đơn hàng thành công')
        navigate('/thankcustomers')
      } else {
        toast.error('Tạo đơn hàng lỗi')
      }
    }
  }

  const checkcartLocal = localStorage.getItem('listSelectCart')
  return (
    <>
      {checkcartLocal ? (
        <LayoutLoading condition={loadingCreate}>
          <div css={checkoutcss} className='mx-auto w-full lg:w-[1440px]'>
            <form action='' onSubmit={handleSubmit(onSubmit)}>
              <div className='block lg:flex justify-center'>
                <div className='block w-full lg:flex lg:w-[64%]'>
                  <Shipping control={control} />
                  <Payments
                    selectedPaymentMethod={selectedPaymentMethod}
                    handlePaymentMethodChange={handlePaymentMethodChange}
                  />
                </div>
                <div className='w-full lg:w-[25%]'>
                  <SidePayment />
                </div>
              </div>
            </form>
          </div>
        </LayoutLoading>
      ) : (
        <Skeleton />
      )}
    </>
  )
}

export default CheckOut

const checkoutcss = css``
