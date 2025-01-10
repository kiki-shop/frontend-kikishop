import { axiosPrivate } from "~/app/api/configHttp"

export const getAllOrder = async () => {
    return await axiosPrivate.get('/order/orderadmin')
}

export const getAllStatistics = async () => {
    return await axiosPrivate.get('/statistics')
}

export const getAllOrderByStatus = async (data: any) => {
    return await axiosPrivate.post('/statistics/order-all-status', data)
}