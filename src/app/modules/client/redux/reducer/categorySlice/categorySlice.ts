import { createSlice } from "@reduxjs/toolkit";
import { getAllcategory } from "./thunk/category.thunk";

const initialState = {
    categorys: []
} as any
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllcategory.fulfilled, (state, action) => {
            state.categorys = action.payload
        })
    }
})

export const { actions } = categorySlice

export default categorySlice.reducer