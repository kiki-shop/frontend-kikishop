import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/configHttp";

export const getAllCart = createAsyncThunk("cart/getallcart", async () => {
    const response = await axiosPrivate.get("/cart")
    return response.data
})