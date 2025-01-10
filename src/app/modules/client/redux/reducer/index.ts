import { combineReducers } from 'redux'
import productReducer from './productSlice/productSlice'
import cartReducer from './cartSlice/cartSlice'
import categoryReducer from './categorySlice/categorySlice'
import authReducer from './authSlice/authSlice'
import orderReducer from './orderSlice/orderSlice'
import vorcherReducer from './vorcher/vorcher.Slice'
import commentReducer from './comment/commentSlice'
export const clientReducer = combineReducers({
    productReducer,
    cartReducer,
    categoryReducer,
    authReducer,
    orderReducer,
    vorcherReducer,
    commentReducer
})
export default clientReducer