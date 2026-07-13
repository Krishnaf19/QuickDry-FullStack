import axiosInstance from "./axios"

export const getAllStore = async () => {
    const response = await axiosInstance.get("/store/");
    console.log("Full response:", response.data);
    return response.data?.data;
}
export const getStoreById = async (storeId) => {
    const response = await axiosInstance.get(`/store/${storeId}`)
   return response.data?.data
}

export const getStoresProduct = async (storeId) => {
    const response = await axiosInstance.get(`/store/${storeId}/products`);
    console.log(response.data);
    
    return response.data?.data
}

export const createStore = async (data) => {
    const response = await axiosInstance.post("/store/", data)
    return response.data?.data
}

export const updateStore = async (data) => {
    const response = await axiosInstance.patch("/store/", data)
    return response.data?.data
}

export const deleteStore = async () => {
    const response = await axiosInstance.delete(`/store/`)
    return response.data
}