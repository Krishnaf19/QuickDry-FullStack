import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from "../../api/auth.api"

function LogoutBtn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        logoutUser().then(() => {
            dispatch(logout())
            navigate("/login")
        })

    }

    return (

        <button
            onClick={logoutHandler}
            className="bg-black text-white text-xs font-semibold uppercase tracking-[0.05em] px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >Logout
        </button>

    )
}

export default LogoutBtn