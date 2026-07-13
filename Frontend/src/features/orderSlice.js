import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentOrder: null,
    orders: []
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload
        },

        setOrders: (state, action) => {
            state.orders = action.payload
        }
        
    }
})

export const { setCurrentOrder, setOrders } = orderSlice.actions
export default orderSlice.reducer