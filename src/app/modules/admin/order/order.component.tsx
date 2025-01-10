import { Button, Form, Input, InputNumber, Modal, Segmented, Select, Typography } from 'antd'
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { filterDataOrderByStatus } from '~/app/api/order/order.api'
import { TableOrderDetail } from '../common/component-order/table-order-detail.component'
import { createOrder, deleteOrder, getAllOrder, updateOrder } from './service/order.service'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { getAllProduct } from '../product/service/product.service'
import LayoutLoading from '~/app/component/stack/layout-loadding/layout-loadding.component'
const { Option } = Select

const { Title } = Typography

interface OrderManagementProps {}

const OrderManagement: FunctionComponent<OrderManagementProps> = () => {
  const [orderStatus, setOrderStatus] = useState<string | number>('đang chờ duyệt')
  const [dataTable, setDataTable] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [dataProduct, setDataProduct] = useState<any>([])
  const [selectedColor, setSelectedColor] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<any>(null)
  const [availableColors, setAvailableColors] = useState<any>([])
  const [availableSizes, setAvailableSizes] = useState<any>([])
  const [listProduct, setListProduct] = useState<any>([])
  const [productTotalPrices, setProductTotalPrices] = useState<any[]>([])
  const [dataOrder, setDataOrder] = useState<any>([])
  const [grandTotal, setGrandTotal] = useState(0)
  const [reset, setReset] = useState<boolean>(true)
  const [form] = Form.useForm()

  const handleProductChange = (value: any) => {
    const product = dataProduct.find((product: any) => product._id === value)
    setSelectedProduct(product)

    if (product) {
      const colors = product.listQuantityRemain.map((item: any) => item.nameColor)
      setAvailableColors([...new Set(colors)])
    } else {
      setAvailableColors([])
    }
    setSelectedColor(null)
    setSelectedSize(null)
  }
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const handlePhoneChange = (value: any) => {
    getAllOrder().then((res) => {
      const orders = res.data

      const matchingOrders = orders.filter((order: any) => {
        const orderPhoneNumber = order.phoneNumber?.trim().toLowerCase()
        const inputValue = value?.trim().toLowerCase()
        return orderPhoneNumber === inputValue
      })
      if (matchingOrders.length > 0) {
        const firstMatchingOrder = matchingOrders[0]
        setCustomerInfo({
          fullname: firstMatchingOrder.fullname,
          phoneNumber: firstMatchingOrder.phoneNumber,
          city: firstMatchingOrder.city,
          district: firstMatchingOrder.district,
          commune: firstMatchingOrder.commune,
          locationDetail: firstMatchingOrder.locationDetail
        })
      } else {
        setCustomerInfo(null)
      }
    })
  }

  useEffect(() => {
    if (customerInfo) {
      form.setFieldsValue({
        fullname: customerInfo.fullname,
        phoneNumber: customerInfo.phoneNumber,
        city: customerInfo.city,
        district: customerInfo.district,
        commune: customerInfo.commune,
        locationDetail: customerInfo.locationDetail
      })
    }
  }, [customerInfo, form])
  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    if (selectedProduct) {
      const sizes = selectedProduct.listQuantityRemain
        .filter((item: any) => item.nameColor === color)
        .map((item: any) => item.nameSize)
      if (sizes.length === 0) {
        setSelectedSize(null)
      }
      setAvailableSizes(sizes)
    }
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
  }
  const getMaxQuantity = (color: any, size: any) => {
    if (selectedProduct && color && size) {
      const matchingItem = selectedProduct.listQuantityRemain.find((item: any) => {
        return item.nameColor === color && item.nameSize === size
      })
      if (matchingItem) {
        return matchingItem.quantity
      }
    }
    return 1
  }

  const handelvalueQuantity = (event: any, index: number) => {
    const newTotalPrice = event * selectedProduct.price
    const updatedTotalPrices: any = [...productTotalPrices]
    updatedTotalPrices[index] = newTotalPrice
    setProductTotalPrices(updatedTotalPrices)
    const totalPricesSum = updatedTotalPrices.reduce((acc: any, curr: any) => acc + (curr || 0), 0)
    setGrandTotal(totalPricesSum)
  }

  useEffect(() => {
    getAllOrder().then((res) => {
      setDataOrder(res.data)
    })
    getAllProduct().then((res) => {
      setDataProduct(res.data)
      setListProduct(
        res.data.map((item: any) => {
          return { value: item._id, label: item.name }
        })
      )
    })
  }, [])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values: any) => {
      createOrder({ ...values, totalprice: grandTotal }).then(
        (res) => {
          setIsModalOpen(true)
          if (res) {
            setReset(!reset)
            setIsModalOpen(false)
            toast.success('order thành công')
          }
        },
        (err) => {
          toast.success('order thất bại')
        }
      )
      form.resetFields()
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const changeStatusDataOrder = (value: string | number) => {
    setOrderStatus(value)
  }

  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState(false)
  const [triggerLoadding, setTriggerLoadding] = useState(false)
  const callAllOrder = useCallback(() => {
    if (orderStatus === 'tất cả đơn hàng') {
      getAllOrder().then((res) => {
        if (res) {
          setDataTable(
            res.data.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          )
        }
      })
    } else if (!search) {
      filterDataOrderByStatus(orderStatus, '').then((res) => {
        if (res) {
          setDataTable(
            res.data.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          )
        }
      })
    } else {
      filterDataOrderByStatus(orderStatus, keyword).then((res) => {
        if (res) {
          setDataTable(
            res.data.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          )
        }
      })
    }
  }, [orderStatus, reset, orderStatus])

  useEffect(() => {
    callAllOrder()
  }, [orderStatus, reset])

  const handleUpdateStatusOrder = (orderId: string, orderStatus: string) => {
    updateOrder({ orderId, orderStatus }).then((res) => {
      if (res) {
        callAllOrder()
        toast.success('Đã cập nhật trạng thái đơn hàng')
      }
    })
  }
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setKeyword(event.target.value.trim())
  }
  const handleSearchItem = () => {
    setTriggerLoadding(true)
    if (keyword) {
      setTimeout(() => {
        setTriggerLoadding(false)
        setSearch(true)
        callAllOrder()
        setReset(!reset)
      }, 1000)
    } else {
      setTimeout(() => {
        setTriggerLoadding(false)
        setSearch(false)
        callAllOrder()
        setReset(!reset)
      }, 1000)
    }
  }
  const handelDeleteOrder = (orderId: any) => {
    deleteOrder(orderId).then(
      (res) => {
        if (res) {
          setReset(!reset)
          toast.success('xoá thành công đơn hàng')
        }
      },
      (err) => {
        toast.success('xoá đơn hàng lỗi')
      }
    )
  }

  const buttonByStatus = (orderId: string, orderStatus: string) => {
    switch (orderStatus) {
      case 'đang chờ duyệt':
        return (
          <Fragment>
            <Button className='text-blue-700' onClick={() => handleUpdateStatusOrder(orderId, 'duyệt thành công')}>
              {' '}
              Chuyển duyệt thành công
            </Button>
            <Button danger onClick={() => handleUpdateStatusOrder(orderId, 'huỷ đơn')}>
              Chuyển huỷ đơn
            </Button>
          </Fragment>
        )
        break
      case 'duyệt thành công':
        return (
          <Button className='text-blue-700' onClick={() => handleUpdateStatusOrder(orderId, 'đang vận chuyển')}>
            Chuyển đang vận chuyển
          </Button>
        )
        break
      case 'đang vận chuyển':
        return (
          <Fragment>
            <Button className='text-blue-700' onClick={() => handleUpdateStatusOrder(orderId, 'hoàn thành')}>
              Chuyển hoàn thành
            </Button>

            <Button danger onClick={() => handleUpdateStatusOrder(orderId, 'huỷ đơn')}>
              Khách hoàn đơn
            </Button>
          </Fragment>
        )
      case 'hoàn thành':
        break
      case 'huỷ đơn':
        return (
          <Button danger onClick={() => handelDeleteOrder(orderId)}>
            xoá đơn hàng
          </Button>
        )
        break

      default:
        break
    }
  }
  const validatePhone = (rule: any, value: any, callback: any) => {
    const phoneRegExp = /^(?:(?:\+|0{0,2})84|0[3-9]|00{0,2}\d{1,4})(\d{7,11})$/
    if (value && !value.match(phoneRegExp)) {
      callback('Vui lòng nhập số điện thoại hợp lệ!')
    } else {
      callback()
    }
  }
  return (
    <LayoutLoading condition={triggerLoadding}>
      <div className='py-5'>
        <Segmented
          options={[
            { value: 'tất cả đơn hàng', label: 'tất cả đơn hàng' },
            { value: 'đang chờ duyệt', label: 'đang chờ duyệt' },
            { value: 'duyệt thành công', label: 'duyệt thành công' },
            { value: 'đang vận chuyển', label: 'đang vận chuyển' },
            { value: 'hoàn thành', label: 'hoàn thành' },
            { value: 'huỷ đơn', label: 'Đã huỷ' }
          ]}
          size='large'
          value={orderStatus}
          onChange={changeStatusDataOrder}
        />
        <div className='float-right flex space-x-2'>
          <div className='flex space-x-1 items-center'>
            <Input
              placeholder='Tìm kiếm . . .'
              className='w-[350px]'
              onChange={handleValue}
              prefix={<SearchOutlined />}
            />
            <Button type='primary' className='ml-3' onClick={handleSearchItem}>
              Tìm kiếm
            </Button>
          </div>
          <Button onClick={showModal} type='primary' className='p-0 h-[40px]  w-[44px] rounded-[4px] bg-[#D4FF00]'>
            <PlusOutlined className='text-[20px] mb-[4px]' />
          </Button>
        </div>
        <div>
          <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout='vertical' name='form_in_modal'>
              <Fragment>
                <Form.Item
                  label='Họ và tên'
                  name='fullname'
                  rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Số điện thoại'
                  name='phoneNumber'
                  rules={[
                    {
                      validator: validatePhone
                    },
                    { required: true, message: 'Vui lòng nhập Số điện thoại!' }
                  ]}
                >
                  <Input onChange={(e) => handlePhoneChange(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label='Thành phố / Tỉnh'
                  name='city'
                  rules={[{ required: true, message: 'Vui lòng nhập Thành phố hoặc Tỉnh!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Quận / Huyện'
                  name='district'
                  rules={[{ required: true, message: 'Vui lòng nhập Quận / Huyện!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Xã / Phường'
                  name='commune'
                  rules={[{ required: true, message: 'Vui lòng nhập Xã / Phường!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Địa chỉ cụ thể'
                  name='locationDetail'
                  rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ cụ thể!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Phương thức thanh toán'
                  name='payment_methods'
                  rules={[{ required: true, message: 'Vui lòng chọn Phương thức thanh toán!' }]}
                >
                  <Select placeholder='Phương thức thanh toán'>
                    {/* <Select.Option value='Thanh toán khi nhận hàng'>Thanh toán khi nhận hàng</Select.Option> */}
                    <Select.Option value='Thanh toán trực tiếp'>Thanh toán trực tiếp</Select.Option>
                  </Select>
                </Form.Item>

                <Form.List name='productOrder' initialValue={[]}>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                        <div key={key}>
                          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                            <Form.Item
                              {...restField}
                              name={[name, 'product']}
                              fieldKey={[fieldKey, 'product'] as any}
                              label='Chọn sản phẩm'
                              rules={[{ required: true, message: 'Vui lòng chọn Tên sản phẩm' }]}
                            >
                              <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder='Lựa chọn sản phẩm'
                                optionFilterProp='children'
                                filterOption={(input, option: any) =>
                                  (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())
                                }
                                filterSort={(optionA, optionB) =>
                                  (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())
                                }
                                options={listProduct}
                                onChange={(value, label) => {
                                  handleProductChange(value)
                                }}
                              ></Select>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'quantityOrder', 'nameColor']}
                              label='Màu'
                              rules={[{ required: true, message: 'Vui lòng chọn Màu' }]}
                            >
                              <Select placeholder='Màu' onChange={(value) => handleColorChange(value)}>
                                {availableColors.map((color: any) => (
                                  <Select.Option key={color} value={color}>
                                    {color}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'quantityOrder', 'nameSize']}
                              label='Kích cỡ'
                              rules={[{ required: true, message: 'Vui lòng chọn Kích cỡ' }]}
                            >
                              <Select placeholder='Kích cỡ' onChange={(value) => handleSizeChange(value)}>
                                {availableSizes.map((size: any) => (
                                  <Select.Option key={size} value={size}>
                                    {size}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                            {selectedProduct && selectedColor && selectedSize && (
                              <Form.Item
                                {...restField}
                                name={[name, 'quantityOrder', 'quantity']}
                                label='Số lượng'
                                initialValue={1}
                              >
                                <InputNumber
                                  placeholder='Số lượng'
                                  min={1}
                                  max={getMaxQuantity(selectedColor, selectedSize)}
                                  onChange={(value) => handelvalueQuantity(value, index)}
                                />
                              </Form.Item>
                            )}

                            {selectedProduct && (
                              <Form.Item label='Giá sản phẩm' name='totalprice'>
                                {productTotalPrices[index]?.toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                              </Form.Item>
                            )}
                            {fields.length > 1 && (
                              <Form.Item>
                                <Button danger onClick={() => remove(name)}>
                                  xoá
                                </Button>
                              </Form.Item>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button type='dashed' onClick={() => add()} block>
                        + Mua thêm sản phẩm
                      </Button>
                    </div>
                  )}
                </Form.List>

                <Form.Item
                  label='Tình trạng đơn hàng'
                  name='orderStatus'
                  rules={[{ required: true, message: 'Vui lòng chọn Tình trạng đơn hàng!' }]}
                >
                  <Select placeholder=' trạng thái'>
                    <Select.Option value='duyệt thành công'>duyệt thành công</Select.Option>
                    <Select.Option value='đang vận chuyển'>đang vận chuyển</Select.Option>
                    <Select.Option value='hoàn thành'>hoàn thành</Select.Option>
                  </Select>
                </Form.Item>
              </Fragment>
            </Form>
          </Modal>
        </div>
        <Title className='py-5' level={3}>
          Đơn hàng: {dataTable.length}
        </Title>

        <TableOrderDetail buttonByStatus={buttonByStatus} dataTable={dataTable} />
      </div>
    </LayoutLoading>
  )
}

export default OrderManagement
