import React from 'react'
import { validateUpdatePassword } from '../../utils/validateForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import InputComponent from '~/app/component/parts/input/input.component';
import ButtonSqua from '~/app/component/parts/button/ButtonSqua';
import { css } from '@emotion/react';
import { updatUser } from '~/app/api/auth/auth.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
type Props = {}

const UpdatePassword = (props: Props) => {
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validateUpdatePassword)
    });
    const onSubmitPassword = (data: any) => {
        const idUser = localStorage.getItem("userID")
        updatUser(idUser, data).then((res: any) => {
            if (res) {
                toast.success("Đổi mật khẩu thành công!")
                localStorage.removeItem("userID")
                localStorage.removeItem("accessToken")
                navigate("/customer/login")
            }
        }, (err) => {
            toast.error(err.response.data)
        })

    }
    const arrayPass = [
        {
            title: "Mật khẩu mới",
            field: "password"
        },
        {
            title: "Nhập lại Mật khẩu mới",
            field: "confirmNewPassword"
        },
    ]
    return (
        <div css={cssPasswordForm}>
            <form onSubmit={handleSubmit(onSubmitPassword)} className='max-w-[800px] w-[100%] m-auto bg-white p-[40px]'>
                <h3 className='title'>Đổi mật khẩu</h3>
                {arrayPass.map((item: any) => {
                    return <div className='mt-10' key={item.field}>
                        <Controller
                            control={control}
                            name={item.field}
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                                return (
                                    <div className='space-y-2'>
                                        <label>{item?.title}</label>
                                        <InputComponent
                                            hideIcon={false}
                                            placeholder={item?.title}
                                            onChange={onChange}
                                            value={value}
                                            ref={ref}
                                            hasErorr={error}
                                        />
                                        {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}

                                    </div>
                                );
                            }}
                        />
                    </div>
                })}
                <ButtonSqua css={cssBtn} type={"submit"} children='Cập nhật' outline />

            </form>
        </div>
    )
}

export default UpdatePassword

const cssPasswordForm = css`
.title{
    font-weight: 600;
    font-size: 30px;
    line-height: 32px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #221f20;
    margin-bottom: 40px;
}
label{
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #6C6D70;
}
`

const cssBtn = css`
  width:100%; 
  margin-top:50px;
  padding: 12px 24px;
  border-radius: 16px 0px;
  font-size: 16px;
  line-height: 24px;
`