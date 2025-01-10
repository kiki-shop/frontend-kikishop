import { axiosPrivate } from "../configHttp"

export const createPayment = async (data: any) => {
    return await axiosPrivate.post("/payment/create_payment_url", data)
}

export const getPayment = async () => {
    return await axiosPrivate.get("/payment/vnpay/callback")
}

