import axiosInstance from "./axios"

export const createRazorpayOrder = async () => {
    const response = await axiosInstance.post("/payment/create-order")
    return response.data?.data
}
 
export const verifyPayment = async (paymentData) => {
    const response = await axiosInstance.post("/payment/verify", paymentData)
    return response.data?.data
}
 