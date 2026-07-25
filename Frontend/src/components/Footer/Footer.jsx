import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterestP, FaLinkedinIn, FaGooglePlay, FaApple, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDinersClub, FaUniversity, FaWallet } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 md:px-6 md:py-14">

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">

          <div>
            <h3 className="font-bold text-black mb-4">Corporate</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-black transition">About Us</Link></li>
              <li><Link to="/governance" className="text-gray-600 hover:text-black transition">Corporate Governance</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-black transition">QuickDry in the News</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-black transition">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-black mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/offers" className="text-gray-600 hover:text-black transition">Explore Offers</Link></li>
              <li><Link to="/plans" className="text-gray-600 hover:text-black transition">Subscription Plans</Link></li>
              <li><Link to="/stores" className="text-gray-600 hover:text-black transition">Discover Our Stores</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-black transition">Check Out Our Blog</Link></li>
              <li><Link to="/stores" className="text-gray-600 hover:text-black transition">Find a Store</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-black mb-4">Partner With Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/list-your-store" className="text-gray-600 hover:text-black transition">List Your Store</Link></li>
              <li><Link to="/franchise" className="text-gray-600 hover:text-black transition">Become a Franchisee</Link></li>
              <li><Link to="/delivery-partner" className="text-gray-600 hover:text-black transition">Become a Delivery Partner</Link></li>
              <li><Link to="/vendor-policies" className="text-gray-600 hover:text-black transition">Our Vendor Policies</Link></li>
              <li><Link to="/vendor-login" className="text-gray-600 hover:text-black transition">Vendor Dashboard Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-black mb-4">Need Help?</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="text-gray-600 hover:text-black transition">FAQs</Link></li>
              <li><Link to="/policies" className="text-gray-600 hover:text-black transition">Policies</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-black transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-black mb-4">Care You Can Trust</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Eco-Friendly Detergents</li>
              <li>Certified Hygienic Process</li>
              <li>Contactless Delivery</li>
              <li>Damage Protection Guarantee</li>
            </ul>

            <h3 className="font-bold text-black mt-6 mb-3">Download our App</h3>
            <div className="flex flex-col gap-2 max-w-xs">
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

        <div className="grid gap-10 md:grid-cols-3 mt-14">

          <div>
            <h3 className="font-bold text-black mb-3">Popular Services</h3>
            <p className="text-sm text-gray-600 leading-7">
              Wash & Fold, Dry Cleaning, Ironing, Stain Removal, Shoe Cleaning,
              Carpet Cleaning, Curtain Cleaning, Blanket Cleaning, Uniform
              Cleaning, Leather Care, Sofa Cleaning, Express Delivery.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-black mb-3">Popular Brands We Use</h3>
            <p className="text-sm text-gray-600 leading-7">
              Surf Excel, Ariel, Tide, Rin, Ghadi, Ezee, Woolite, Vanish,
              Comfort, Henko, Persil, Nirma.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-black mb-3">Popular Cities</h3>
            <p className="text-sm text-gray-600 leading-7">
              Bengaluru, Mumbai, Navi Mumbai, Delhi, Hyderabad, Pune, Chennai,
              Gurgaon, Kolkata, Noida, Goa, Ghaziabad, Faridabad, Jaipur,
              Lucknow, Kochi, Visakhapatnam, Chandigarh, Vadodara, Nagpur,
              Thiruvananthapuram, Indore, Mysore, Bhopal, Surat, Patna,
              Ludhiana, Ahmedabad, Nashik, Aurangabad.
            </p>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h3 className="font-bold text-black mb-4">We accept</h3>
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
            <h3 className="font-bold text-black mb-4">
              Like What You See? Follow us Here
            </h3>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaYoutube className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaPinterestP className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

        </div>

      </div>

      <div className="border-t border-gray-200 py-5">
        <p className="text-center text-sm text-gray-600">
          Copyright © {new Date().getFullYear()} QuickDry | Website build by Krishna Sonker
        </p>
      </div>
    </footer>
  );
}

export default Footer;