import React, { useEffect, useState } from "react"
import { getUserCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../api/cart.api"
import { createRazorpayOrder, verifyPayment } from "../api/payment.api"
import { FaTrash, FaLock } from "react-icons/fa"

function Cart({ user }) {

  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)


  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    document.body.appendChild(script)
  }, [])


  const fetchCart = async () => {
    try {
      setCart(await getUserCart())
    } catch {
      setCart({ items: [] })
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchCart()
  }, [])


  const update = async (fn, productId) => {
    try {
      await fn(productId)
      fetchCart()
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    }
  }


  const handlePayment = async () => {
    setPaying(true)
    try {
      const { key, orderId, amount, currency } = await createRazorpayOrder()

      const razorpay = new window.Razorpay({
        key,
        amount,
        currency,
        order_id: orderId,
        name: "QuickDry",
        description: "Laundry service payment",
        theme: { color: "#000000" },
        prefill: {
          name: user?.fullName,
          email: user?.email,
          contact: user?.phoneNumber,
        },
        handler: async (response) => {
          try {
            await verifyPayment(response)
            await fetchCart()
            alert("Payment successful — your order has been placed!")
          } catch (error) {
            alert(error.response?.data?.message || "Payment verification failed")
          }
          setPaying(false)
        },
        modal: { ondismiss: () => setPaying(false) },
      })

      razorpay.open()
    } catch (error) {
      alert(error.response?.data?.message || "Could not start payment")
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-gray-400 font-medium">Loading cart...</p>
      </div>
    )
  }

  const items = cart.items || []
  const totalPrice = cart.totalPrice ?? items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const totalQuantity = cart.totalQuantity ?? items.reduce((sum, i) => sum + i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center bg-white mt-20 mb-20 sm:mt-40 sm:mb-40 px-4">
        <h2 className="text-2xl font-semibold text-gray-400">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Browse services and add something to get started.</p>
      </div>
    )
  }

  return (
    <div className="bg-white py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Shopping Cart</h1>
        <p className="text-gray-500">Add product to cart and check more laundry</p>

        <div className="grid lg:grid-cols-3 gap-8 items-start mt-10">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6">
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] text-xs uppercase tracking-wide text-gray-400 font-semibold pb-4 border-b border-gray-200">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.product._id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_auto] items-center gap-x-4 gap-y-3 py-5">
                  <div className="flex items-center gap-4 col-span-2 sm:col-span-1">
                    <img src={item.product.avatar} alt={item.product.itemName} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-semibold text-black">{item.product.itemName}</h3>
                      <p className="text-sm text-gray-400">{item.product.category}</p>
                    </div>
                  </div>

                  <div className="flex sm:justify-center">
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
                      <button onClick={() => update(decreaseQuantity, item.product._id)} className="w-5 h-5 text-gray-500 hover:text-black">−</button>
                      <span className="w-4 text-center font-medium text-black">{item.quantity}</span>
                      <button onClick={() => update(increaseQuantity, item.product._id)} className="w-5 h-5 text-gray-500 hover:text-black">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <span className="text-right font-semibold text-black">₹{item.product.price * item.quantity}</span>

                    <button onClick={() => update(removeItem, item.product._id)} className="text-gray-400 hover:text-red-500" title="Remove item">
                      <FaTrash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => update(clearCart)}
              className="mt-6 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 lg:sticky lg:top-24">
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

            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {paying ? "Processing..." : `Pay ₹${totalPrice}`}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              100% secure checkout — payments powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart