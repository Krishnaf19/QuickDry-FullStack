import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../features/orderSlice";
import { getUserOrder } from "../api/order.api";

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrder();
        dispatch(setOrders(response));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto py-15 px-6">

      <h1 className="text-4xl font-bold text-black">My Orders</h1>
      <p className="mt-2 text-gray-500">
        Track your laundry orders and view past service history below.
      </p>

      {orders.length === 0 ? (
        <p className="mt-10 text-gray-500">No Orders Found</p>
      ) : (
        <div className="mt-10 space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-gray-200 overflow-hidden">

              <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap gap-12 text-sm">
                  <div>
                    <p className="text-gray-400">Order Date</p>
                    <p className="font-medium text-black">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Scheduled Dropoff</p>
                    <p className="font-medium text-black">
                      {order.scheduledDate ? new Date(order.scheduledDate).toLocaleDateString() : "Not scheduled"}
                    </p>
                    {order.scheduledSlot && (
                      <p className="text-xs text-gray-400">{order.scheduledSlot}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-400">Total Amount</p>
                    <p className="font-medium text-black">₹{order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Payment</p>
                    <p className="font-medium text-black">{order.status}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>

              <div className="px-6 pt-4">
                <p className="font-semibold text-black">{order.orderStatus}</p>
              </div>

              <div className="px-6 py-4 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.product._id} className="flex items-center gap-4 py-4">
                    <img
                      src={item.product.avatar}
                      alt={item.product.itemName}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{item.product.itemName}</h3>
                      <p className="text-sm text-gray-400">{item.product.category}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-black">₹{item.product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Order