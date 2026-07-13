import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCart } from "../features/cartSlice";
import { getUserCart } from "../api/cart.api";
import { createOrder } from "../api/order.api";

function UserCart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.currentCart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getUserCart();
        dispatch(setCurrentCart(response || { items: [] }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [dispatch]);

  const placeOrder = async () => {
    try {
      await createOrder();

      const response = await getUserCart();
      dispatch(setCurrentCart(response || { items: [] }));

      alert("Order placed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-500">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          My Cart
        </h1>

        <p className="text-gray-600 mb-8">
          Store : <span className="font-semibold">{cart.store?.storeName}</span>
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-5">

            {cart.items.map((item) => (

              <div
                key={item.product._id}
                className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
              >

                <div className="flex gap-5">

                  <img
                    src={item.product.avatar}
                    alt={item.product.itemName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div>

                    <h2 className="text-xl font-semibold">
                      {item.product.itemName}
                    </h2>

                    <p className="text-gray-500">
                      {item.product.category}
                    </p>

                    {/* Quantity */}

                    <div className="flex items-center gap-3 mt-3">

                      <button className="w-8 h-8 bg-gray-200 rounded">
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button className="w-8 h-8 bg-gray-200 rounded">
                        +
                      </button>

                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <h2 className="text-xl font-bold text-blue-600">
                    ₹{item.product.price * item.quantity}
                  </h2>

                  <button className="text-red-600 mt-4 hover:underline">
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}

          <div>

            <div className="bg-white rounded-xl shadow p-6 sticky top-28">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">

                <span>Total Items</span>

                <span>{cart.totalQuantity}</span>

              </div>

              <div className="flex justify-between mb-3">

                <span>Subtotal</span>

                <span>₹{cart.totalPrice}</span>

              </div>

              <div className="flex justify-between mb-5">

                <span>Delivery</span>

                <span className="text-green-600">
                  Free
                </span>

              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold my-5">

                <span>Total</span>

                <span>₹{cart.totalPrice}</span>

              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserCart;