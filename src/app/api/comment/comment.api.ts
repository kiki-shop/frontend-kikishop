import { axiosPrivate } from "../configHttp"

export const createComment = async (data: any) => {
    const response = await axiosPrivate.post("/comment/add", data)
    return response.data
}

export const getAllComment = async () =>{
    const response = await axiosPrivate.get("/comment")
    return response.data
}

