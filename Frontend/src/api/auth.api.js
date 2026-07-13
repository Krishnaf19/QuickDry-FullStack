import axiosInstance from "./axios"

export const registerUser = async (formData) => {
   const response = await axiosInstance.post("/user/register", formData)
   return response.data?.data
}

export const loginUser = async (credentials) => {
   const response = await axiosInstance.post("/user/login", credentials)          
   return response.data?.data
}

export const logoutUser = async () => {
   const response = await axiosInstance.post("/user/logout")
   return response.data?.data
}

export const refreshAccessToken = async () => {
   const response = await axiosInstance.post("/user/refresh-token")
   return response.data?.data
}

