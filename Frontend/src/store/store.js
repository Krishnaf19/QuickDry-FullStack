import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import cartReducer from "../features/cartSlice"
import orderReducer from "../features/orderSlice"
import productReducer from "../features/productSlice"
import reviewReducer from "../features/reviewSlice"
import storeReducer from "../features/storeSlice"
import userReducer from "../features/userSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        product: productReducer,
        review: reviewReducer,
        store: storeReducer,
        user: userReducer
    }
})

export default store
