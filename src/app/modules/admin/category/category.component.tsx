import { Form, Input, Select } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { changeCategory, createCategory, deleteCategory, getAllCategory, searchCategory } from "./service/category.service"
import TemplateTable from '../common/template-table/template-table.component';
import dayjs from 'dayjs';
import { getAllProduct,editProduct } from '../product/service/product.service';

const CategoryManagement = () => {
    const [column, setColumn] = useState([])
    const [reset, setReset] = useState<boolean>(true)
    const [dataCategory, setDataCategory] = useState<any>([])
    const [dataProduct, setDataProduct] = useState<any>([])
    useEffect(()=>{
        getAllProduct().then((res) => {
            setDataProduct(res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
          })
    },[])
    useEffect(() => {
        getAllCategory().then((res) => {
            setDataCategory(res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        })
    }, [reset])
    useEffect(() => {
        const columTemp: any = [];
        const title = ['', 'Danh mục', '','Ngày tạo', 'Ngày cập nhật']
        if (dataCategory.length > 0) {
            Object.keys(dataCategory[0]).forEach((itemKey, key = 0) => {
                if (!['_id', '__v'].includes(itemKey)) {
                    columTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey === 'updatedAt') {
                                return (
                                    <div>{dayjs(record?.updatedAt).format('MM-DD-YYYY')}</div>
                                );
                            }
                            if (itemKey === 'createdAt') {
                                return (
                                    <div>{dayjs(record?.updatedAt).format('MM-DD-YYYY')}</div>
                                );
                            }

                            return text;
                        },
                    });
                }
            });
        }

        setColumn(columTemp)
    }, [dataCategory])
    const handelGetList = () => {
        setReset(!reset)
    }
    return (
        <div>
            <TemplateTable dataProduct={dataProduct} chageProductCategoryFunc={editProduct} component='category' searchFunc={searchCategory} setData={setDataCategory} dataTable={dataCategory} columnTable={column} deleteFunc={deleteCategory} createFunc={(form:any)=>createCategory({...form, status: true})} handelGetList={handelGetList} changeFunc={changeCategory} 
                formEdit={
                    <Fragment>
                        <Form.Item
                            label='Tên danh mục'
                            name='name'
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Fragment>
                }
            />
        </div>
    )
}


export default CategoryManagement