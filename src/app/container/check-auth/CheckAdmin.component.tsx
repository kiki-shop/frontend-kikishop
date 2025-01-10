import { message } from 'antd'
import React, { FC, Fragment, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUserDetail } from '~/app/api/auth/auth.api'

type Props = {}

export const CheckAdmin: FC<any> = ({ children }): any => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('accessToken')
    const userSystem = localStorage.getItem('userID')
    const userSystem1 = localStorage.getItem('checkAuth')
    useEffect(() => {
        getUserDetail(userSystem).then((res) => {
            if (res.data.role === 'USER_STORE' || res.data.role ==='USER') {
                navigate('/admin')
                return null
            }
        })
    }, [navigate])

    return <Fragment>{accessToken && userSystem1 === 'ADMIN' ? children : <Navigate to='/admin' />}</Fragment>
}