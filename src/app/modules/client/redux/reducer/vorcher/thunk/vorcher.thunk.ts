import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/configHttp";

export const getVorcher = createAsyncThunk("vorcher/getVorcher", async () => {
    const response = await axiosPrivate.get("/vorcher")
    return response.data
})