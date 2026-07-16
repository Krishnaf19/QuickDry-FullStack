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
import Stores from "./pages/Stores";
import StoresProduct from "./pages/StoresProduct";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Order from "./pages/Order"
import Profile from "./pages/Profile";
import Protected from "./components/Protected/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />
      },

      {
        path: "/signup",
        element: <Signup />
      },

      {
        path: "/",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },

      {
        path: "/stores",
        element: (
          <Protected>
            <Stores />
          </Protected>
        ),
      },

      {
        path: "/stores/:storeId",
        element: (
          <Protected>
            <StoresProduct />
          </Protected>
        ),
      },

      {
        path: "/products",
        element: (
          <Protected>
            <Products />
          </Protected>
        ),
      },

      {
        path: "/products/:productId",
        element:(
          <Protected>
            <ProductDetails />
          </Protected>
        ),
      },

      {
        path: "/cart",
        element:(
          <Protected>
            <Cart />
          </Protected>
        )
      },

      {
        path: "/my-orders",
        element: (
          <Protected>
            <Order />
          </Protected>
        )
      },

      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        )
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