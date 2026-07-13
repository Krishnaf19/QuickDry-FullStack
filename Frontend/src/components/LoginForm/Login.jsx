import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../features/authSlice'
import { Button, Input } from "../index"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { loginUser} from '../../api/auth.api'
import { getCurrentUser } from '../../api/user.api'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  

  const login = async (data) => {
    setError("")
    try {
      const session = await loginUser(data)
      if (session) {
        const userData = await getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.response?.data?.message ||
        error.message ||
        "Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white py-12">
      <div className={`mx-auto w-full max-w-lg bg-white rounded-lg p-10 shadow-sm border border-gray-200`}>
        <div className="mb-8 flex justify-center transform hover:scale-110 transition-transform duration-300">
          <span className="inline-block w-full max-w-20 text-2xl font-bold text-blue-600">
            Laundry
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-gray-900">Sign In</h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700"
          >
            Create one
          </Link>
        </p>
        {error && <p className="text-red-600 mt-6 text-center font-medium text-sm">{error}</p>}


        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              {...register("email", {              //register name must be same as type of input
                required: "Email is required",
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Sign In
            </Button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default Login

