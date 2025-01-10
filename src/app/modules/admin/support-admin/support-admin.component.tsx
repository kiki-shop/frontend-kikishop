import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { createSupport, deleteSupport, getAllSupport, searchSupport, updateSupport } from './service/support-admin.service'
import { Button, Form, Input, Modal, Select } from 'antd'
import toast from 'react-hot-toast'
import { repSupport } from '~/app/api/support/support.api'
import { useParams } from 'react-router-dom'


const SupportAdmin = () => {
    const [id, setId] = useState()
    const [topicData, setTopicData] = useState()
    const [dataSupport, setDataSupport] = useState([])
    const [colums, setColums] = useState([])
    const [reset, setReset] = useState<boolean>(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleInputChange = (e: any) => {
        setFeedback(e.target.value);
    };
    const showModal = (dataId: any, topicRequest: any) => {
        setIsModalOpen(true);
        setId(dataId)
        setTopicData(topicRequest)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        getAllSupport().then((res) => {
            setDataSupport(res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        })
    }, [reset])
    const onSubmit = () => {
        repSupport({ reqbody: feedback, id: id, topic: topicData }).then(
            (res) => {
                if (res) {
                    toast.success('Phản hồi thành công')
                    handleCancel()
                }
            },
            (err) => {
                toast.error('Email không hợp lệ')
            }
        )

    }
    useEffect(() => {
        const columnTemp: any = [];
        const title = ['', 'Tên', 'Số ĐT', 'Email', 'Đề tài', 'Ghi chú']
        if (dataSupport.length > 0) {
            Object.keys(dataSupport[0]).forEach((itemKey, key = 0) => {

                if (!['_id', 'updatedAt', 'createdAt', '__v'].includes(itemKey)) {
                    columnTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                    })
                }
            });
            columnTemp.push({
                title: "Phản hồi",
                key: "action",
                render: (text: any, record: any) => (
                    <Button onClick={() => showModal(record._id, record.topic)} type='primary' >Gửi email cho khách hàng</Button>
                ),
            });
        }

        setColums(columnTemp)
    }, [dataSupport])
    const handelGetList = () => {
        setReset(!reset)
    }

    return (
        <div>
            <Modal bodyStyle={{ height: 210 }} title="Nhập phản hồi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <textarea onChange={handleInputChange} className='w-full h-[170px] focus:outline-none p-2 border rounded-xl border-[#E7E8E9]' placeholder="Nhập phản hồi của bạn" value={feedback} />
                <Button className='mt-3 float-right' type="primary" onClick={onSubmit}>
                    Gửi email
                </Button>
            </Modal>
            <TemplateTable searchFunc={searchSupport} setData={setDataSupport} columnTable={colums} createFunc={createSupport} changeFunc={updateSupport} dataTable={dataSupport} deleteFunc={deleteSupport} handelGetList={handelGetList} dataPage={7}
                formEdit={
                    <Fragment>
                        <Form.Item
                            label='Họ và tên'
                            name='name'
                            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ họ và tên!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Số điện thoại'
                            name='phoneNumber'
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Chủ đề'
                            name='topic'
                            rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Ghi chú'
                            name='note'
                            rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Fragment>
                } />
        </div>
    )
}

export default SupportAdmin