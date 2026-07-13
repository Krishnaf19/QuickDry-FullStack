import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineTruck, HiOutlineClock } from "react-icons/hi2";
import StoreCard from "../components/StoreCard/StoreCard";
import ProductCard from "../components/ProductCard/ProductCard";
import { getAllStore } from "../api/store.api";
import { getAllproduct } from "../api/product.api";
import img02 from "../assets/img02.jpg"
import img03 from "../assets/img03.jpg"

function Home() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadStores();
    loadProducts();
  }, []);

  const loadStores = async () => {
    try {
      const data = await getAllStore();
      setStores(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getAllproduct();
      setProducts(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">

      <section className="max-w-[1300px] mx-auto px-4 pt-5">
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[720px] flex items-center">

          <img
            src={img02}
            alt="Freshly folded laundry"
            className="absolute inset-0 w-full h-full object-fill"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/4 to-transparent " />

          <div className="relative z-10 px-8 md:px-14 py-14 max-w-lg">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-4">
              Elevate Your Laundry Day
            </p>
            <h1 className="text-xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Fresh Laundry,
              <br />
              Delivered With Care!
            </h1>
            <p className="text-gray-600 max-w-sm mb-8">
              Book washing, ironing, dry cleaning and more with trusted
              vendors near you — picked up and dropped off at your door.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/stores"
                className="bg-black text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition"
              >
                Book A Pickup Now
              </Link>
              <Link
                to="/products"
                aria-label="Browse services"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow hover:bg-black hover:text-white transition"
              >
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-xl px-7 py-4 flex items-center gap-4 max-w-xs">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Trusted Vendors</h2>
              <p className="text-xs text-gray-400">Rated by 10k+ customers</p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-[84%] mx-auto border-t border-gray-300 mt-8"></div>

      <section className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div>
          <h3 className="font-semibold flex items-center justify-center sm:justify-start gap-2">
            <HiOutlineTruck className="text-blue-600" /> Free Pickup & Delivery
          </h3>
          <p className="text-sm text-gray-500 mt-1">We collect and drop off your laundry at your door.</p>
        </div>
        <div>
          <h3 className="font-semibold flex items-center justify-center sm:justify-start gap-2">
            <HiOutlineClock className="text-blue-600" /> Support 24/7
          </h3>
          <p className="text-sm text-gray-500 mt-1">Our team is always here to help with any issue.</p>
        </div>
        <div>
          <h3 className="font-semibold flex items-center justify-center sm:justify-start gap-2">
            <HiOutlineSparkles className="text-blue-600" /> 100% Verified Vendors
          </h3>
          <p className="text-sm text-gray-500 mt-1">Every store is reviewed and rated by real customers.</p>
        </div>
      </section>

      <div className="w-[84%] mx-auto border-t border-gray-300"></div>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Stores</h2>
            <p className="text-sm text-gray-400 mt-1">Trusted laundry vendors near you</p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              aria-label="Next"
              className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>

        {stores.length === 0 ? (
          <p className="text-gray-500">No stores found</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stores.slice(0, 6).map((store) => (
              <StoreCard key={store._id} store={store} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Services</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No services found</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

    
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div className="relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=700"
              alt="Clean folded clothes"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-5 py-3 flex items-center gap-3">
              <span className="text-blue-600 font-bold text-lg">30% OFF</span>
              <span className="text-xs text-gray-500">
                On your first booking
                <br />
                Till 31 August, 2026
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-blue-700 text-white p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Never Worry About Laundry Again
            </h2>
            <p className="text-gray-300 mb-8 max-w-sm">
              Schedule a pickup in minutes, track your order in real time,
              and get fresh, folded laundry back at your door.
            </p>
            <Link
              to="/stores"
              className="inline-flex items-center gap-2 bg-black text-white-900 px-6 py-3 rounded-full font-semibold w-fit hover:bg-gray-100 transition"
            >
              Get Started <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-gray-50 p-8 text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Trusted Vendors</h3>
            <p className="mt-3 text-sm text-gray-500">
              Verified laundry stores with genuine customer reviews and ratings.
            </p>
          </div>

          <div className="rounded-3xl bg-gray-50 p-8 text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Affordable Pricing</h3>
            <p className="mt-3 text-sm text-gray-500">
              Transparent pricing with no hidden charges for every service.
            </p>
          </div>

          <div className="rounded-3xl bg-gray-50 p-8 text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Fast Service</h3>
            <p className="mt-3 text-sm text-gray-500">
              Same-day and next-day laundry service from trusted local vendors.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;