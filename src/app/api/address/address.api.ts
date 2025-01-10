// https://provinces.open-api.vn/api/

import { axiosPrivate } from "../configHttp"

export const getAddress = async () => {
    return await axiosPrivate.get("https://provinces.open-api.vn/api/")
}