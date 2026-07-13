import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stores: [],
    currentStore: null,
    storeProducts: []
}

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {

        setStores: (state, action) => {
            state.stores = action.payload
        },

        setCurrentStore: (state, action) => {
            state.currentStore = action.payload
        },

        clearCurrentStore: (state) => {
            state.currentStore = null,
            state.storeProducts = []
        },
        
        setStoreProduct: (state, action) => {
            state.storeProducts = action.payload
        }
        
    }
})

export const { setStores, setCurrentStore, clearCurrentStore, setStoreProduct } = storeSlice.actions
export default storeSlice.reducer