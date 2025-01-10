import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/configHttp";


export const getAllcategory = createAsyncThunk("category/getallcategory", async () => {
    const response = await axiosPrivate.get("/category")
    return response.data
})