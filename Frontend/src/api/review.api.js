import axiosInstance from "./axios"

export const getStoreReviews = async (storeId) => {
    const response = await axiosInstance.get(`/review/store/${storeId}`)
    return response.data?.data 
}

export const createReview = async (storeId, data) => {
    const response = await axiosInstance.post(`/review/store/${storeId}`, data)
    return response.data?.data
}

export const updateReview = async (reviewId, data) => {
    const response = await axiosInstance.patch(`/review/${reviewId}`, data)
    return response.data?.data
}

export const deleteReview = async (reviewId) => {
    const response = await axiosInstance.delete(`/review/${reviewId}`)
    return response.data
}