import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { FaHome, FaStore, FaShoppingCart, FaUser, FaClipboardList } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  const role = user?.role;

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Stores",
      slug: "/stores",
      active: true,
    },
    {
      name: "Cart",
      slug: "/cart",
      active: true,
    },
    {
      name: "Orders",
      slug: "/my-orders",
      active: true,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: true,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="items-center">
          <h1 className="text-2xl text-black font-bold">
            QuickDry
          </h1>
        </Link>

        <nav className="text-xl hidden md:flex items-center gap-8">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="text-[13px] font-medium tracking-[0.08em] uppercase text-gray-500 hover:text-black transition-colors"
                >
                  {item.name}
                </button>
              )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!authStatus && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-xs font-medium tracking-[0.05em] uppercase text-gray-600 hover:text-black transition-colors px-2"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-black text-white text-xs font-semibold uppercase tracking-[0.05em] px-4 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Sign up
              </button>
            </>
          )}

          {authStatus && <LogoutBtn />}
        </div>
      </div>
    </header>

    
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <nav className="bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-between px-3 py-2">
          <Link to="/" className="flex-1 text-center text-gray-700 hover:text-black py-2">
            <FaHome className="mx-auto" />
            <span className="text-[10px] block">Home</span>
          </Link>
          <Link to="/stores" className="flex-1 text-center text-gray-700 hover:text-black py-2">
            <FaStore className="mx-auto" />
            <span className="text-[10px] block">Stores</span>
          </Link>
          <Link to="/cart" className="flex-1 text-center text-gray-700 hover:text-black py-2">
            <FaShoppingCart className="mx-auto" />
            <span className="text-[10px] block">Cart</span>
          </Link>
          <Link to="/my-orders" className="flex-1 text-center text-gray-700 hover:text-black py-2">
            <FaClipboardList className="mx-auto" />
            <span className="text-[10px] block">Orders</span>
          </Link>
          <Link to="/profile" className="flex-1 text-center text-gray-700 hover:text-black py-2">
            <FaUser className="mx-auto" />
            <span className="text-[10px] block">Profile</span>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Header;