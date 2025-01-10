import { Button, Form, Input, Select } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { changeContent, createContent, deleteContent, getAllContent, searchContent } from './service/content.service';
import TemplateTable from '../common/template-table/template-table.component';
import { Option } from 'antd/es/mentions';


const ContentManagement = () => {
  const [column, setColumn] = useState<any>([]);
  const [reset, setReset] = useState<boolean>(true);
  const [dataContent, setDataContent] = useState<any>([]);
  useEffect(() => {
    getAllContent().then((res) => {
      setDataContent(res.data);
    });
  }, [reset]);
  useEffect(() => {
    const columTemp: any = []
    const title = ['','Nội dung','Trạng thái hiển thị']
    if (dataContent.length > 0) {
      Object.keys(dataContent[0]).forEach((itemKey,key = 0) => {
        if (!['_id', '__v', 'updatedAt', 'createdAt'].includes(itemKey)) {
          columTemp.push({
            title: title[key++],
            dataIndex: itemKey,
            key: itemKey,
          });
        }
      });
    }

    setColumn(columTemp)
  }, [dataContent])
  const handelGetList = () => {
    setReset(!reset);
  };
  return (
    <div>
      <TemplateTable
        searchFunc={searchContent}
        setData={setDataContent}
        dataTable={dataContent}
        columnTable={column}
        deleteFunc={deleteContent}
        createFunc={createContent}
        handelGetList={handelGetList}
        changeFunc={changeContent}
        formEdit={
          <Fragment>
            <Form.Item
              label='Nội dung'
              name='content'
              rules={[{ required: true, message: 'Vui lòng nhập Nội dung!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hiển thị nội dung"
              name="hidden"
              rules={[{ required: true, message: 'Vui lòng chọn hiển thị nội dung!' }]}
            >
              <Select>
                <Option value="Hiển thị">Hiển thị</Option>
                <Option value="Ẩn">Ẩn</Option>
              </Select>
            </Form.Item>
          </Fragment>
        }
      />
    </div>
  );
};


export default ContentManagement