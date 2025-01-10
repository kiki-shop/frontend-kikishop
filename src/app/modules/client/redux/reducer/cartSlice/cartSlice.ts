import { createSlice } from "@reduxjs/toolkit";
import { getAllCart } from "./thunk/cart.thunk";
const initialState = {
    carts: [],
    listProductBuy: JSON.parse(localStorage.getItem('listSelectCart')!) ?? [],
    cartAccount: JSON.parse(localStorage.getItem('cartNoAccount')!) ?? []
} as any

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const productPayload = action.payload as any
            const findProductInToCart = state.carts.findIndex((itemProduct: any) => {
                itemProduct.product.name == productPayload.product.name &&
                    itemProduct.quantityOrder.nameColor == productPayload.quantityOrder.nameColor &&
                    itemProduct.quantityOrder.nameSize == productPayload.quantityOrder.nameSize
            })

            if (findProductInToCart > -1) {
                state.carts[findProductInToCart].quantityOrder.quantity =
                    state.carts[findProductInToCart].quantityOrder.quantity = productPayload.quantityOrder.quantity
            }
            else {
                state.carts.push(action.payload)
            }
        },
        addProductToCartNoUser: (state, action) => {
            const productPayload = action.payload as any
            const findProductInToCart = state.cartAccount.findIndex((itemProduct: any) => {
                itemProduct.product.name == productPayload.product.name &&
                    itemProduct.quantityOrder.nameColor == productPayload.quantityOrder.nameColor &&
                    itemProduct.quantityOrder.nameSize == productPayload.quantityOrder.nameSize
            })

            if (findProductInToCart > -1) {
                state.cartAccount[findProductInToCart].quantityOrder.quantity =
                    state.cartAccount[findProductInToCart].quantityOrder.quantity = productPayload.quantityOrder.quantity
            }
            else {
                state.cartAccount.push(action.payload)
            }
        },
        updateOrderProduct: (state, action) => {
            if (state.carts.length > 0) {
                const findProductIntoCart = state.carts.find(
                    (item: any, index: number) =>
                        item.product._id === action.payload.productId && action.payload.indexProductCart === index
                )
                findProductIntoCart.quantityOrder = {
                    nameColor: action.payload.colorSelect.nameColor,
                    nameSize: action.payload.sizeSelect.nameSize,
                    quantity: findProductIntoCart.quantityOrder.quantity
                }
            }
            else {
                const findProductIntoCart = state.cartAccount.find(
                    (item: any, index: number) =>
                        item.product._id === action.payload.productId && action.payload.indexProductCart === index
                )

                findProductIntoCart.quantityOrder = {
                    nameColor: action.payload.colorSelect.nameColor,
                    nameSize: action.payload.sizeSelect.nameSize,
                    quantity: findProductIntoCart.quantityOrder.quantity
                }
                localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount));
            }
        },

        updateSelectQuantityCart: (state, action) => {
            const { itemCart, quantityWithCondition, quantityRemainProduct, newQuantity } = action.payload
            if (state.carts.length > 0) {
                const findItemCart = state.carts.findIndex((item: any) => item._id === itemCart._id)
                switch (action.payload.type) {
                    case 'INCREMENT':
                        if (Number(itemCart.quantityOrder.quantity) < Number(quantityWithCondition)) {
                            state.carts[findItemCart].quantityOrder.quantity += 1
                        }
                        break
                    case 'DECREMENT':
                        if (itemCart.quantityOrder.quantity == 1) {
                            state.carts[findItemCart].quantityOrder.quantity = 1
                        } else {
                            state.carts[findItemCart].quantityOrder.quantity -= 1
                        }
                        break

                    case 'ONCHANGE_INPUT':
                        if (Number(newQuantity) > Number(quantityWithCondition)) {
                            state.carts[findItemCart].quantityOrder.quantity = quantityWithCondition;
                        }

                        if (Number(newQuantity) <= Number(quantityWithCondition)) {
                            state.carts[findItemCart].quantityOrder.quantity = newQuantity
                        }
                        if (Number(newQuantity) < 1) {
                            state.carts[findItemCart].quantityOrder.quantity = 1;
                        }
                        //state.carts[findItemCart].quantityOrder.quantity = newQuantity
                        break;

                    case 'COMPARE_QUANTITY':
                        if (itemCart.quantityOrder.quantity > quantityRemainProduct?.quantity) {
                            state.carts[findItemCart].quantityOrder.quantity = quantityRemainProduct.quantity
                        }
                    default:
                        break
                }
            }
            else {
                const findItemCart = state.cartAccount.findIndex((item: any) => item._id === itemCart._id)
                switch (action.payload.type) {
                    case 'INCREMENT':
                        if (Number(itemCart.quantityOrder.quantity) < Number(quantityWithCondition)) {
                            state.cartAccount[findItemCart].quantityOrder.quantity += 1
                            localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount));
                        }
                        break
                    case 'DECREMENT':
                        if (itemCart.quantityOrder.quantity == 1) {
                            state.cartAccount[findItemCart].quantityOrder.quantity = 1
                        } else {
                            state.cartAccount[findItemCart].quantityOrder.quantity -= 1
                        }
                        localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount));
                        break

                    case 'ONCHANGE_INPUT':
                        if (Number(newQuantity) > Number(quantityWithCondition)) {
                            state.cartAccount[findItemCart].quantityOrder.quantity = quantityWithCondition;
                            localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount));
                        }

                        if (Number(newQuantity) <= Number(quantityWithCondition)) {
                            state.cartAccount[findItemCart].quantityOrder.quantity = newQuantity
                            localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount));
                        }
                        if (Number(newQuantity) < 1) {
                            state.cartAccount[findItemCart].quantityOrder.quantity = 1;
                            localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount));
                        }
                        //state.cartAccount[findItemCart].quantityOrder.quantity = newQuantity
                        break;

                    case 'COMPARE_QUANTITY':
                        if (itemCart.quantityOrder.quantity > quantityRemainProduct?.quantity) {
                            state.cartAccount[findItemCart].quantityOrder.quantity = quantityRemainProduct.quantity
                        }
                    default:
                        break
                }
            }

        },
        selectListProductBuy: (state, action) => {
            const productBuy = action.payload
            if (state.listProductBuy.flatMap((item: any) => item?._id).includes(productBuy?._id)) {
                const index = state.listProductBuy.findIndex((itemIndex: any) => itemIndex._id === productBuy?._id)
                state.listProductBuy.splice(index, 1)
            }
            else {
                state.listProductBuy.push(action.payload)
            }
            localStorage.setItem("listSelectCart", JSON.stringify(state.listProductBuy))
        },
        clearCart: (state) => {
            state.listProductBuy = []
        },
        clearCartNoAccount: (state) => {
            state.cartAccount = []
        },
        // callCart: (state) => {
        //     state.cartAccount = localStorage.setItem('cartNoAccount', JSON.stringify(state.cartAccount))
        // },
        selectAllProductBuy: (state) => {
            if (state.carts.length > 0) {
                const productIndex = state.listProductBuy.length == state.carts.length
                if (productIndex) {
                    localStorage.removeItem("listSelectCart");
                    state.listProductBuy = [];
                } else {
                    state.listProductBuy = [...state.carts];
                    localStorage.setItem("listSelectCart", JSON.stringify(state.listProductBuy));

                }
            }
            else {
                if (state.cartAccount.length > 0) {
                    const productIndex = state.listProductBuy.length == state.cartAccount.length
                    if (productIndex) {
                        localStorage.removeItem("listSelectCart");
                        state.listProductBuy = [];
                    } else {
                        state.listProductBuy = [...state.cartAccount];
                        localStorage.setItem("listSelectCart", JSON.stringify(state.listProductBuy));
                    }
                } else {
                    const productIndex = state.listProductBuy.length == state.cartAccount.length
                    if (productIndex) {
                        localStorage.removeItem("listSelectCart");
                        state.listProductBuy = [];
                    } else {
                        state.listProductBuy = [...state.cartAccount];
                        localStorage.setItem("listSelectCart", JSON.stringify(state.listProductBuy));

                    }
                }
            }
        },

        deleteProductCart: (state, action) => {
            if (state.carts.length > 0) {
                const productId = action.payload
                state.carts = state.carts.filter((item: any) => item._id !== productId)
                const listSelectCart = JSON.parse(localStorage.getItem("listSelectCart") || "[]");
                const productIndex = listSelectCart.findIndex((product: any) => product._id == productId);
                if (productIndex !== -1) {
                    listSelectCart.splice(productIndex, 1);
                    localStorage.setItem("listSelectCart", JSON.stringify(listSelectCart));
                    state.listProductBuy = listSelectCart;
                }
            }
            else {
                const productId = action.payload;
                const updatedCartAccount = state.cartAccount.filter((item: any) => item._id !== productId);
                state.cartAccount = updatedCartAccount;
                localStorage.setItem("cartNoAccount", JSON.stringify(updatedCartAccount));

                const listSelectCart = JSON.parse(localStorage.getItem("listSelectCart") || "[]");
                const productIndex = listSelectCart.findIndex((product: any) => product._id == productId);
                if (productIndex !== -1) {
                    listSelectCart.splice(productIndex, 1);
                    localStorage.setItem("listSelectCart", JSON.stringify(listSelectCart));
                    state.listProductBuy = listSelectCart;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCart.fulfilled, (state, action) => {
            state.carts = action?.payload.carts
        })
    }
})

export const { actions } = cartSlice

export default cartSlice.reducer