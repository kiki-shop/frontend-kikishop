import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosPrivate } from "~/app/api/configHttp"

export const getOneUser = createAsyncThunk("auth/getoneuser", async (id: any) => {
    const response = await axiosPrivate.get(`/auth/${id}`)
    return response.data
})