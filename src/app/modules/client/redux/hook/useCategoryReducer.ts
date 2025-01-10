import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/app/store/hooks'
import { actions as categoryActions } from "../reducer/categorySlice/categorySlice"
import { getAllcategory } from './../reducer/categorySlice/thunk/category.thunk';

export const useCategoryRedux = () => {
    const data = useAppSelector((state: any) => state.client.categoryReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...categoryActions,
        getAllcategory
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data,
        actions
    }
}