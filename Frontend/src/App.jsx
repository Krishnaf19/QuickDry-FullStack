import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/authSlice'
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from "./api/user.api"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch(() => {
        dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-4 border-t-black mx-auto"></div>
          <p className="mt-6 text-lg font-semibold text-gray-900">Loading...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch your data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App