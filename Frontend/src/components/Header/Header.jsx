import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

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
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="items-center">
          <h1 className="text-2xl text-black font-bold">
            QuickDry
          </h1>
        </Link>

        {/* Center nav - plain text, uppercase, tracked out, like the reference */}
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!authStatus && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:inline-block text-xs font-medium tracking-[0.05em] uppercase text-gray-600 hover:text-black transition-colors px-2"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-black text-white text-xs font-semibold uppercase tracking-[0.05em] px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Sign up
              </button>
            </>
          )}

          {authStatus && <LogoutBtn />}
        </div>
      </div>
    </header>
  );
}

export default Header;