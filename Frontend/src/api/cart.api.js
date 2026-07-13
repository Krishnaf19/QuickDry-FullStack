import axiosInstance from  "./axios"

export const getUserCart = async () => {
    const response = await axiosInstance.get("/cart/")
    return response.data?.data
}

export const addItem = async (productId) => {
    const response = await axiosInstance.post(`/cart/add/${productId}`)
    return response.data?.data
}

export const removeItem = async (productId) => {
    const response = await axiosInstance.delete(`/cart/remove/${productId}`)
    return response.data?.data
}

export const increaseQuantity = async (productId) => {
    const response = await axiosInstance.patch(`/cart/increase/${productId}`)
    return response.data?.data
}

export const decreaseQuantity = async (productId) => {
    const response = await axiosInstance.patch(`/cart/decrease/${productId}`)
    return response.data?.data
}

export const clearCart = async () => {
    const response = await axiosInstance.delete("/cart/clear")
    return response.data?.data
}