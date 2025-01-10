import { Form, Input, DatePicker, Select, InputNumber } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { changeVorcher, createVorcher, deleteVorcher, getAllVorcher, searchVoucher } from './service/vorcher.service'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/vi'
dayjs.locale('vi')
dayjs.extend(duration)
const { Option } = Select

const CategoryManagement = () => {
  const [column, setColumn] = useState([])
  const [reset, setReset] = useState<boolean>(true)
  const [dataVorcher, setDataVorcher] = useState<any>([])
  // const convertToVietnamTime = (utcTime: any) => {
  //     return moment(utcTime).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  // };
  useEffect(() => {
    getAllVorcher().then((res) => {
      setDataVorcher(
        res.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((item: any) => {
            item.startday = dayjs(item.startday).locale('vi')
            item.endday = dayjs(item.endday).locale('vi')
            return item
          })
      )
    })
  }, [reset])
  useEffect(() => {
    const columTemp: any = []
    const title = ['', 'Tên', 'Giảm giá', 'Loại', 'Mã giảm giá', 'Ngày bắt đầu', 'Ngày kết thúc']
    if (dataVorcher.length > 0) {
      Object.keys(dataVorcher[0]).forEach((itemKey, key = 0) => {
        if (!['_id', '__v', 'createdAt', 'updatedAt', 'timeRemaining'].includes(itemKey)) {
          if (itemKey === 'startday' || itemKey === 'endday') {
            columTemp.push({
              title: title[key++],
              dataIndex: itemKey,
              key: itemKey,
              render: (text: any) => {
                const endday = dayjs(text) // Giả sử M2 là đối tượng thời gian

                const dayOfMonth = endday.date()
                const month = endday.month() + 1 // Lưu ý: Tháng trong `dayjs` là từ 0 đến 11
                const year = endday.year()
                return `${dayOfMonth}/ ${month}/${year}`
              }
            })
          } else {
            columTemp.push({
              title: title[key++],
              dataIndex: itemKey,
              key: itemKey,
              render: (text: any, record: any, index: any) => {
                if (itemKey === 'discount') {
                  return <div>{record?.discount}%</div>
                }
                return text
              }
            })
          }
        }
      })

      columTemp.push({
        title: 'Thời gian còn lại',
        dataIndex: 'timeRemaining',
        key: 'timeRemaining',
        render: (text: any, record: any) => {
          if (record.startday && record.endday) {
            // console.log(record.startday, record.endday);

            const startTime = dayjs(record.startday)
            const endTime: any = dayjs(record.endday)
            const now: any = dayjs()

            if (now.isBefore(endTime)) {
              const remainingTime = dayjs.duration(endTime.diff(now))
              const daysRemaining = remainingTime.days()
              const hoursRemaining = remainingTime.hours()
              const minutesRemaining = remainingTime.minutes()
              const secondsRemaining = remainingTime.seconds()

              return `${daysRemaining} ngày ${hoursRemaining} giờ ${minutesRemaining} phút ${secondsRemaining} giây còn lại`
            } else {
              // console.log(record.startday, record.endday);

              return 'Hết hạn'
            }
          }
          return text
        }
      })
    }

    setColumn(columTemp)
  }, [dataVorcher])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now: any = dayjs()
      const updatedDataVorcher = dataVorcher.map((voucher: any) => {
        if (now.isBefore(voucher.endday)) {
          const remainingTime = dayjs?.duration(voucher.endday.diff(now))
          const hoursRemaining = remainingTime.hours()
          const minutesRemaining = remainingTime.minutes()
          const secondsRemaining = remainingTime.seconds()
          voucher.timeRemaining = `${hoursRemaining} giờ ${minutesRemaining} phút ${secondsRemaining} giây còn lại`
        } else {
          voucher.timeRemaining = 'Hết hạn'
        }
        return voucher
      })
      // const nonExpiredVouchers = updatedDataVorcher.filter((voucher: any) => voucher.timeRemaining !== 'Hết hạn');
      setDataVorcher(updatedDataVorcher)
      // const allExpired = nonExpiredVouchers.every((voucher: any) => voucher.timeRemaining === 'Hết hạn');
      // if (allExpired) {
      //     clearInterval(intervalId);
      // }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [dataVorcher])

  const handelGetList = () => {
    setReset(!reset)
  }
  return (
    <div>
      <TemplateTable
        searchFunc={searchVoucher}
        setData={setDataVorcher}
        dataTable={dataVorcher}
        component='voucher'
        changeFunc={changeVorcher}
        columnTable={column}
        handelGetList={handelGetList}
        createFunc={createVorcher}
        deleteFunc={deleteVorcher}
        formEdit={
          <Fragment>
            <Form.Item
              label='Tên Vorcher'
              name='name'
              rules={[{ required: true, message: 'Vui lòng nhập Tên Vorcher!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Loại vorcher'
              name='type'
              rules={[{ required: true, message: 'Vui lòng nhập Loại vorcher!' }]}
            >
              <Select>
                <Option value='Ngày lễ'>Ngày lễ</Option>
                {/* <Option value="Giới hạn">Giới hạn</Option> */}
                <Option value='Mã Giảm giá'>Mã Giảm giá</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label='Số tiền giảm giá'
              name='discount'
              rules={[
                { required: true, message: 'Vui lòng nhập Giảm giá!' },
                { type: 'number', min: 0, max: 100, message: 'Giảm giá phải nằm trong khoảng từ 0 đến 100' }
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label='Mã code giảm giá'
              name='code'
              rules={[{ required: true, message: 'Vui lòng nhập Mã code giảm giá!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Ngày bắt đầu'
              name='startday'
              rules={[{ required: true, message: 'Vui lòng chọn Ngày bắt đầu!' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label='Ngày kết thúc'
              name='endday'
              rules={[{ required: true, message: 'Vui lòng chọn Ngày kết thúc!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Fragment>
        }
      />
    </div>
  )
}

export default CategoryManagement
