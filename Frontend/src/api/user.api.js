import axiosInstance from "./axios"

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/user/current-user")
    return response.data?.data
}

export const updatePassword = async (oldPassword, newPassword) => {
    const response = await axiosInstance.patch("/user/update-password",  {oldPassword, newPassword} )
    return response.data?.data
}

export const updateAccountDetails = async (data) => {
    const response = await axiosInstance.patch("/user/update-account", data )
    return response.data?.data
}

export const updateImage = async (formData) => {
    const response = await axiosInstance.patch("/user/update-image", formData)
    return response.data?.data
}


//admin api
export const getAllUsers = async () => {
    const response = await axiosInstance.get("/user/admin/users")
    return response.data?.data
}

export const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/user/admin/users/${userId}`)
    return response.data?.data
}

export const updateRole = async (userId, role) => {
    const response = await axiosInstance.patch(`/user/admin/users/${userId}/role`, { role })
    return response.data?.data
}

export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`user/admin/users/${userId}`)
    return response.data
}