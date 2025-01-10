import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/configHttp";

export const getAllProduct = createAsyncThunk("product/getallproduct", async () => {
    const response = await axiosPrivate.get("/product")
    return response.data
})
export const getOneProduct = createAsyncThunk("product/getoneproduct", async (id: any) => {
    const response = await axiosPrivate.get(`/product/${id}`)
    return response.data
})