import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, getOneProduct } from "./thunk/product.thunk";
const initialState = {
    products: [],
    product: {}
} as any
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state: any, action) => {
            state.products = action.payload.filter((product:any) => product.status )
        })
        builder.addCase(getOneProduct.fulfilled, (state: any, action) => {
            state.product = action.payload
        })

    }
})
export const { actions } = productSlice
export default productSlice.reducer