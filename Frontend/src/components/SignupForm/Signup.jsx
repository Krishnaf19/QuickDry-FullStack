import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { Button, Input } from "../index"
import React, { useState, useEffect } from 'react'
import { registerUser } from '../../api/auth.api'
import { getCurrentUser } from '../../api/user.api'

function Signup() {

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [error, seterror] = useState()
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authStatus) {
      navigate("/")
    }
  }, [authStatus, navigate])

  const signupHandleSubmit = async (data) => {
    seterror("")
    try {

      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("userAddress", data.userAddress);
      formData.append("image", data.image[0]);

      const session = await registerUser(formData);

      if (session) {
        const userData = await getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (error) {
      seterror(error.response?.data?.message ||
        error.message ||
        "Registration failed"
      )
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-12">
      <div className={`mx-auto w-full max-w-lg bg-white rounded-lg p-10 shadow-sm border border-gray-200`}>
        <div className="mb-8 flex justify-center transform hover:scale-110 transition-transform duration-300">
          <span className="inline-block w-full max-w-20 text-2xl font-bold text-blue-600">
            Laundry
          </span>
        </div>

        <h2 className="text-center text-3xl font-bold leading-tight text-gray-900">Create Account</h2>

        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center font-medium text-sm">{error}</p>}

        <form onSubmit={handleSubmit(signupHandleSubmit)} className="mb-5">
          <div className="space-y-5 mt-8">

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              autoComplete="name"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />

            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              autoComplete="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />

            <Input
              label="Address"
              placeholder="Enter your address"
              autoComplete="street-address"
              {...register("userAddress", {
                required: "Address is required",
              })}
            />

            <Input
              label="Profile Image"
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Profile image is required",
              })}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
            >
              Create Account
            </Button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup

