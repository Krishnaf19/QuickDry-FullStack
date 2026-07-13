import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import store from "./store/store";
import App from "./App";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Store";
import StoresProduct from "./pages/StoresProduct";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import UserCart from "./pages/UserCart";
import MyOrders from "./pages/Order";
import Profile from "./pages/Profile";
import Protected from "./components/Protected/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "stores",
        element: <Stores />,
      },

      {
        path: "stores/:storeId",
        element: <StoresProduct />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:productId",
        element: <ProductDetails />,
      },

      {
        path: "login",
        element: (
            <Login />
        ),
      },

      {
        path: "signup",
        element: (
            <Signup />
        ),
      },
      {
        path: "cart",
        element: (
          <Protected>
            <UserCart />
          </Protected>
        ),
      },

      {
        path: "my-orders",
        element: (
          <Protected>
            <MyOrders />
          </Protected>
        ),
      },

      {
        path: "profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);