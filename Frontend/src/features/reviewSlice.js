import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentReview: null,
    storeReviews: []
}

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {

        setCurrentReview: (state, action) => {
            state.currentReview = action.payload
        },

        clearCurrentReview: (state) => {
            state.currentReview = null
        },

        setStoreReviews: (state, action) => {
            state.storeReviews = action.payload
        }
    }
})

export const { setCurrentReview, clearCurrentReview, setStoreReviews } = reviewSlice.actions
export default reviewSlice.reducer