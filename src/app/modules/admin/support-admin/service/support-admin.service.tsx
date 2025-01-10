import { axiosPrivate } from "~/app/api/configHttp"


export const getAllSupport = async () => {
    return await axiosPrivate.get('/support')
}
export const deleteSupport = async (id: any) => {
    return await axiosPrivate.delete('/support/delete/' + id)
}
export const createSupport = async (bodyRequest: any) => {
    return await axiosPrivate.post('/support/add', bodyRequest)
}

export const updateSupport = async (data: any, supportId: any) => {
    return await axiosPrivate.put('/support/update/' + supportId, data)

}
export const searchSupport = async (data: any) => {
    return await axiosPrivate.get(`/support/search?email=${data}`)
}

