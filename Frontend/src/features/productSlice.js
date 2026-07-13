import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentProduct: null,
    products: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload
        },

        clearCurrentProduct: (state) => {
            state.currentProduct = null
        },

        setProducts: (state, action) => {
            state.products = action.payload
        },

        setToggle: (state, action) => {
            state.products = state.products.map(
                product => product._id === action.payload ? action.payload : product
            )
            
            if (state.currentProduct && state.currentProduct._id === action.payload._id) {
                state.currentProduct = action.payload;
            }
        }
    }

})

export const { setCurrentProduct, clearCurrentProduct, setProducts, setToggle } = productSlice.actions
export default productSlice.reducer