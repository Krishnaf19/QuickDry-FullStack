import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { Button, Input } from "../index"
import React, { useState, useEffect } from 'react'
import { registerUser } from '../../api/auth.api'
import { getCurrentUser } from '../../api/user.api'

function SignupForm() {

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authStatus) {
      navigate("/")
    }
  }, [authStatus, navigate])

  const signupHandleSubmit = async (data) => {

    setError("")

    try {
      const formData = new FormData()
      formData.append("fullName", data.fullName)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("phoneNumber", data.phoneNumber)
      formData.append("userAddress", data.userAddress)
      formData.append("image", data.image[0])

      const session = await registerUser(formData)
      if (session) {
        const userData = await getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-scree py-12">
      <div className="mx-auto w-full max-w-lg bg-white/5 border border-black/10 rounded-2xl p-10">

        <h2 className="text-center text-3xl font-bold text-black">Create Account</h2>

        <p className="mt-3 text-center text-sm text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-black inline-block transition-transform duration-300 hover:scale-95"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="text-red-400 mt-6 text-center font-medium text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(signupHandleSubmit)} className="mb-5" encType="multipart/form-data">
          <div className="space-y-5 mt-8">

            <Input
              label="Full Name"
              placeholder="Enter your name"
              autoComplete="name"
              {...register("fullName", {
                required: true,
              })}
            />

            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/.test(value) ||
                    "Email must be valid",
                },
              })}
            />

            <Input
              label="Password"
              placeholder="Enter a strong password"
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              autoComplete="tel"
              {...register("phoneNumber", {
                required: true,
              })}
            />

            <Input
              label="Address"
              placeholder="Enter your address"
              autoComplete="street-address"
              {...register("userAddress", {
                required: true,
              })}
            />

            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white file:font-semibold file:text-sm hover:scale-102 file:cursor-pointer cursor-pointer"
                {...register("image", { required: true })}
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm