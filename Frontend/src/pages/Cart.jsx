import React, { useEffect, useState } from "react"
import { getUserCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../api/cart.api"
import { createOrder } from "../api/order.api"
import { FaTrash } from "react-icons/fa"

function Cart() {
  
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  const [placingOrder, setPlacingOrder] = useState(false)

  const fetchCart = async () => {
    try {
      setCart(await getUserCart())
    } catch (error) {
      setCart({ items: [] })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])


  const run = async (fn, productId) => {
    setBusyId(productId)
    try {
      await fn(productId)
      await fetchCart()
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    } finally {
      setBusyId(null)
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
      await fetchCart()
    } catch (error) {
      alert(error.response?.data?.message || "Could not clear cart")
    }
  }

  const placeOrder = async () => {
    setPlacingOrder(true)
    try {
      await createOrder()
      await fetchCart()
      alert("Order placed successfully")
    } catch (error) {
      alert(error.response?.data?.message || "Could not place order")
    } finally {
      setPlacingOrder(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-gray-400 font-medium">Loading cart...</p>
      </div>
    )
  }

  const items = cart?.items || []

  const computedQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const computedPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const totalQuantity = cart?.totalQuantity ?? computedQuantity
  const totalPrice = cart?.totalPrice ?? computedPrice

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center bg-white mt-40 mb-40">
        <h2 className="text-2xl font-semibold text-gray-400">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Browse services and add something to get started.</p>
      </div>
    )
  }

  return (
    <div className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Shopping Cart</h1>
        <p>Add product to cart and check more laundry</p>

        <div className="grid lg:grid-cols-3 gap-8 items-start mt-10">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6">
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] text-xs uppercase tracking-wide text-gray-400 font-semibold pb-4 border-b border-gray-200">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => {
                const productId = item.product._id
                const isBusy = busyId === productId

                return (
                  <div key={productId} className="grid sm:grid-cols-[2fr_1fr_1fr_auto] items-center gap-4 py-5">
                    <div className="flex items-center gap-4">
                      <img src={item.product.avatar} alt={item.product.itemName} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-semibold text-black">{item.product.itemName}</h3>
                        <p className="text-sm text-gray-400">{item.product.category}</p>
                      </div>
                    </div>

                    <div className="flex sm:justify-center">
                      <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
                        <button
                          type="button"
                          onClick={() => run(decreaseQuantity, productId)}
                          disabled={isBusy}
                          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-40">−
                        </button>
                        <span className="w-4 text-center font-medium text-black">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => run(increaseQuantity, productId)}
                          disabled={isBusy}
                          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-40">+
                        </button>
                      </div>
                    </div>

                    <div className="sm:text-right font-semibold text-black">₹{item.product.price * item.quantity}</div>

                    <div className="sm:text-right">
                      <button
                        type="button"
                        onClick={() => run(removeItem, productId)} disabled={isBusy} className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40" title="Remove item">
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <button type="button" onClick={handleClearCart} className="mt-6 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
              Clear Cart
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 sticky top-24">
            <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500"><span>Total Items</span><span className="font-medium text-black">{totalQuantity}</span></div>
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="font-medium text-black">₹{totalPrice}</span></div>
              <div className="flex justify-between text-gray-500"><span>Delivery fee</span><span className="font-medium text-green-600">Free</span></div>
            </div>

            <hr className="my-5 border-gray-100" />

            <div className="flex justify-between text-lg font-bold text-black mb-6">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button type="button" onClick={placeOrder} disabled={placingOrder} className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {placingOrder ? "Placing Order..." : "Checkout Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart