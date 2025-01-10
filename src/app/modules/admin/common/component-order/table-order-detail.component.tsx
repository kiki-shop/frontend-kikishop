import { Button, Descriptions, DescriptionsProps, Modal, Space, Typography } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import Table, { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { FC, Fragment, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

interface PropsTypes {
  buttonByStatus?: any
  dataTable: any
  isStatistical?: boolean
}

export const TableOrderDetail: FC<PropsTypes> = ({ buttonByStatus, dataTable, isStatistical = false }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [detailRecord, setDetailRecord] = useState({
    fullname: '',
    phoneNumber: '',
    voucherCode: '',
    district: '',
    commune: '',
    locationDetail: '',
    city: '',
    productOrder: [],
    payment_methods: '',
    totalprice: Number
  })
  // console.log(detailRecord)
  const handleShowPopupProduct = (record: any) => {
    console.log(record)
    setIsShowModal(true)
    setDetailRecord({
      city: record?.city,
      fullname: record?.fullname,
      voucherCode: record?.voucherCode,
      phoneNumber: record?.phoneNumber,
      district: record?.district,
      commune: record?.commune,
      locationDetail: record?.locationDetail,
      productOrder: record?.productOrder,
      totalprice: record?.totalprice,
      payment_methods: record?.payment_methods
    })
  }
  console.log(detailRecord)
  const columns: ColumnsType<AnyObject> = [
    {
      title: 'Ngày',
      key: '_id',
      render: (_, record: any) => <div className=''>{dayjs(record.createdAt).format('MM-DD-YYYY')}</div>
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: (_, record: any) => {
        return (
          <strong
            className={`block text-center ${
              record.orderStatus === 'đang chờ duyệt' || record.orderStatus === 'huỷ đơn'
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {record.orderStatus}
          </strong>
        )
      }
    },
    {
      title: 'Tổng số lượng',
      key: 'productOrder',
      render: (_, record: any) => {
        const orderTotal = record.productOrder.reduce((orderTotal: number, product: any) => {
          return orderTotal + product.quantityOrder.quantity
        }, 0)

        return <strong className='block text-center'>{orderTotal}</strong>
      }
    },
    {
      title: 'Tổng tiền',
      key: 'productOrder',
      render: (_, record: any) => {
        // const orderTotal = record.productOrder.reduce((orderTotal: number, productCur: any) => {
        //     return orderTotal + productCur.quantityOrder.quantity * productCur.product.price
        // }, 0)
        return (
          <strong className='block text-center'>
            {record?.totalprice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
          </strong>
        )
      }
    },
    {
      title: 'Phương thức thanh toán',
      key: 'payment_methods',
      dataIndex: 'payment_methods'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: any) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleShowPopupProduct(record)}>
            Xem chi tiết
          </Button>
          {!isStatistical && (
            <Space size='middle' direction='vertical'>
              {buttonByStatus(record._id, record.orderStatus)}
            </Space>
          )}
        </Space>
      )
    }
  ]

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
      label: 'Thành phố / tỉnh',
      children: detailRecord?.city
    },
    {
      key: '4',
      label: 'Quận / huyện',
      children: detailRecord?.district
    },
    {
      key: '5',
      label: 'Xã / phường',
      children: detailRecord?.commune
    },
    {
      key: '6',
      label: 'Địa chỉ chi tiết',
      children: detailRecord?.locationDetail
    },
    {
      key: '7',
      label: 'Vocher Áp dụng',
      children: detailRecord?.voucherCode === null ? <div>Không có</div> : detailRecord?.voucherCode
    }
  ]

  const columnListProduct = [
    {
      title: 'Tên Sản Phẩm',
      key: 'name',
      render: (_: any, record: any) => <div className=''>{record.product.name}</div>
    },
    {
      title: 'Ảnh',
      key: 'images',
      render: (_: any, record: any) => (
        <div style={{ width: 70 }}>
          {record?.product.images?.slice(0, 1).map((image: any) => image?.response || image?.url) ? (
            <img src={record?.product.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} />
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
            {(record.quantityOrder.quantity * record.product.price).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND'
            })}
          </strong>
        )
      }
    },
    // {
    //     title: 'Phương thức thanh toán',
    //     key: 'payment_methods',
    //     render: (_: any, record: any) => {
    //         return <strong className='block text-center'> {record.product.payment_methods}</strong>
    //     }
    // },
    {
      title: 'Màu | Kích cỡ | Số lượng',
      key: 'quantityOrder',
      render: (_: any, record: any) => (
        <div className=''>
          {record.quantityOrder.nameColor} | {record.quantityOrder.nameSize} | {record.quantityOrder.quantity}
        </div>
      )
    }
  ]
  return (
    <Fragment>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>

      <Modal title={null} open={isShowModal} onCancel={() => setIsShowModal(false)} width={1000} footer={null}>
        <Descriptions title='Thông tin khách hàng' items={items} />
        <Title level={5}>Sản phẩm mua</Title>
        <div className='pt-5'>
          <Table columns={columnListProduct} dataSource={detailRecord.productOrder} />
        </div>
      </Modal>
    </Fragment>
  )
}
