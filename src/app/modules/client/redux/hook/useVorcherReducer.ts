import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/app/store/hooks'
import { actions as vorcherActions } from "../reducer/vorcher/vorcher.Slice"
import { getVorcher } from "../reducer/vorcher/thunk/vorcher.thunk"

export const useVorcherRedux = () => {
    const data = useAppSelector((state: any) => state.client.vorcherReducer as any, shallowEqual)
    const dispatch = useAppDispatch()
    const allActions = {
        ...vorcherActions,
        getVorcher
    }
    const actions = useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
    return {
        data,
        actions
    }
}