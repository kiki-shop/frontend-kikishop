import { createSlice } from "@reduxjs/toolkit";
import { getVorcher } from "./thunk/vorcher.thunk";

const initialState = {
    vorchers: [],

} as any
const vorcherSlice = createSlice({
    name: "vorcher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVorcher.fulfilled, (state: any, action) => {
            state.vorchers = action.payload
        })


    }
})
export const { actions } = vorcherSlice
export default vorcherSlice.reducer