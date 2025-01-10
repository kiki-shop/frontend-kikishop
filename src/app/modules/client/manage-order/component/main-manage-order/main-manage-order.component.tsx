import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useOrderRedux } from '../../../redux/hook/useOrderReducer'
import moment from 'moment'
import { updateOrder } from '~/app/api/order/order.api'
import toast from 'react-hot-toast'
import { Button, message, Popconfirm, Pagination } from 'antd'
import Pusher from 'pusher-js'

interface MainManangeOrderProps {
  props?: any
}

const MainManangeOrder: FunctionComponent<MainManangeOrderProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [pusherData, setPusherData] = useState<any>(null)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const {
    data: { orders },
    actions
  } = useOrderRedux()
  const sortedData = [...orders].sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    actions.getAllOrder()
  }, [actions])

  useEffect(() => {
    actions.getAllOrder()
  }, [])

  useEffect(() => {
    var pusher = new Pusher('e42502c24124b723c7c8', {
      cluster: 'ap1'
    })
    var channel = pusher.subscribe('my-channel')
    channel.bind('my-event', (data: any) => {
      if (data) {
        setPusherData(data)
      }
    })
    return () => {
      channel.unbind('my-event')
      pusher.unsubscribe('my-channel')
    }
  }, [])
  useEffect(() => {
    if (pusherData) {
      actions.getAllOrder()
    }
  }, [pusherData])
  const confirm = (id: any, dataStatus: any) => {
    if (dataStatus !== 'đang chờ duyệt') {
      return toast.error('Không thể huỷ đơn')
    }
    updateOrder({ orderId: id, orderStatus: 'huỷ đơn' }).then(
      (res) => {
        if (res) {
          toast.success('Huỷ thành công')
          // The socket will emit 'order_updated' event
          // and the useEffect above will update the orders
        }
      },
      (err) => {
        toast.error(err?.response?.data)
      }
    )
  }

  const confirmSucceer = (id: any, dataStatus: any) => {
    if (dataStatus !== 'đang vận chuyển') {
      return toast.error('Chưa thể xác nhận')
    }
    updateOrder({ orderId: id, orderStatus: 'hoàn thành' }).then(
      (res) => {
        if (res) {
          toast.success('Xác nhận thành công')
          // The socket will emit 'order_updated' event
          // and the useEffect above will update the orders
        }
      },
      (err) => {
        toast.error('Lỗi khi xác nhận')
      }
    )
  }

  const cancel = (e: any) => {
    message.error('Đã xác nhận không huỷ')
  }
  return (
    <div css={cssMainManangeOrder}>
      <h1>Quản lý đơn hàng</h1>
      <div className='hidden md:block'>
        <table className='w-full lg:w-[1200px] text-[18px] lg:text-[16px]'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày</th>
              <th>Trạng thái đơn hàng</th>
              <th className='w-auto lg:w-[400px]'>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.slice(startIndex, endIndex).map((order: any, index: any) => {
              return (
                <tr key={order?._id}>
                  <td>{index + 1}</td>
                  <td>
                    {moment
                      .utc(order?.updatedAt)
                      .utcOffset(+7)
                      .format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                  <td
                    className={
                      order?.orderStatus === 'đang chờ duyệt' || order?.orderStatus === 'huỷ đơn'
                        ? 'text-red-700'
                        : 'text-green-700'
                    }
                  >
                    {order?.orderStatus}
                  </td>

                  <td>
                    {order.productOrder.map((product: any) => (
                      <div key={product?._id} className='title'>
                        <div>
                          <p className='pb-4 text-[18px] lg:text-[16px]'>
                            {product?.product?.name}{' '}
                            <a href='#' className='text-green-600'>
                              chi tiết
                            </a>
                          </p>
                        </div>
                        <div className='news-product right-16'>
                          <p className='product-color'>Màu sắc: {product?.quantityOrder?.nameColor}</p>
                          <p className='product-size'>Kích thước: {product?.quantityOrder?.nameSize}</p>
                          <p className='product-quantity'>Số lượng: {product?.quantityOrder?.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{order?.totalprice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                  <td>
                    {order?.orderStatus == 'đang chờ duyệt' && (
                      <Popconfirm
                        title='huỷ đơn'
                        description='bạn có chắn chắn huỷ không?'
                        onConfirm={() => confirm(order?._id, order?.orderStatus)}
                        onCancel={cancel}
                        okText='Yes'
                        cancelText='No'
                      >
                        <Button danger>huỷ đơn hàng</Button>
                      </Popconfirm>
                    )}
                    {order?.orderStatus == 'đang vận chuyển' && (
                      <Popconfirm
                        title='xác nhận'
                        description='bạ đã nhận được hàng chưa?'
                        onConfirm={() => confirmSucceer(order?._id, order?.orderStatus)}
                        onCancel={cancel}
                        okText='Yes'
                        cancelText='No'
                      >
                        <Button className='bg-green-700 text-white hover:text-white'>hoàn thành</Button>
                      </Popconfirm>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
          className='py-20 text-right'
          current={currentPage}
          pageSize={pageSize}
          total={orders.length}
          onChange={setCurrentPage}
        />
      </div>
      <div className='block md:hidden'>
        {sortedData.slice(startIndex, endIndex).map((order: any, index: any) => {
          return (
            <div className='w-full pb-5 mb-5  border-b-2 space-y-5' key={order?._id}>
              <div className='flex justify-between'>
                <div>STT: {index + 1}</div>
                <div>
                  {moment
                    .utc(order?.updatedAt)
                    .utcOffset(+7)
                    .format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              <div className='flex justify-between'>
                <div>Trạng thái:</div>
                <div
                  className={
                    order?.orderStatus === 'đang chờ duyệt' || order?.orderStatus === 'huỷ đơn'
                      ? 'text-red-700'
                      : 'text-green-700'
                  }
                >
                  {order?.orderStatus}
                </div>
              </div>

              <div>
                <div>Sản phẩm: </div>

                {order.productOrder.map((product: any) => (
                  <div key={product?._id} className='title ml-3'>
                    <div className='flex justify-between'>
                      <p className='pb-2'>-{product?.product?.name} </p>
                      <a href='#' className='text-green-600'>
                        chi tiết
                      </a>
                    </div>
                    <div className='news-product right-16'>
                      <p className='product-color'>Màu sắc: {product?.quantityOrder?.nameColor}</p>
                      <p className='product-size'>Kích thước: {product?.quantityOrder?.nameSize}</p>
                      <p className='product-quantity'>Số lượng: {product?.quantityOrder?.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-between'>
                <p>Tổng tiền:</p>
                <p>{order?.totalprice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
              </div>
              <div className='text-right'>
                {order?.orderStatus == 'đang chờ duyệt' && (
                  <Popconfirm
                    title='huỷ đơn'
                    description='bạn có chắn chắn huỷ không?'
                    onConfirm={() => confirm(order?._id, order?.orderStatus)}
                    onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button danger>Huỷ đơn hàng</Button>
                  </Popconfirm>
                )}
                {order?.orderStatus == 'đang vận chuyển' && (
                  <Popconfirm
                    title='xác nhận'
                    description='bạ đã nhận được hàng chưa?'
                    onConfirm={() => confirmSucceer(order?._id, order?.orderStatus)}
                    onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button className='bg-green-700 text-white hover:text-white'>Hoàn thành</Button>
                  </Popconfirm>
                )}
              </div>
            </div>
          )
        })}
        <Pagination
          className='py-20 text-right'
          current={currentPage}
          pageSize={pageSize}
          total={orders.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default MainManangeOrder

const cssMainManangeOrder = css`
  padding: 0 20px;
  border-left: 1px solid gray;
  h1 {
    font-weight: 600;
    font-size: 24px;
  }
  .product-color {
    font-weight: bold;
    color: #333;
  }

  .product-size {
    font-style: italic;
    color: #666;
  }

  .product-quantity {
    font-size: 14px;
    color: #999;
  }
  .news-product {
    list-style: none;
    background-color: white;
    box-shadow: 0 0 7px gray;
    position: absolute;
    top: 100%;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    border-radius: 4px;
    z-index: 1;
    visibility: hidden;
  }
  .title:hover .news-product {
    visibility: visible;
  }
  .title {
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    position: relative;
  }
  th {
    border-top: 1px solid #f7f8f9;
    border-bottom: 1px solid #f7f8f9;
    height: 55px;
    font-size: 14px;
    line-height: 16px;
    color: #6c6d70;
    vertical-align: top;
    padding-top: 21px;
    padding-bottom: 12px;
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  td {
    text-align: center;
    padding-top: 30px;
  }
`
