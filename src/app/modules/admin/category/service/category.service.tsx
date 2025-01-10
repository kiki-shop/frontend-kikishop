import { axiosPrivate } from '../../../../api/configHttp';

export const getAllCategory = async () => {
    return await axiosPrivate.get('/category')
}

export const deleteCategory = async (userId: any) => {
    return await axiosPrivate.delete('/category/' + userId)
}

export const createCategory = async (dataBody: any) => {
    return await axiosPrivate.post("/category/add", dataBody)
}

export const changeCategory = async (bodyRequest: any, userId: any) => {
    return await axiosPrivate.put('/category/edit/' + userId, bodyRequest)
}
export const searchCategory = async (keyword: any) => {
    return await axiosPrivate.get(`/category/search?name=${keyword}`)
}