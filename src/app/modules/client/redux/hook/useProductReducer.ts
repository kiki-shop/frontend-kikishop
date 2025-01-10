import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/app/store/hooks'
import { actions as productActions } from "../reducer/productSlice/productSlice"
import { getAllProduct, getOneProduct } from '../reducer/productSlice/thunk/product.thunk'
export const useProductRedux = () => {
    const data = useAppSelector((state: any) => state.client.productReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...productActions,
        getAllProduct,
        getOneProduct
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data,
        actions
    }
}