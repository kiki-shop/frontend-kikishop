import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { axiosPrivate } from '~/app/api/configHttp'
import dayjs from 'dayjs'
import { Button, Descriptions, DescriptionsProps, Modal, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'

const OrderProcess = () => {
  const { Title } = Typography
  const [phoneNumber, setPhoneNumber] = useState()
  const [name, setName] = useState('')
  const [messageApi, contextHolder] = message.useMessage()
  const [foundOrder, setFoundOrder] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [detailRecord, setDetailRecord] = useState({
    fullname: '',
    phoneNumber: '',
    voucherCode: '',
    productOrder: [],
    payment_methods: '',
    district: '',
    commune: '',
    locationDetail: '',
    city: '',
    totalprice: Number
  })
  useEffect(() => {
    console.log(foundOrder)
  }, [foundOrder])
  const searchOrder = async (keyword: any) => {
    return await axiosPrivate.get(`/order/search?fullname=${keyword}`)
  }
  const validatePhone = (value: any) => {
    const phoneRegExp = /^(?:(?:\+|0{0,2})84|0[3-9]|00{0,2}\d{1,4})(\d{7,11})$/
    if (value == '' && !value.match(phoneRegExp)) {
      message.error('Vui lòng nhập số điện thoại hợp lệ!')
      return false
    } else {
      return true
    }
  }
  const handleSubmit = () => {
    if (validatePhone(phoneNumber) && name !== '') {
      searchOrder(name)
        .then((res) => {
          console.log(res)
          const found = res.data.filter((order: any) => order.user === null && order.phoneNumber == phoneNumber)
          if (found.length > 0) {
            setFoundOrder(found)
          } else {
            message.error('Không tìm thấy đơn hàng của bạn!')
          }
        })
        .catch((error: any) => {
          message.error('Không tìm thấy đơn hàng của bạn!')
        })
    } else {
      message.error('Vui lòng nhập đúng thông tin!')
    }
  }
  const checkStatus = (status: any) => {
    if (status === 'đang chờ duyệt') {
      return 'type1'
    }
    if (status === 'duyệt thành công') {
      return 'type2'
    }
    if (status === 'đang vận chuyển') {
      return 'type3'
    }
    if (status === 'hoàn thành') {
      return 'type4'
    }
    if (status === 'huỷ đơn') {
      return 'type5'
    }
  }
  const handleShowPopupProduct = (record: any) => {
    setIsShowModal(true)
    setDetailRecord({
      fullname: record?.fullname,
      phoneNumber: record?.phoneNumber,
      voucherCode: record?.voucherCode,
      productOrder: record?.productOrder,
      totalprice: record?.totalprice,
      payment_methods: record?.payment_methods,
      district: record?.district,
      commune: record?.commune,
      locationDetail: record?.locationDetail,
      city: record?.city
    })
  }
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Họ và tên',
      children: detailRecord?.fullname
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: detailRecord?.phoneNumber
    },
    {
      key: '3',
      label: 'Thành phố / Tỉnh',
      children: detailRecord?.city
    },
    {
      key: '4',
      label: 'Quận / huyện',
      children: detailRecord?.district
    },
    {
      key: '6',
      label: 'Phường / Xã',
      children: detailRecord?.commune
    },
    {
      key: '7',
      label: 'Địa chỉ chi tiết',
      children: detailRecord?.locationDetail
    },
    {
      key: '8',
      label: 'Vocher Áp dụng',
      children: detailRecord?.voucherCode === null ? <div>Không có</div> : detailRecord?.voucherCode
    }
  ]
  const columnListProduct = [
    {
      title: 'Tên Sản Phẩm',
      key: 'name',
      render: (_: any, record: any) => <div className=''>{record?.product?.name}</div>
    },
    {
      title: 'Ảnh',
      key: 'images',
      render: (_: any, record: any) => (
        <div style={{ width: 70 }}>
          {record?.product?.images?.slice(0, 1).map((image: any) => image?.response || image?.url) ? (
            <img src={record?.product?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} />
          ) : (
            'Chưa có ảnh sản phẩm'
          )}
        </div>
      )
    },
    {
      title: 'Giá',
      key: 'Price',
      render: (_: any, record: any) => {
        return (
          <strong className='block text-center'>
            {(record?.quantityOrder?.quantity * record?.product?.price)?.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND'
            })}
          </strong>
        )
      }
    },
    {
      title: 'Màu | Kích cỡ | Số lượng',
      key: 'quantityOrder',
      render: (_: any, record: any) => (
        <div className=''>
          {record?.quantityOrder?.nameColor} | {record?.quantityOrder?.nameSize} | {record?.quantityOrder?.quantity}
        </div>
      )
    }
  ]
  return (
    <div css={cssFilter} className='px-[30px]'>
      {contextHolder}
      <h2>Tìm kiếm đơn hàng của bạn</h2>
      <p className='note'>
        *Lưu ý: Nếu quý khách muốn hủy đơn hàng vui lòng liên hệ hotline <strong>0939232288</strong> hoặc điền vào{' '}
        <Link to='/Contacts' className='link'>
          form ý kiến phản hồi
        </Link>{' '}
        để được hỗ trợ.
      </p>
      <div className='search-block'>
        <input
          type='tel'
          name=''
          onChange={(event: any) => setPhoneNumber(event.target.value)}
          placeholder='Số điện thoại'
          id=''
        />
        <input type='text' onChange={(event: any) => setName(event.target.value)} name='' placeholder='Tên' id='' />
        <div className='button'>
          <button onClick={handleSubmit}>Tìm kiếm</button>
        </div>
      </div>

      <div className='list-order'>
        {foundOrder.length > 0 ? (
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Ngày tạo</th>
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th>Tổng tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {foundOrder.map((order: any) => {
                return (
                  <tr>
                    <td>{dayjs(order.createdAt).format('MM-DD-YYYY')}</td>
                    <td>{order.fullname}</td>
                    <td>
                      <p className={`${checkStatus(order.orderStatus)} status`}>{order.orderStatus}</p>
                    </td>
                    <td>{order.payment_methods}</td>
                    <td> {order.totalprice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                    <td>
                      <Button type='primary' onClick={() => handleShowPopupProduct(order)}>
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <img></img>
        )}
      </div>
      <Modal title={null} open={isShowModal} onCancel={() => setIsShowModal(false)} width={1000} footer={null}>
        <Descriptions title='Thông tin khách hàng' items={items} />
        <Title level={5}>Sản phẩm mua</Title>
        <div className='pt-5'>
          <Table columns={columnListProduct} dataSource={detailRecord.productOrder} />
        </div>
      </Modal>
    </div>
  )
}
const cssFilter = css`
  margin-top: 40px;
  h2 {
    font-size: 25px;
    max-width: 70%;
    margin: auto;
  }
  .link {
    color: blue;
  }
  .note {
    max-width: 70%;
    margin: 8px auto;
    color: #333;
  }
  .search-block {
    margin: 20px auto;
    max-width: 70%;
    display: flex;
    gap: 20px;
  }
  .search-block input {
    height: 40px;
    width: 40%;
    border: 1px solid #d1d1d1;
    border-radius: 6px;
    padding: 0 8px;
  }
  .search-block button {
    border: 1px solid #d1d1d1;
    border-radius: 20px 0 20px;
    width: 90px;
    color: #fff;
    background-color: #333;
    height: 102%;
    position: absolute;
    left: -2px;
    top: -3px;
    height: 40px;
  }
  .search-block .button {
    position: relative;
    border: 1px solid #d1d1d1;
    border-radius: 20px 0 20px;
    width: 96px;
    height: 38px;
    margin-top: 2px;
  }
  .list-order {
    min-height: 200px;
    max-height: 700px;
    overflow-x: hidden;
  }
  table {
    max-width: 87%;
    margin: 34px auto;
  }
  th {
    padding: 10px 58px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
  tbody tr {
    padding: 30px;
    border: 1px solid #d1d1d1;
    border-radius: 10px;
  }
  tbody tr td {
    text-align: center;
    padding: 30px;
  }
  tbody .status {
    padding: 5px;
    border-radius: 5px;
    color: #333;
    width: fit-content;
    text-transform: capitalize;
  }
  .type1 {
    // background-color: #C2FBD7;
    background-color: #fff900;
  }
  .type2 {
    background-color: #c2fbd7;
  }
  .type3 {
    background-color: #ffe4e1;
  }
  .type4 {
    background-color: #1e90ff;
    color: #fff !important;
  }
  .type5 {
    background-color: #ff5159;
    color: #fff !important;
  }
`
export default OrderProcess
