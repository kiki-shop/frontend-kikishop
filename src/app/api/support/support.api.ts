import { axiosPrivate } from "../configHttp"

export const createSupport = async (data: any) => {
    return await axiosPrivate.post("/support/add", data)
}

export const repSupport = async(data:any) =>{
    return await axiosPrivate.post('/support/repsupport',data)
}