import { axiosPrivate } from "~/app/api/configHttp"


export const getAllVorcher = async () => {
    return await axiosPrivate.get('/vorcher')
}
export const createVorcher = async (bodyRequest: any) => {
    return await axiosPrivate.post('/vorcher/add', bodyRequest)
}
export const deleteVorcher = async (id: any) => {
    return await axiosPrivate.post(`/vorcher/delete/${id}`)
}
export const changeVorcher = async (bodyRequest: any, userId: any) => {
    return await axiosPrivate.put('/vorcher/update/' + userId, bodyRequest)
}
export const searchVoucher = async (keyword: any) => {
    return await axiosPrivate.get(`/vorcher/search?code=${keyword}`)
}