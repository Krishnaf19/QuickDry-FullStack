import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },

        clearCurrentUser: (state) => {
            state.currentUser = null
        },

        setUsers: (state, action) => {
            state.users = action.payload
        },

        updateRole: (state, action) => {
            state.users = state.users.map(user =>
                user._id === action.payload._id
                    ? action.payload : user)
        },

        clearUser: (state, action) => {
            state.users = state.users.filter(user =>
                user._id !== action.payload)
        }

    }
})

export const { setCurrentUser, clearCurrentUser, setUsers, updateRole, clearUser } = userSlice.actions
export default userSlice.reducer