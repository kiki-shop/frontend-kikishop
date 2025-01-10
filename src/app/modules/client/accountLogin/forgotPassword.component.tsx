import React, { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import InputComponent from '~/app/component/parts/input/input.component'
import ButtonSqua from '~/app/component/parts/button/ButtonSqua'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { validateForgotPassword } from '../utils/validateForm'
import { sendEmail } from '~/app/api/auth/auth.api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface ForgotPasswordProps {
  props?: any
  setStepAuth?: any
}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
    const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validateForgotPassword)
  })
  const handleSendemail = (email:any) => {
    sendEmail(email).then((res)=>{
        if(res){
            toast.success('Gửi mật khẩu thành công. Vui lòng kiểm tra email!')
            navigate('/customer/login')
        }
    }, (err:any)=>{
        toast.error(err.response.data)
    })
  }
  return (
    <div css={cssForgotPass}>
      <div className='text-center my-[24px]'>
        <h4 className='big-title'>Bạn muốn tìm lại mật khẩu?</h4>
        <p className='small-title'>
          Vui lòng nhập lại email đã đăng ký, hệ thống của chúng tôi sẽ gửi mật khẩu qua email đã đăng kí cho bạn.
        </p>
      </div>

      <form className='w-[390px] mx-auto space-y-[24px]' onSubmit={handleSubmit(handleSendemail)}>
        <div>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
              return (
                <div className='w-full h-[34px] mt-5'>
                  <InputComponent
                    type='email'
                    hideIcon={false}
                    placeholder='Email/SĐT'
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    hasErorr={error}
                  />
                    {errors && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{errors.email?.message}</span>}    
                </div>
              )             
            }}
          />
        </div>
        <ButtonSqua css={cssBtn} outline>
          Gửi đi
        </ButtonSqua>
      </form>
    </div>
  )
}
export default ForgotPassword
const cssForgotPass = css`
  width: 90%;
  margin: 0 auto;
  .big-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #221f20;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }
  .small-title {
    font-size: 14px;
    line-height: 24px;
    color: #6c6d70;
  }
`

const cssBtn = css`
  text-transform: uppercase;
  width: 100%;
  padding: 12px 24px;
  border-radius: 16px 0px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`
