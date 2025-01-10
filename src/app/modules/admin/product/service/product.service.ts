import { axiosPrivate } from '~/app/api/configHttp'

export const getAllProduct = async () => {
  return await axiosPrivate.get('/product')
}
export const searchProduct = async (keyword: any) => {
  return await axiosPrivate.get(`/product/search?name=${keyword}`)
}
export const createProduct = async (data: any) => {
  return await axiosPrivate.post('/product/add', data)
}
export const editProduct = async (data: any, id: any) => {
  return await axiosPrivate.put(`/product/edit/${id}`, data)
}
export const deleteProduct = async (id: any) => {
  return await axiosPrivate.delete(`/product/${id}`)
}
