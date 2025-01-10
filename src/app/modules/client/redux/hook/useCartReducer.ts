import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/app/store/hooks'
import { actions as cartAction } from "../reducer/cartSlice/cartSlice"
import { getAllCart } from './../reducer/cartSlice/thunk/cart.thunk';


export const useCartRedux = () => {
    const data = useAppSelector((state: any) => state.client.cartReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...cartAction,
        getAllCart
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data,
        actions
    }
}