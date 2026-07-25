import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaStar, FaMapMarkerAlt, FaPhone, FaCheckCircle } from "react-icons/fa"
import ProductCard from "../components/ProductCard/ProductCard"
import { getStoreById, getStoresProduct } from "../api/store.api"
import { getStoreReviews } from "../api/review.api"

function StoresProduct() {
  const { storeId } = useParams()

  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    loadStore()
    loadProducts()
    loadReviews()
  }, [storeId])

  const loadStore = async () => {
    try {
      const data = await getStoreById(storeId)
      setStore(data)
    } catch (error) {
      throw error
    }
  }

  const loadProducts = async () => {
    try {
      const data = await getStoresProduct(storeId)
      setProducts(data)
    } catch (error) {
      throw error
    }
  }

  const loadReviews = async () => {
    try {
      const data = await getStoreReviews(storeId)
      setReviews(data)
    } catch (error) {
      throw error
    }
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 font-medium">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3  mt-15 pb-20 ">
          <div className="lg:col-span-1 lg:sticky lg:top-35 lg:self-start mr-30">
            <div className="relative shrink-0">
              <img
                src={store.owner?.image}
                alt={store.storeName}
                className="w-full h-60 rounded-2xl object-cover border border-gray-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-5">
              <h1 className="text-2xl font-bold text-black tracking-tight">
                {store.storeName}
              </h1>
            </div>

            <p className="text-gray-500 mt-3 leading-relaxed text-sm">
              {store.description}
            </p>

            <div className="mt-5 space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <span>Location - {store.address}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-8 py-5 border-y border-gray-100">
              <div>
                <p className="text-lg font-bold text-black">{products.length}</p>
                <p className="text-xs text-gray-400 font-medium">Services</p>
              </div>
              <div>
                <p className="text-lg font-bold text-black">{reviews.length}</p>
                <p className="text-xs text-gray-400 font-medium">Reviews</p>
              </div>
              <div>
                <p className="text-lg font-bold text-black">
                  {store.averageRating?.toFixed(1) || "0.0"}
                </p>
                <p className="text-xs text-gray-400 font-medium">Avg Rating</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-black mb-1">Customer Reviews</h2>
              <p className="text-xs text-gray-400 font-medium mb-5">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>

              {reviews.length === 0 ? (
                <p className="text-gray-400 text-sm">No Reviews Yet</p>
              ) : (
                <div className="max-h-80 overflow-y-auto pr-2 divide-y divide-gray-100">
                  {reviews.map((review) => (
                    <div key={review._id} className="py-4 first:pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={review.user?.image}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <p className="font-semibold text-black text-sm truncate">
                            {review.user?.fullName}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-black shrink-0 ml-2">
                          <FaStar className="text-black" size={11} />
                          {review.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
                  What we offer
                </p>
                <h2 className="text-3xl font-bold text-black tracking-tight">
                  Laundry Services
                </h2>
              </div>

            </div>

            {products.length === 0 ? (
              <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-400 font-medium">No Services Available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default StoresProduct