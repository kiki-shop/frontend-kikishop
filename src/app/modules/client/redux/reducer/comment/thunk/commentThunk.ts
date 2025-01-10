import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosPrivate } from "~/app/api/configHttp"

export const getAllComments = createAsyncThunk("comment/getallcomment", async (id: any) => {
    const response = await axiosPrivate.get(`/comment/${id}`)
    return response.data
})