import axiosInstance from "./axios"

export const createRazorpayOrder = async ({ scheduledDate, scheduledSlot }) => {
    const response = await axiosInstance.post("/payment/create-order", {scheduledDate, scheduledSlot})
    return response.data?.data
}
 
export const verifyPayment = async (paymentData) => {
    const response = await axiosInstance.post("/payment/verify", paymentData)
    return response.data?.data
}