import React, { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import InputComponent from '~/app/component/parts/input/input.component'
import ButtonSqua from '~/app/component/parts/button/ButtonSqua'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateRegister } from '../utils/validateForm'
import { Input, Select } from 'antd'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthRedux } from '../redux/hook/useAuthReducer'
import { registerSystem } from '~/app/api/auth/auth.api'

interface RegisterProps {
  props?: any
}
const { TextArea } = Input
const { Option } = Select

const Register: FunctionComponent<RegisterProps> = () => {
  const [messageApi, contextHolder] = message.useMessage()
  let navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validateRegister)
  })
  const onSubmit = (data: any) => {
      registerSystem(data).then(
      (res) => {
        if (res) {
          navigate('/customer/login')
          message.success('đăng ký thành công')
        }
      },
      (err) => {
        message.error(err.response.data)
      }
    )
  }
  return (
    <div css={cssRegister} className='box-border'>
      {contextHolder}
      <h1 className='text-center my-[24px] font-semibold text-[24px] text-[#221f20] uppercase leading-[32px]'>
        Đăng ký
      </h1>

      <form action='' className='w-[90%] mx-auto text-[#6C6D70] flex form' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-1/2'>
          <div className='px-[15px] text-[#221f20] mb-[10px] text-[16px]'>
            <h1>Thông tin khách hàng</h1>
          </div>

          <div className='flex mb-[16px]'>
            <div className='w-1/2 px-[15px]'>
              <label htmlFor=''>
                Họ và tên:<b className='text-red-600'>*</b>
              </label>
              <Controller
                control={control}
                name='fullname'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full my-2'>
                      <InputComponent
                        type='text'
                        hideIcon={false}
                        placeholder='Họ và tên'
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  )
                }}
              />
            </div>
            <div className='w-1/2 px-[15px]'>
              <label htmlFor=''>
                Nickname:<b className='text-red-600'>*</b>
              </label>
              <Controller
                control={control}
                name='nickname'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full my-2'>
                      <InputComponent
                        type='text'
                        hideIcon={false}
                        placeholder='Nickname'
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className='flex mb-[16px]'>
            <div className='w-1/2 px-[15px]'>
              <label htmlFor=''>
                Email:<b className='text-red-600'>*</b>
              </label>
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full my-2'>
                      <InputComponent
                        type='email'
                        hideIcon={false}
                        placeholder='Email'
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  )
                }}
              />
            </div>
            <div className='w-1/2 px-[15px]'>
              <label htmlFor=''>
                Điện thoại:<b className='text-red-600'>*</b>
              </label>
              <Controller
                control={control}
                name='phoneNumber'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full my-2'>
                      <InputComponent
                        type='text'
                        hideIcon={false}
                        placeholder='Điện thoại'
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className='flex mb-[16px]'>
            <div className='w-1/2 px-[15px]'>
              <label htmlFor=''>
                Ngày sinh:<b className='text-red-600'>*</b>
              </label>
              <Controller
                control={control}
                name='birthday'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full my-2'>
                      <InputComponent
                        type='date'
                        hideIcon={false}
                        placeholder='Ngày sinh'
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  )
                }}
              />
            </div>
            <div className='w-1/2 px-[15px]'>
              <label htmlFor=''>
                Giới tính:<b className='text-red-600'>*</b>
              </label>
              <Controller
                control={control}
                name='gender'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full my-2'>
                      <Select placeholder='Giới tính' onChange={onChange} allowClear className='w-full'>
                        <Option value='Nam'>Nam</Option>
                        <Option value='Nữ'>Nữ</Option>
                        <Option value='Khác'>Khác</Option>
                      </Select>
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className='px-[15px] mb-[16px]'>
            <label htmlFor=''>
              Địa chỉ:<b className='text-red-600'>*</b>
            </label>
            <Controller
              control={control}
              name='address'
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                return (
                  <div className='w-full my-2'>
                    <TextArea rows={3} onChange={onChange} value={value} ref={ref} />
                    {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                  </div>
                )
              }}
            />
            <div></div>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='px-[15px] text-[#221f20] mb-[10px] text-[16px]'>
            <h1>Thông tin mật khẩu</h1>
          </div>
          <div className='px-[15px] mb-[16px]'>
            <label htmlFor=''>
              Mật khẩu:<b className='text-red-600'>*</b>
            </label>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                return (
                  <div className='w-full my-2'>
                    <InputComponent
                      type='password'
                      hideIcon={false}
                      placeholder='Mật khẩu'
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      hasErorr={error}
                    />
                    {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                  </div>
                )
              }}
            />
          </div>

          <div className='px-[15px] mb-[16px]'>
            <label htmlFor=''>
              Nhập lại mật khẩu:<b className='text-red-600'>*</b>
            </label>
            <Controller
              control={control}
              name='confirmPass'
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                return (
                  <div className='w-full my-2'>
                    <InputComponent
                      type='password'
                      hideIcon={false}
                      placeholder='Nhập lại mật khẩu'
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      hasErorr={error}
                    />
                    {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                  </div>
                )
              }}
            />
          </div>

          <div className='px-[15px] mb-[5px]'>
            <input type='checkbox' name='' id='' />
            <span>
              Đồng ý với các <b className='text-red-500 font-thin'>điều khoản</b> của IVY
            </span>
          </div>
          <div className='px-[15px] mb-[16px] '>
            <input type='checkbox' name='' id='' />
            <span>Đăng ký nhận bản tin</span>
          </div>
          <div className='px-[15px] mb-[16px]'>
            <ButtonSqua css={cssBtn} children='Đăng ký' outline />
          </div>
        </div>
      </form>
    </div>
  )
}
export default Register

const cssRegister = css`
  .form label,
  span {
    border: 0;
    font-size: 16px;
    margin: 0;
    outline: 0;
    padding: 0;
    vertical-align: baseline;
  }
`
const cssBtn = css`
  width: 100%;
  padding: 12px 24px;
  border-radius: 16px 0px;
  font-size: 16px;
  line-height: 24px;
`
