import React, { useEffect, useState } from "react"
import { getUserCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../api/cart.api"
import { createRazorpayOrder, verifyPayment } from "../api/payment.api"
import { FaTrash, FaLock, FaCalendarAlt } from "react-icons/fa"

const SLOTS = ["Morning (8AM - 11AM)", "Afternoon (12PM - 3PM)", "Evening (4PM - 7PM)"]
const today = new Date().toISOString().split("T")[0]

function Cart({ user }) {

  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [date, setDate] = useState(today)
  const [slot, setSlot] = useState(SLOTS[0])

  useEffect(() => {
    document.body.appendChild(Object.assign(document.createElement("script"), {
      src: "https://checkout.razorpay.com/v1/checkout.js",
    }))
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

  const update = async (fn, id) => {
    try {
      await fn(id)
      fetchCart()
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  const handlePayment = async () => {
    setPaying(true)
    try {
      const order = await createRazorpayOrder({ scheduledDate: date, scheduledSlot: slot })

      new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "QuickDry",
        theme: { color: "#000000" },
        prefill: { name: user?.fullName, email: user?.email, contact: user?.phoneNumber },
        handler: async (response) => {
          await verifyPayment(response)
          await fetchCart()
          alert("Payment successful — your pickup is scheduled!")
        },
      }).open()
    } catch (error) {
      alert(error.response?.data?.message || "Payment failed. Please try again.")
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center bg-white text-gray-400">Loading cart...</div>
  }

  const items = cart.items || []
  const totalPrice = cart.totalPrice ?? items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const totalQuantity = cart.totalQuantity ?? items.reduce((s, i) => s + i.quantity, 0)

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
        <h1 className="text-3xl font-bold text-black mb-2">Shopping Cart</h1>
        <p className="text-gray-500">Add product to cart and check more laundry</p>

        <div className="grid lg:grid-cols-3 gap-8 items-start mt-10">

          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6">
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
                    <span className="font-semibold text-black">₹{item.product.price * item.quantity}</span>
                    <button onClick={() => update(removeItem, item.product._id)} className="text-gray-400 hover:text-red-500">
                      <FaTrash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => update(clearCart)} className="mt-6 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800">
              Clear Cart
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

            <h3 className="flex items-center gap-2 text-sm font-semibold text-black mb-3">
              <FaCalendarAlt size={13} /> Scheduled Dropoff
            </h3>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-black"
            />

            <div className="flex flex-col gap-2 mb-6">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`text-sm text-left px-3 py-2 rounded-lg border ${
                    slot === s ? "border-black bg-black text-white font-medium" : "border-gray-200 text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

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
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              <FaLock size={12} />
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