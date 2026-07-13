import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

import ProductCard from "../components/ProductCard/ProductCard";
import ReviewCard from "../components/ReviewCard/ReviewCard";

import { getStoreById, getStoresProduct } from "../api/store.api";
import { getStoreReviews } from "../api/review.api";

function StoresProduct() {
  const { storeId } = useParams();

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadStore();
    loadProducts();
    loadReviews();
  }, [storeId]);

  const loadStore = async () => {
    try {
      const data = await getStoreById(storeId);
      setStore(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getStoresProduct(storeId);
      setProducts(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await getStoreReviews(storeId);
      setReviews(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Banner */}
      <div className="h-56 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Store Info */}
        <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 -mt-24 p-8">
          <div className="flex flex-col md:flex-row gap-8">

            <div className="relative shrink-0">
              <img
                src={store.owner?.image}
                alt={store.storeName}
                className="w-56 h-56 rounded-2xl object-cover"
              />
              {/* Rating pill overlapping the image, matching homepage cards */}
              <span className="absolute -bottom-3 -right-3 flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                <FaStar className="text-yellow-400 text-xs" />
                {store.averageRating?.toFixed(1) || "0.0"}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-black tracking-tight">
                    {store.storeName}
                  </h1>
                  <p className="text-gray-500 mt-3 leading-relaxed">
                    {store.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-400" />
                  <span>{store.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black tracking-tight">
              Laundry Services
            </h2>
            <span className="text-gray-400 font-medium">
              {products.length} Services
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-400 font-medium">No Services Available</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="mt-20 pb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black tracking-tight">
              Customer Reviews
            </h2>
            <span className="text-gray-400 font-medium">
              {reviews.length} Reviews
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-14 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-400 font-medium">No Reviews Yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default StoresProduct;