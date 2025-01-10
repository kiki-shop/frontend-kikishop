import { createSlice } from "@reduxjs/toolkit"
import { getAllComments } from "./thunk/commentThunk"

const initialState = {
    comments: []
} as any

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllComments.fulfilled, (state: any, action: any) => {     
            state.comments = action.payload            
        })
    }
})

export const { actions } = commentSlice
export default commentSlice.reducer
