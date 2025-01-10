import { getAllComments } from './../reducer/comment/thunk/commentThunk';
import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { shallowEqual } from "react-redux"
import { useAppDispatch, useAppSelector } from "~/app/store/hooks"
import {actions as commentActions} from '../reducer/comment/commentSlice'

export const useCommentRedux = () => {
    const data = useAppSelector((state: any) => state.client.commentReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...commentActions,
        getAllComments
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data, actions
    }
}