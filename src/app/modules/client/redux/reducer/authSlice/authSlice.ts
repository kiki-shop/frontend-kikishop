import { createSlice } from "@reduxjs/toolkit";
import { getOneUser } from "./thunk/auth.thunk";
export interface AuthType {
    isLogin: boolean
    user: any
}
const initialState: AuthType = {
    user: {},
    isLogin: false
}
const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getOneUser.fulfilled, (state: any, action) => {
            state.user = action.payload
        })

    }
})
export const { actions } = authSlice
export default authSlice.reducer