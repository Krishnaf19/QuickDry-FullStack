import axiosInstance from "./axios"

export const getAllproduct = async () => {
    const response = await axiosInstance.get("/product/")
    return response.data?.data
}

export const getProductById = async (productId) => {
    const response = await axiosInstance.get(`/product/${productId}`)
    return response.data?.data
}

export const createProduct = async (formData) => {
    const response = await axiosInstance.post("/product/", formData)
    return response.data?.data
}

export const updateProductDetails = async (productId, data) => {
    const response = await axiosInstance.patch(`/product/${productId}`, data)
    return response.data?.data
}

export const deleteProduct = async (productId) => {
    const response = await axiosInstance.delete(`/product/${productId}`)
    return response.data
}

export const toggleIsAvailable = async (productId) => {
    const response = await axiosInstance.patch(`/product/toggle-availability/${productId}`)
    return response.data?.data
}

export const updateProductAvatar = async (productId, formData) => {
    const response = await axiosInstance.patch(`/product/avatar/${productId}`, formData)
    return response.data?.data
}

