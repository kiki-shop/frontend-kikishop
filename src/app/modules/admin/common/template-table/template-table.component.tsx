import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Button, Form, Input, Popconfirm, Space, Table, Tag, message, Select, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import TemplateModal from '../template-modal/template-modal.component'
import LayoutLoading from '~/app/component/stack/layout-loadding/layout-loadding.component'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { getAllCategory } from '../../category/service/category.service'
import { getAllProduct } from '../../product/service/product.service'
import { useOrderRedux } from '~/app/modules/client/redux/hook/useOrderReducer'
import { getAllOrderAdmin } from '~/app/modules/client/redux/reducer/orderSlice/thunk/order.thunk'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

interface ITemplateTableProp {
  dataTable: any[]
  createFunc?: any
  deleteFunc?: any
  changeFunc?: any
  searchFunc?: any
  columnTable?: any
  formEdit?: ReactNode
  handelGetList?: any
  dataPage?: any
  setData?: any
  isAdminProduct?: boolean
  noCreate?: boolean
  noEdit?: boolean
  chageProductCategoryFunc?: any
  component?: string
  dataProduct?: any[]
}

const TemplateTable: FC<ITemplateTableProp> = ({
  dataPage,
  handelGetList,
  dataTable,
  createFunc,
  deleteFunc,
  searchFunc,
  changeFunc,
  columnTable,
  formEdit,
  setData,
  isAdminProduct,
  noCreate,
  noEdit,
  dataProduct,
  chageProductCategoryFunc,
  component
}) => {
  const [defaultValue, setDefaultValue] = useState<any>(null)
  const [form] = Form.useForm()
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [triggerLoadding, setTriggerLoadding] = useState(false)
  const [type, setType] = useState('CREATE')
  const [keyword, setKeyword] = useState('')
  const [errorSearch, setErrorSearch] = useState('')
  const [filter, setFilter] = useState<any[]>([])
  const [dataFilter, setDataFilter] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState<string>('all')
  const [applyFilter, setApplyFilter] = useState<boolean>(false)
  const [modal, contextHolder] = Modal.useModal();
  const {
    data: { ordersAdmin },
    actions
  } = useOrderRedux();
  useEffect(()=>{
    actions.getAllOrderAdmin()
  },[])
  const confirmDelete = (record: any) => {
    setTriggerLoadding(true)
    if(component==='category'){
      changeFunc({status:false}, record?._id).then(
        (res: any) => {
          if (res) {
            setIsModelOpen(false)
            setTriggerLoadding(true);
            setTimeout(() => {
              setTriggerLoadding(false)
              message.success('xóa thành công')
              handelGetList()
            }, 1000)
          }
        })
    }else{
      if(component ==='products' || component === 'users' || component==='voucher'){
        changeFunc({...record,status:false},record?._id).then(
          (res: any) => {
            if (res) {
              setTimeout(() => {
                setTriggerLoadding(false)
                message.success('Xóa thành công')
                handelGetList()
              }, 1000)
            }
          },
          (err: any) => {
            setTimeout(() => {
              setTriggerLoadding(false)
              message.error(err.response.data)
            }, 1000)
          }
        )
      }else{
        deleteFunc(record._id).then(
          (res: any) => {
            if (res) {
                    setTimeout(() => {
                setTriggerLoadding(false)
                message.success('Xóa thành công')
                handelGetList()
              }, 1000)
            }
          },
          (err: any) => {
            setTimeout(() => {
              setTriggerLoadding(false)
              message.error(err.response.data)
            }, 1000)
          }
        )
      }
    }
  }
  const deleteAbsoluteCategory = (category: any) => {
    const listProduct = dataProduct?.filter((product: any) => product.categoryId._id === category._id)
    listProduct?.map((product: any) => {
      chageProductCategoryFunc(
        { ...product, categoryId: { _id: '656b0b5bf0981478cdf1a957', name: 'Chưa phân loại' } },
        product._id
      ).then(
        (res: any) => {
          if (res) {
            setIsModelOpen(false)
            setTriggerLoadding(true)
          }
        },
        (err: any) => {
          setTimeout(() => {
            setTriggerLoadding(false)
            message.error('sửa thất bại ')
          }, 1000)
        }
      )
    })
    deleteFunc(category._id).then(
      (res: any) => {
        if (res) {
              setTimeout(() => {
            setTriggerLoadding(false)
            message.success('Xóa thành công')
            handelGetList()
          }, 1000)
        }
      },
      (err: any) => {
        setTimeout(() => {
          setTriggerLoadding(false)
          message.error(err.response.data)
        }, 1000)
      }
    )
  }
  const deleteAbsolute = (record:any)=>{
    if(component ==='products'){
      const exit = ordersAdmin.filter((order:any) =>{
        return order.productOrder.some((product:any) => product.product?._id === record._id)
      });
      if(exit.length>0){
        message.error('Không thể xóa sản phẩm này!');
        return
      }else{
        deleteFunc(record._id).then(
          (res: any) => {
            if (res) {
                      setTimeout(() => {
                setTriggerLoadding(false)
                message.success('Xóa thành công')
                handelGetList()
              }, 1000)
            }
          },
          (err: any) => {
            setTimeout(() => {
              setTriggerLoadding(false)
              message.error(err.response.data)
            }, 1000)
          }
        )
      }
    }else if(component === 'users'){
      const exit = ordersAdmin.filter((order:any)=> order.user == record._id);
      if(exit.length>0){
        message.error('Không thể xóa người dùng này!');
        return
      }else{
        deleteFunc(record._id).then(
          (res: any) => {
            if (res) {
                        setTimeout(() => {
                setTriggerLoadding(false)
                message.success('Xóa thành công')
                handelGetList()
              }, 1000)
            }
          },
          (err: any) => {
            setTimeout(() => {
              setTriggerLoadding(false)
              message.error(err.response.data)
            }, 1000)
          }
        )
      }
    }
  }
  const configDeleteCateogry = {
    title: 'Tất cả sản phẩm sẽ được chuyển đến danh mục chưa phân loại!',
    content: <></>
  }
  const confirmReset = (record:any)=>{
    setTriggerLoadding(true)
    if(component==='category'){
      changeFunc({status:true}, record?._id).then(
        (res: any) => {
          if (res) {
            setIsModelOpen(false)
            setTriggerLoadding(true);
            setTimeout(() => {
              setTriggerLoadding(false)
              message.success('Khôi phục thành công')
              handelGetList()
            }, 1000)
          }
        })
    }
    if(component==='products' || component==='users' || component ==='voucher'){
      changeFunc({...record,status:true}, record?._id).then(
        (res: any) => {
          if (res) {
            setIsModelOpen(false)
            setTriggerLoadding(true);
            setTimeout(() => {
              setTriggerLoadding(false)
              message.success('Khôi phục thành công')
              handelGetList()
            }, 1000)
          }
        })
    }
  }
  const cancel = (e: any) => {
    message.error('Đã hủy xoá')
  }
  const handleOk = () => {
    if (form.getFieldValue('images')) {
      const dataList = [...form.getFieldValue('images')].map((item: any) => ({
        uid: item.uid,
        name: item.name,
        status: item.status,
        url: item.url || item.response,
        response: item.response || item.url
      }))

      form.setFieldsValue({
        images: dataList
      })
    }
    if (type == 'CREATE') {
      form
        .validateFields()
        .then((values: any) => {
          createFunc(values).then(
            (res: any) => {
              if (res) {
                setIsModelOpen(false)
                setTriggerLoadding(true)
                setTimeout(() => {
                  setTriggerLoadding(false)
                  message.success('thêm thành công')
                  handelGetList()
                }, 1000)
              }
            },
            (err: any) => {
              setTimeout(() => {
                setTriggerLoadding(false)
                message.error(' thêm thất bại')
              }, 1000)
            }
          )
          form.resetFields()
        })
        .catch((info: any) => {
          console.log('Validate Failed:', info)
        })
    }

    if (type === 'CHANGE') {
      form
        .validateFields()
        .then((values: any) => {
          form.resetFields()
                changeFunc(values, defaultValue._id).then(
            (res: any) => {
              if (res) {
                setIsModelOpen(false)
                setTriggerLoadding(true)
                setTimeout(() => {
                  setTriggerLoadding(false)
                  message.success('sửa thành công')
                  handelGetList()
                }, 1000)
              }
            },
            (err: any) => {
              setTimeout(() => {
                setTriggerLoadding(false)
                message.error('sửa thất bại ')
              }, 1000)
            }
          )
        })
        .catch((info: any) => {
          console.log('Validate Failed:', info)
        })
    }
  }
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setKeyword(event.target.value)
  }
  const handleSearchItem = () => {
    setTriggerLoadding(true)
    searchFunc(keyword).then(
      (res: any) => {
        if (res) {
          setTimeout(() => {
            setTriggerLoadding(false)

            setData(res.data)
            setErrorSearch('')
          }, 1000)
        }
      },
      (err: any) => {
        setTimeout(() => {
          setTriggerLoadding(false)
              setErrorSearch(err.response.data.message)
        }, 1000)
      }
    )
  }
  const handleCancel = () => {
    setIsModelOpen(false)
  }
  const showModel = (typeAction: any, recordTable?: any) => {
    setIsModelOpen(true)
    setType(typeAction)
    if (typeAction === 'CHANGE') {
      setDefaultValue(recordTable)
      form.setFieldsValue(recordTable)
    } else {
      form.resetFields()
    }
  }
  const columns: ColumnsType<DataType> = [
    ...columnTable,
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: any) => {
        if (component === 'category' && !record?.status) {
          if (record.name !== 'Chưa phân loại') {
            return (
              <Space size='middle' css={cssTemplateTable}>
                <Popconfirm
                  title='Thông báo'
                  description='Bạn có chắc muốn khôi phục không?'
                  onConfirm={() => confirmReset(record)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button className='btn-edit'>Khôi phục</Button>
                </Popconfirm>

                <Button
                  danger
                  type='text'
                  onClick={async () => {
                    const confirmed = await modal.confirm(configDeleteCateogry)
                    if (confirmed) {
                      deleteAbsoluteCategory(record)
                    }
                  }}
                >
                  Xóa vĩnh viễn
                </Button>
                {contextHolder}
              </Space>
            )
          }
          return
        } else if (component === 'voucher') {
          if (record.timeRemaining === 'Hết hạn') {
            if(!record?.status){
              return (
                <Space size='middle' css={cssTemplateTable}>
                  <Popconfirm
                    title='Thông báo'
                    description='Bạn có chắc muốn khôi phục không?'
                    onConfirm={() => confirmReset(record)}
                    onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button className='btn-edit'>Khôi phục</Button>
                  </Popconfirm>
                  {contextHolder}
                </Space>
              )
            }
            return (
              <Space size='middle' css={cssTemplateTable}>
                {!noEdit && (
                  <Button type='primary' onClick={() => showModel('CHANGE', record)}>
                    Sửa
                  </Button>
                )}
                <Popconfirm
                  title='Thông báo'
                  description='Bạn có chắc muốn xóa không?'
                  onConfirm={() => confirmDelete(record)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button className='btn-delete'>Xóa</Button>
                </Popconfirm>
              </Space>
            )
          } else {
            return (
              <Space size='middle' css={cssTemplateTable}>
                {!noEdit && (
                  <Button type='primary' onClick={() => showModel('CHANGE', record)}>
                    Sửa
                  </Button>
                )}
              </Space>
            )
          }
        }else{
          if((component === 'products' && !record?.status)||component === 'users' && !record?.status){
            return (
              <Space size='middle' css={cssTemplateTable}>
                <Popconfirm
                  title='Thông báo'
                  description='Bạn có chắc muốn khôi phục không?'
                  onConfirm={() => confirmReset(record)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button className='btn-edit'>Khôi phục</Button>
                </Popconfirm>
                <Popconfirm
                  title='Thông báo'
                  description='Bạn có chắc muốn xóa vĩn viễn không?'
                  onConfirm={() => deleteAbsolute(record)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button
                  danger
                  type='text'
                >
                  Xóa vĩnh viễn
                </Button>
                </Popconfirm>
                
                {contextHolder}
              </Space>
            )
          }else {
            if(component === 'users' && record.role === 'ADMIN'){
              return <Button type='primary' onClick={() => showModel('CHANGE', record)}>
              Sửa
            </Button>
            }
            return <Space size='middle' css={cssTemplateTable}>
            {!noEdit && <Button type='primary' onClick={() => showModel('CHANGE', record)}>
              Sửa
            </Button>}
            <Popconfirm
              title='Thông báo'
              description='Bạn có chắc muốn xóa không?'
              onConfirm={() => confirmDelete(record)}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              <Button className='btn-delete'>Xóa</Button>
            </Popconfirm>
          </Space>
          } 
        } 
      }
    }
  ]

  useEffect(() => {
    getAllCategory().then((res: any) => {
      setFilter(
        res.data.map((item: any) => {
          return { value: item._id, label: item.name }
        })
      )
    })
    if (isAdminProduct) {
      getAllProduct().then((res) => setDataFilter(res.data))
    }
  }, [])
  const handleSelectChange = (value: any, option: any) => {
    setSelectedValue(value)
    if (value === 'all') {
      setApplyFilter(true)
    } else {
      setApplyFilter(false)
      const list = dataFilter.filter((item) => item.categoryId._id === value)
      setData(list)
    }
  }

  useEffect(() => {
    if (applyFilter) {
      setApplyFilter(false)
      setData(dataFilter)
    }
  }, [applyFilter])

  const SelectInput: React.FC = () => (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder='Search to Select'
      optionFilterProp='children'
      filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={[...filter, { value: 'all', label: ' Tất cả' }]}
      value={selectedValue}
      onChange={handleSelectChange}
    >
      <Select.Option value='all'>All</Select.Option>
      {filter.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  )
  return (
    <LayoutLoading condition={triggerLoadding}>
      <div className='flex pb-4 justify-between'>
        <div>
          {!noCreate && (
            <Button
              type='primary'
              onClick={() => showModel('CREATE')}
              className='p-0 h-[40px] w-[44px] rounded-[4px] bg-[#D4FF00]'
            >
              <PlusOutlined className='text-[20px] mb-[4px]' />
            </Button>
          )}
        </div>

        <div className='flex space-x-3 items-center'>
          {isAdminProduct && <SelectInput />}
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
      </div>
      {!errorSearch && (
        <div className=''>
          <div className='overflow-auto'>
            <Table columns={columns} dataSource={dataTable} />
          </div>
          <div>
            <TemplateModal isModelOpen={isModelOpen} handleOk={handleOk} handleCancel={handleCancel}>
              <Form form={form} layout='vertical' name='form_in_modal'>
                {formEdit}
              </Form>
            </TemplateModal>
          </div>
        </div>
      )}
      {errorSearch && <div>{errorSearch}</div>}
    </LayoutLoading>
  )
}
const cssTemplateTable = css`
  .btn-delete {
    color: #ff2a00;
    border-color: #ff2a00;
  }
  .btn-delete:hover {
    color: #fff !important;
    background-color: #ff2a00;
    border-color: #ff2a00 !important;
  }
`
export default TemplateTable