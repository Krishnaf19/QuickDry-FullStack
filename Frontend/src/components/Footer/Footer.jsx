import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6">

        <div className="grid gap-10 text-center sm:text-left grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-xl font-bold text-black mb-3">QuickDry</h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Trusted laundry pickup, washing, ironing and dry cleaning —
              booked online, delivered to your door.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-black mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-black transition">Home</Link></li>
              <li><Link to="/stores" className="text-gray-500 hover:text-black transition">Stores</Link></li>
              <li><Link to="/products" className="text-gray-500 hover:text-black transition">Services</Link></li>
              <li><Link to="/my-orders" className="text-gray-500 hover:text-black transition">My Orders</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-black mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cart" className="text-gray-500 hover:text-black transition">Cart</Link></li>
              <li><Link to="/profile" className="text-gray-500 hover:text-black transition">Profile</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-black transition">Login</Link></li>
              <li><Link to="/signup" className="text-gray-500 hover:text-black transition">Sign Up</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-black mb-4">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

        </div>

      </div>

      <div className="border-t border-gray-200 py-5">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} QuickDry | Website build by Krishna Sonker
        </p>
      </div>
    </footer>
  );
}

export default Footer;