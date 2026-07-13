import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from "../../api/auth.api"

function LogoutBtn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        logoutUser()
            .then(() => {
                dispatch(logout())
                navigate("/login")
            })

    }

    return (
        <button
            className='px-5 py-2 text-white font-medium bg-red-500/70 hover:bg-red-500/80 rounded-lg transition-all duration-300 text-sm ring-1 ring-red-400/50 hover:ring-red-300/70 hover:scale-105 transform'
            onClick={logoutHandler}

        >Logout</button>

    )
}

export default LogoutBtn
