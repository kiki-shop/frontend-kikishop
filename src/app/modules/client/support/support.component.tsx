import { css } from '@emotion/react'
import { Skeleton } from 'antd'
import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import ButtonSqua from '~/app/component/parts/button/ButtonSqua'
import MenuSideBar from '~/app/component/stack/menu-sidebar/menu-sidebar.component'

type Props = {}

const Support = (props: Props) => {
    const accessToken = localStorage.getItem("accessToken")
    return (
        <>
            {
                accessToken ? (
                    <div className='w-full lg:w-[1440px] m-auto block lg:flex mt-16' >
                        <div>
                            <MenuSideBar />
                        </div>
                        <div className='px-5 lg:px-0 lg:pl-[20px]'>
                            <h2 className='font-semibold text-[24px] uppercase leading-8 mb-5'>Hỗ trợ</h2>
                            <ButtonSqua css={cssBtn} outline>
                                <a href="" className='space-x-2'>
                                    <div className='text-[18px]'><AiFillPlusCircle /></div>
                                    <div>Gửi yêu cầu hỗ trợ</div>
                                </a>
                            </ButtonSqua>
                            <div className='w-full lg:w-[1200px] mt-3'>
                                <h1 className='text-center text-[#6C6D70] text-[24px]'>Bạn chưa có yêu cầu hỗ trợ nào !</h1>
                            </div>
                        </div>
                    </div >
                ) : (<Skeleton active />)
            }
        </>


    )
}

export default Support

const cssBtn = css`
border-radius: 12px 0px;
a{
    display:flex;
    align-items: center;
    padding: 10px 6px;
    line-height: 16px;
    font-size: 16px;
    font-weight:600;
    text-transform: uppercase;
}
`