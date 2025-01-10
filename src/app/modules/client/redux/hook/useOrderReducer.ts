import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/app/store/hooks'
import { actions as orderActions } from "../reducer/orderSlice/orderSlice"
import { getAllOrder } from "../reducer/orderSlice/thunk/order.thunk"
import { getAllOrderAdmin } from "../reducer/orderSlice/thunk/order.thunk"

export const useOrderRedux = () => {
    const data = useAppSelector((state: any) => state.client.orderReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...orderActions,
        getAllOrder,
        getAllOrderAdmin
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data,
        actions
    }
}