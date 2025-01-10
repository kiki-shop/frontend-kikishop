import { css } from '@emotion/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, Skeleton } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputComponent from '~/app/component/parts/input/input.component'
import MenuSideBar from '~/app/component/stack/menu-sidebar/menu-sidebar.component'
import { validateManageInfo } from '../utils/validateForm'
import { Radio } from 'antd';
import ButtonSqua from '~/app/component/parts/button/ButtonSqua'
import UpdatePassword from './component/updatePassword.component'
import { GrFormClose } from 'react-icons/gr'
import { getAllUser, getOneUserSystem } from '~/app/api/auth/auth.api'
import { updatUser } from '~/app/api/auth/auth.api';
import toast from 'react-hot-toast'

interface CustomerData {
    fullname: string;
    phoneNumber: string;
    address: string;
    nickname: string;
    email: string;
    birthday: string;
    gender: string;
}
interface InFo {
    props?: CustomerData
}
const ManageInfoCustomer: FunctionComponent<InFo> = () => {
    const accessToken = localStorage.getItem("accessToken")
    const arrayField = [
        {
            title: "Nickname",
            field: "nickname"
        },
        {
            title: "password",
            field: "password",
            hidden: true
        },
        {
            title: "Họ và Tên",
            field: "fullname"
        },
        {
            title: "Ngày sinh",
            field: "birthday"
        },
        {
            title: "Giới tính",
            field: "gender"
        },
        {
            title: "Số điện thoại",
            field: "phoneNumber"
        },
        {
            title: "Email",
            field: "email"
        },
        {
            title: "Địa Chỉ",
            field: "address"
        }

    ]

    const [stateUpdatePassword, setstateUpdatePassword] = useState(false)
    const id = localStorage.getItem("userID")
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validateManageInfo),
        defaultValues: async () => {
            const userData = (await getOneUserSystem(id)).data;
            const filteredData: any = {};
            arrayField.forEach((key: any) => {
                if (userData.hasOwnProperty(key?.field)) {
                    filteredData[key?.field] = userData[key?.field];
                }
            })
            return filteredData
        }
    });
    const onSubmit = (data: any) => {
        const idUser = localStorage.getItem("userID")
        updatUser(idUser, data).then((res: any) => {
            if (res) {
                toast.success("Cập nhật thông tin thành công!")
            }
        }, (err) => {
            toast.error("Cập nhật lỗi")
        })
    }



    return (
        <div css={cssManageInfo}>
            {
                accessToken ? (
                    <div className='w-full lg:w-[1440px] m-auto block lg:flex justify-center mt-16 relative' >
                        <div>
                            <MenuSideBar />
                        </div>
                        <div className='px-[20px]  md:pl-[20px] w-full'>
                            <h2 className='font-semibold text-[24px] uppercase leading-8'>Tài khoản của tôi</h2>
                            <div className='mt-3 flex'>
                                <h3 className='alert'>"Vì chính sách an toàn thẻ, bạn không thể thay đổi SĐT, Ngày sinh, Họ tên. Vui lòng liên hệ CSKH 0905898683 để được hỗ trợ"</h3>
                            </div>

                            <div className='flex space-x-28 md:ml-24 w-full'>
                                <form onSubmit={handleSubmit(onSubmit)} className='w-[650px] mt-8'>
                                    <div className='space-y-10'>
                                        {
                                            arrayField.map((item: any) => {
                                                if (item.hidden) {
                                                    return null;
                                                }
                                                return <div className='block md:flex items-center h-[48px]' key={item.field}>
                                                    <div className='w-full md:w-[170px] text-[#3e3e3f] text-[14px] leading-[16px]'>
                                                        {item.title}:
                                                    </div>
                                                    <div className='w-full md:w-[480px]'>
                                                        <Controller
                                                            control={control}
                                                            name={item.field}
                                                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                                                                if (item.field == 'birthday') {
                                                                    const dateString = value;
                                                                    const dateObject = new Date(dateString);
                                                                    const year = dateObject.getFullYear();
                                                                    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
                                                                    const day = dateObject.getDate();
                                                                    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
                                                                    return (
                                                                        <div>
                                                                            <InputComponent
                                                                                hideIcon={false}
                                                                                type="date"
                                                                                placeholder={item?.title}
                                                                                onChange={onChange}
                                                                                value={formattedDate}
                                                                                ref={ref}
                                                                                hasErorr={error}
                                                                                key={item.title}
                                                                            />
                                                                            {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                                                                        </div>
                                                                    );
                                                                }
                                                                else if (item.field == 'gender') {
                                                                    return <Radio.Group onChange={onChange} defaultValue={"Nam"} value={value} >
                                                                        <Radio value={"Nam"}>Nam</Radio>
                                                                        <Radio value={"Nữ"}>Nữ</Radio>
                                                                        <Radio value={"Khác"}>Khác</Radio>
                                                                    </Radio.Group>
                                                                }
                                                                else if (item.field == 'email') {
                                                                    return (
                                                                        <div>
                                                                            <InputComponent
                                                                                hideIcon={false}
                                                                                type="email"
                                                                                placeholder={item?.title}
                                                                                onChange={onChange}
                                                                                value={value}
                                                                                ref={ref}
                                                                                hasErorr={error}
                                                                            />
                                                                            {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                                                                        </div>
                                                                    );
                                                                }
                                                                else return (
                                                                    <div>
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
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className='px-[15px] mt-[16px] flex justify-center space-x-2'>
                                        <ButtonSqua css={cssBtn} type={"submit"} children='Cập nhật' outline />
                                        <ButtonSqua css={cssBtn} type={'button'} children='Đổi mật khẩu' onClick={() => { setstateUpdatePassword(true) }} />
                                    </div>

                                </form>

                                <div className='mt-8 hidden lg:block'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>Điểm chiết khấu</td>
                                                <td><b>0</b></td>
                                            </tr>
                                            <tr>
                                                <td>Chiết khấu</td>
                                                <td><b>0%</b></td>
                                            </tr>
                                            <tr>
                                                <td>Hạn thẻ</td>
                                                <td><b>18/09/2024</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        {stateUpdatePassword && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[800px] z-50'>
                            <div className='absolute right-2 top-2 text-[30px]' onClick={() => setstateUpdatePassword(false)}><GrFormClose /></div>
                            <UpdatePassword />
                        </div>}
                        {stateUpdatePassword && <div className='darkscreen fixed z-40' onClick={() => setstateUpdatePassword(false)}></div>}

                    </div >
                ) : (<Skeleton active />)
            }
        </div >


    )
}

export default ManageInfoCustomer

const cssManageInfo = css`
.alert{
    display:block;
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
    padding: 12px 20px;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    box-sizing: border-box;
    line-height: 24px;
    font-size: 18px;
}
.table td{
    border: 1px solid #dee2e6;
    padding: 12px 60px;
    text-align:center;
    font-size: 16px;
    line-height: 24px;
}
.darkscreen{
    positon:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:gray;
    opacity:0.5;
}
`
const cssBtn = css`
  padding: 12px 24px;
  border-radius: 16px 0px;
  font-size: 16px;
  line-height: 24px;
`