import React, { Fragment, useEffect, useState } from 'react'
import { deleteComment, getAllComment, searchComment, updateComment } from './service/comment-admi.service'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Input, Rate, Select } from 'antd'
import { getAllProduct } from '../product/service/product.service'
import { getAllUser } from '../user/service/user.service'
import { createComment } from '~/app/api/comment/comment.api'

const Option = Select
const CommentAdminComponent = () => {

    const [dataComment, setDataComment] = useState([])
    const [colums, setColums] = useState([])
    const [reset, setReset] = useState<boolean>(true)
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllComment().then((res) => {
            setDataComment(res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        })
        getAllProduct().then((res) => {
            setProducts(res.data)
        })
        getAllUser().then((res) => {
            setUsers(res.data)
        })
    }, [reset])
    useEffect(() => {
        const columnTemp: any = [];
        const title = ['Email', 'Tên sản phẩm', '', 'Bình luận', 'Đánh giá']
        if (dataComment.length > 0) {
            Object.keys(dataComment[0]).forEach((itemKey, key = 0) => {
                if (!['_id', 'updatedAt', 'createdAt', '__v'].includes(itemKey)) {
                    columnTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey == 'userId') {
                                return <div>{record?.userId?.name}</div>
                            }
                            if (itemKey == 'productId') {
                                return <div>{record?.productId?.name}</div>
                            }
                            if (itemKey === 'star') {
                                return <Rate disabled value={record?.star} />
                            }
                            return text;
                        },
                    });
                }
            });
        }
        setColums(columnTemp);
    }, [dataComment]);

    const handelGetList = () => {
        setReset(!reset)
    }

    return (
        <div>
            <div>
                <TemplateTable columnTable={colums} dataTable={dataComment} noEdit={true} noCreate={true} searchFunc={searchComment} setData={setDataComment} changeFunc={updateComment} createFunc={createComment} dataPage={7} deleteFunc={deleteComment} handelGetList={handelGetList} formEdit={
                    <Fragment>
                        <Form.Item
                            label='Tên người dùng'
                            name='userId'
                            getValueFromEvent={(event, select) => ({ name: select?.children, _id: select?.value })}
                            getValueProps={(value) => ({ label: value?.name, value: value?._id })}
                            rules={[{ required: true, message: 'Vui lòng nhập Tên người dùng!' }]}
                        >
                            <Select placeholder="lựa chọn tài khoản">
                                {users.map((item: any) => (
                                    <Option value={item._id} key={item._id}>{item.email}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Tên sản phẩm'
                            name='productId'
                            getValueFromEvent={(event, select) => ({ name: select?.children, _id: select?.value })}
                            getValueProps={(value) => ({ label: value?.name, value: value?._id })}
                            rules={[{ required: true, message: 'Vui lòng nhập Tên sản phẩm!' }]}
                        >
                            <Select placeholder="lựa chọn sản phẩm">
                                {products.map((item: any) => (
                                    <Option value={item._id} key={item._id}>{item.name}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Bình luận'
                            name='comment'
                            rules={[{ required: true, message: 'Vui lòng nhập Bình luận!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Đánh giá'
                            name='star'
                            rules={[{ required: true, message: 'Vui lòng chọn Đánh giá!' }]}
                        >
                            <Rate />
                        </Form.Item>
                    </Fragment>
                } />
            </div>
        </div>
    )
}

export default CommentAdminComponent