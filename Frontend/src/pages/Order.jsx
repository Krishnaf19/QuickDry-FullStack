import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../features/orderSlice";
import { getUserOrder } from "../api/order.api";

function MyOrders() {

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const response = await getUserOrder();
        dispatch(setOrders(response || []));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();

  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto py-28 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold">
                    Order ID
                  </h2>

                  <p>{order._id}</p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    {order.orderStatus}
                  </p>

                  <p>
                    {order.paymentStatus}
                  </p>

                </div>

              </div>

              <hr className="my-5"/>

              {order.items.map((item) => (

                <div
                  key={item.product._id}
                  className="flex justify-between py-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.product.itemName}
                    </h3>

                    <p>
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <h3>
                    ₹{item.product.price}
                  </h3>

                </div>

              ))}

              <hr className="my-5"/>

              <div className="flex justify-between font-bold text-xl">

                <h2>Total</h2>

                <h2>
                  ₹{order.totalPrice}
                </h2>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyOrders;