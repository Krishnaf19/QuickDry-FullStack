import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentCart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        setCurrentCart: (state, action) => {
            state.currentCart = action.payload
        },

        clearCurrentCart: (state) => {
            state.currentCart = []
        }
    }
})

export const { setCurrentCart, clearCurrentCart } = cartSlice.actions
export default cartSlice.reducer