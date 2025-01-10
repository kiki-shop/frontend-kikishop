import { axiosPrivate } from "../configHttp"

export const getAllContent = async () => {
    return await axiosPrivate.get("/content")
}
