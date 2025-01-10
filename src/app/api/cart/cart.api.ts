import { axiosPrivate } from "../configHttp"

export const addProductToCarts = async (data: any) => {
    return await axiosPrivate.post("/cart/add", data)
}

export const UpdateProductToCart = async (data: any) => {
    return await axiosPrivate.post("/cart/edit", data)
}

export const deleteProductToCart = async (productId: any) => {
    return await axiosPrivate.delete("/cart/" + productId)
}