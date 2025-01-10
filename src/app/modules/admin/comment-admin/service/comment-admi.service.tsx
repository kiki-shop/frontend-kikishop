import { axiosPrivate } from "~/app/api/configHttp"

export const getAllComment = async () => {
    return await axiosPrivate.get("/comment")
}
export const deleteComment = async (id: any) => {
    return await axiosPrivate.delete(`/comment/delete/${id}`)
}
export const updateComment = async (requestBody:any, id: any) => {
    return await axiosPrivate.put(`/comment/update/${id}`, requestBody)
}

export const searchComment = async (keywork: any) =>{
    return await axiosPrivate.get(`/comment/search?name=${keywork}`)
}