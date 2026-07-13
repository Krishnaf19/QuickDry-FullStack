import axiosInstance from "./axios"

export const createOrder = async () => {
    const response = await axiosInstance.post("/order/")
    return response.data?.data
}

export const getUserOrder = async () => {
    const response = await axiosInstance.get("/order/my-orders")
    return response.data?.data
}

export const getStoreOrder = async () => {
    const response = await axiosInstance.get("/order/store-orders")
    return response.data?.data
}

export const getOrderById = async (orderId) => {
    const response = await axiosInstance.get(`/order/${orderId}`)
    return response.data?.data
}

export const updateOrderStatus = async (orderId, data) => {
    const response = await axiosInstance.patch(`/order/${orderId}/status`, data)
    return response.data?.data
}