import React, { useEffect, useState } from 'react'
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { getAllProduct } from '../product/service/product.service';
import { getAllCategory } from '../category/service/category.service';
import { getAllUser } from '../user/service/user.service';
import { getAllOrder } from '../order/service/order.service';
import { getAllSupport } from '../support-admin/service/support-admin.service';
import { getAllVorcher } from '../vocher/service/vorcher.service';
import { getAllComment } from '../comment-admin/service/comment-admi.service';


const DashBoard = () => {


    const [products, setProducts] = useState([])
    const [categorys, setCategorys] = useState([])
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [supports, setSupports] = useState([])
    const [vorchers, setVorchers] = useState([])
    const [comments, setComments] = useState([])


    useEffect(() => {
        getAllProduct().then((res: any) => setProducts(res.data))
        getAllCategory().then((res: any) => setCategorys(res.data))
        getAllComment().then((res: any) => setComments(res.data))
        getAllSupport().then((res: any) => setSupports(res.data))
        getAllUser().then((res: any) => setUsers(res.data))
        getAllOrder().then((res: any) => {
            const newOrder = res.data.filter((item: any) => item.orderStatus === "đang chờ duyệt")
            setOrders(newOrder)
        })
        getAllVorcher().then((res: any) => setVorchers(res.data))
    }, [])
    return (
        <div>
            <div className='text-4xl pb-10'>Tổng quan</div>
            <div className='grid grid-cols-4'>
                <div className='bg-yellow-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{products?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Sản Phẩm</div>
                    </div>
                    <div className='bg-yellow-600 rounded-lg text-white justify-center p-4 w-full flex bottom-0 '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>

                <div className='bg-green-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{categorys?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Danh Mục Sản Phẩm</div>
                    </div>
                    <div className='bg-green-600 rounded-lg text-white justify-center p-4 w-full flex '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>


                <div className='bg-orange-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{comments?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Bình Luận - Đánh Giá</div>
                    </div>
                    <div className='bg-orange-600 rounded-lg text-white justify-center p-4 w-full flex '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>


                <div className='bg-pink-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{users?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Thành Viên</div>
                    </div>
                    <div className='bg-pink-600 rounded-lg text-white justify-center p-4 w-full flex '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>

            </div>

            <div className='grid grid-cols-4 mt-10'>
                <div className='bg-purple-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{supports?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Danh Sách Liên Hệ</div>
                    </div>
                    <div className='bg-purple-600 rounded-lg text-white justify-center p-4 w-full flex '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>

                <div className='bg-rose-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{orders?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Đơn Hàng Chưa Xử Lý</div>
                    </div>
                    <div className='bg-rose-600 rounded-lg text-white justify-center p-4 w-full flex '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>

                <div className='bg-lime-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
                    <div className='block px-6'>
                        {<div className='text-6xl text-white font-semibold pb-[22px]'>{vorchers?.length}</div>}
                        <div className='text-white font-medium text-3xl mb-9'>Khuyến mãi</div>
                    </div>
                    <div className='bg-lime-600 rounded-lg text-white justify-center p-4 w-full flex '>
                        <div className='px-2 text-xl font-medium'>Chi tiết</div>
                        <div><BsFillArrowRightCircleFill className='text-3xl' /></div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DashBoard