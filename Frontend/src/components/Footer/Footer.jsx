import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDinersClub,
  FaUniversity,
  FaWallet,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ---------- Top links grid ---------- */}
        <div className="grid gap-10 md:grid-cols-5">

          {/* Corporate */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Corporate</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-grey-700 hover:underline">About Us</Link></li>
              <li><Link to="/governance" className="text-grey-700 hover:underline">Corporate Governance</Link></li>
              <li><Link to="/press" className="text-grey-700 hover:underline">LaundryX in the News</Link></li>
              <li><Link to="/careers" className="text-grey-700 hover:underline">Careers</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/offers" className="text-grey-700 hover:underline">Explore Offers</Link></li>
              <li><Link to="/plans" className="text-grey-700 hover:underline">Subscription Plans</Link></li>
              <li><Link to="/stores" className="text-grey-700 hover:underline">Discover Our Stores</Link></li>
              <li><Link to="/blog" className="text-grey-700 hover:underline">Check Out Our Blog</Link></li>
              <li><Link to="/stores" className="text-grey-700 hover:underline">Find a Store</Link></li>
            </ul>
          </div>

          {/* Partner With Us */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Partner With Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/list-your-store" className="text-grey-700 hover:underline">List Your Store</Link></li>
              <li><Link to="/franchise" className="text-grey-700 hover:underline">Become a Franchisee</Link></li>
              <li><Link to="/delivery-partner" className="text-grey-700 hover:underline">Become a Delivery Partner</Link></li>
              <li><Link to="/vendor-policies" className="text-grey-700 hover:underline">Our Vendor Policies</Link></li>
              <li><Link to="/vendor-login" className="text-grey-700 hover:underline">Vendor Dashboard Login</Link></li>
            </ul>
          </div>

          {/* Need Help */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="text-grey-700 hover:underline">FAQs</Link></li>
              <li><Link to="/policies" className="text-grey-700 hover:underline">Policies</Link></li>
              <li><Link to="/contact" className="text-grey-700 hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Trust + App */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Care You Can Trust</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-grey-700">Eco-Friendly Detergents</li>
              <li className="text-grey-700">Certified Hygienic Process</li>
              <li className="text-grey-700">Contactless Delivery</li>
              <li className="text-grey-700">Damage Protection Guarantee</li>
            </ul>

            <h3 className="font-bold text-gray-900 mt-6 mb-3">Download our App</h3>
            <div className="flex flex-col gap-2 max-w-[160px]">
              <button className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2">
                <FaGooglePlay className="text-lg" />
                <span className="text-left leading-tight">
                  <span className="block text-[9px] text-gray-300">GET IT ON</span>
                  <span className="block text-xs font-semibold">Google Play</span>
                </span>
              </button>
              <button className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2">
                <FaApple className="text-lg" />
                <span className="text-left leading-tight">
                  <span className="block text-[9px] text-gray-300">Download on the</span>
                  <span className="block text-xs font-semibold">App Store</span>
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* ---------- Popular lists ---------- */}
        <div className="grid gap-10 md:grid-cols-3 mt-14">

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Popular Services</h3>
            <p className="text-sm text-grey-700 leading-7">
              Wash & Fold, Dry Cleaning, Ironing, Stain Removal, Shoe Cleaning,
              Carpet Cleaning, Curtain Cleaning, Blanket Cleaning, Uniform
              Cleaning, Leather Care, Sofa Cleaning, Express Delivery.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Popular Brands We Use</h3>
            <p className="text-sm text-grey-700 leading-7">
              Surf Excel, Ariel, Tide, Rin, Ghadi, Ezee, Woolite, Vanish,
              Comfort, Henko, Persil, Nirma.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Popular Cities</h3>
            <p className="text-sm text-grey-700 leading-7">
              Bengaluru, Mumbai, Navi Mumbai, Delhi, Hyderabad, Pune, Chennai,
              Gurgaon, Kolkata, Noida, Goa, Ghaziabad, Faridabad, Jaipur,
              Lucknow, Kochi, Visakhapatnam, Chandigarh, Vadodara, Nagpur,
              Thiruvananthapuram, Indore, Mysore, Bhopal, Surat, Patna,
              Ludhiana, Ahmedabad, Nashik, Aurangabad.
            </p>
          </div>

        </div>

        {/* ---------- Payments & Social ---------- */}
        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h3 className="font-bold text-gray-900 mb-4">We accept</h3>
            <div className="flex flex-wrap items-center gap-3 text-3xl text-gray-700">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcAmex />
              <FaCcDinersClub />
              <span className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-300 rounded-md px-3 py-2">
                RuPay
              </span>
              <FaUniversity title="Net Banking" />
              <FaWallet title="Wallets & UPI" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">
              Like What You See? Follow us Here
            </h3>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center">
                <FaYoutube className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center">
                <FaPinterestP className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-gray-300 py-5">
        <p className="text-center text-sm text-gray-600">
          Copyright © {new Date().getFullYear()} LaundryX | Website build by Krishna Sonker
        </p>
      </div>
    </footer>
  );
}

export default Footer;