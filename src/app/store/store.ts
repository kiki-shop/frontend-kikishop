import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import clientReducer from '../modules/client/redux/reducer'

export const store = configureStore({
    reducer: {
        client: clientReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AsyncThunkConfigType = {
    dispatch: AppDispatchType
    state: RootState
}