import { Button, Form, Input, InputNumber, Select, Space, Upload, UploadFile, ColorPicker } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { CloseOutlined } from '@ant-design/icons'
import { getAllProduct, createProduct, deleteProduct, editProduct, searchProduct } from './service/product.service'
import axios from 'axios'
import { getAllCategory } from '../category/service/category.service'
const { Option } = Select
import { css } from '@emotion/react'

const ProductManagemnet = () => {
  const [column, setColumn] = useState([])
  const [dataProduct, setDataProduct] = useState<any>([])
  const [categories, setCategories] = useState([])
  const [reset, setReset] = useState<boolean>(true)
  useEffect(() => {
    getAllProduct().then((res) => {
      setDataProduct(res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    })
    getAllCategory().then((res: any) => {
      setCategories(res.data.filter((cate: any) => cate?.status !== false))
    })
  }, [reset])

  useEffect(() => {
    const columTemp: any = [];
    const title = ['Danh mục', '', 'Tên', 'Mã SP', 'Giá mới', 'Giá gốc', 'Mô tả', 'Ảnh', 'Thương hiệu', '']
    if (dataProduct.length > 0) {
      Object?.keys(dataProduct[0]).map((itemKey, key = 0) => {
        if (!['_id', '__v', 'updatedAt', 'createdAt', 'listQuantityRemain'].includes(itemKey)) {
          return columTemp.push({
            title: title[key++],
            dataIndex: itemKey,
            key: itemKey,
            render: (text: any, record: any, index: any) => {
              if (itemKey === 'images') {
                return <img src={record?.images?.slice(0, 1).map((image: any) => image?.response || image?.url)} alt='Product Image' style={{ maxWidth: '50px' }} />
              }
              if (itemKey === 'price') {
                return <div>{record?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
              }
              if (itemKey === 'cost') {
                return <div>{record?.cost?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
              }
              if (itemKey === 'description') {
                return <div className='truncate w-[100px]'>{record?.description}</div>
              }
              if (itemKey == 'categoryId') {
                return <div>{record?.categoryId?.name}</div>
              }
              return text
            }
          })
        }
      })
    }
    if (dataProduct[0]?.listQuantityRemain && dataProduct[0]?.listQuantityRemain.length > 0) {
      const firstItem = dataProduct[0].listQuantityRemain[0];
      const title = ['Mã màu', 'Tên màu', 'Size', 'Số lượng']
      if (firstItem) {
        Object.keys(firstItem).forEach((itemKey, key = 0) => {
          if (!['_id', 'updatedAt'].includes(itemKey)) {
            columTemp.push({
              title: `${title[key++]}`,
              dataIndex: `${itemKey}`,
              key: `${itemKey}`,
              render: (text: any, record: any, index: any) => {
                return (
                  <div>
                    {record?.listQuantityRemain?.map((item: any, index: any) => (
                      <div className='flex items-center h-[29px] w-[80px]'>
                        <p className='mt-0 mb-3 truncate'>{item[itemKey]}</p>
                      </div>
                    ))}
                  </div>
                )
              }
            })
          }
        })
      }
    }
    setColumn(columTemp)
  }, [dataProduct])

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const customRequestUpload = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options

    const fmData = new FormData()
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        onProgress({ percent: (event.loaded / event.total) * 100 })
      }
    }
    fmData.append('file', file)
    fmData.append('upload_preset', 'r17fcf7k')
    fmData.append('cloud_name', 'df3xmajf8')
    fmData.append('folder', 'ECMA')
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/df3xmajf8/image/upload`, fmData, config)
      onSuccess(res.data.url)
      const customFileImage = {
        uid: file.uid,
        name: file.name,
        status: res.status,
        url: res.data.url,
        response: res.data.url
      }
      const updataImage: any[] = [...fileList, customFileImage]
      setFileList(updataImage)
      // setFileList((prevFileList: any) => [
      //   ...prevFileList,
      //   {
      //     uid: file.uid,
      //     name: file.name,
      //     status: res.status,
      //     url: res.data.url
      //   }
      // ])
    } catch (err) {
      onError({ err })
    }
  }

  const onRemove = (file: any) => {
    setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid))
  }
  const handelGetList = () => {
    setReset(!reset)
  }
  return (
    <div>
      <TemplateTable
        dataTable={dataProduct}
        columnTable={column}
        isAdminProduct={true}
        searchFunc={searchProduct}
        setData={setDataProduct}
        component='products'
        createFunc={(form: any) =>
          createProduct({
            ...form,
            listQuantityRemain: [
              ...form.listQuantityRemain.map((list: { colorHex: any }) => ({
                ...list,
                colorHex: list.colorHex.toHexString()
              }))
            ]
          })
        }
        deleteFunc={deleteProduct}
        changeFunc={(form: any, dataId: any) =>
          editProduct({
            ...form,
            listQuantityRemain: [
              ...form.listQuantityRemain.map((list: { colorHex: any }) => ({
                ...list,
                colorHex: typeof (list.colorHex) == 'string' ? list.colorHex : list.colorHex.toHexString()
              }))
            ]
          }, dataId)}
        handelGetList={handelGetList}
        formEdit={
          <Fragment>
            <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Trường tên là bắt buộc!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='Mã sản phẩm' name='code' rules={[{ required: true, message: 'Trường mã sản phẩm là bắt buộc!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='Giá gốc' name='cost' rules={[{ required: true, message: 'Trường giá gốc là bắt buộc!' }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label='Giá mới' name='price' rules={[{ required: true, message: 'Trường giá mới là bắt buộc!' }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label='Mô tả' rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]} name='description'>
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label='Images'
              name='images'
              getValueFromEvent={(event) => event.fileList}
              rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
              valuePropName={'fileList'}
            // initialValue={fileList}
            >
              <Upload customRequest={customRequestUpload} listType='picture-card' onRemove={onRemove}>
                {fileList.length < 6 && '+ Upload'}
              </Upload>
            </Form.Item>
            <Form.Item label='Thương hiệu' name='brand' rules={[{ required: true, message: 'Trường thương hiệu là bắt buộc!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label='Category'
              name='categoryId'
              rules={[{ required: true, message: 'Trường danh mục là bắt buộc' }]}
              getValueFromEvent={(event, select) => ({ name: select?.children, _id: select?.value })}
              getValueProps={(value) => ({ label: value?.name, value: value?._id })}
            >
              <Select placeholder="lựa chọn tài khoản">
                {categories.map((item: any) => (
                  <Option value={item._id} key={item._id}>{item.name}</Option>
                ))}

              </Select>

            </Form.Item>
            <Form.List
              name='listQuantityRemain'
              rules={[
                {
                  validator: async (_, names) => {
                    if (names.length < 1) {
                      return Promise.reject(new Error('Ít nhất phải có 1 biến thể'))
                    }
                  }
                }
              ]}
              initialValue={[]}
            >
              {(fields, { add, remove }, { errors }) => (
                <div css={formcss} style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space className='space' key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                      <Form.Item className='colorFormItem' {...restField} name={[name, 'colorHex']}>
                        <ColorPicker defaultValue={'fff'} showText={(color) => color.toHexString()} format='hex' />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'nameColor']} rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}>
                        <Input placeholder='Tên màu' />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'nameSize']} rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}>
                        <Input placeholder='Tên size' />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'quantity']} rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}>
                        <InputNumber placeholder='Số lượng' min={1} />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          remove(name)
                        }}
                      />
                    </Space>
                  ))}

                  <Button type='dashed' onClick={() => add()} block>
                    + Thêm biến thể
                  </Button>
                  <Form.ErrorList className='text-red-500' errors={errors} />
                </div>
              )}
            </Form.List>
          </Fragment>
        }
      />
    </div>
  )
}

export default ProductManagemnet
const formcss = css`
  .ant-space-item {
    margin: auto;
  }
  .ant-form-item {
    margin: auto;
  }
  .anticon-close {
    margin-bottom: 8px;
  }
`
