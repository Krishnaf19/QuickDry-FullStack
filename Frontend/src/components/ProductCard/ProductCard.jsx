import React from "react";
import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="block group">
      {/* Image */}
      <div className="rounded-3xl overflow-hidden aspect-[4/3]">
        <img
          src={product.avatar}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title + price row */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-base font-semibold text-black line-clamp-1">
          {product.itemName}
        </h3>

        <span className="flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          ₹{product.price}
        </span>
      </div>

      {/* Category row */}
      <div className="flex items-center gap-1 mt-1">
        <FaTag size={11} className="text-gray-400" />
        <span className="text-xs text-gray-400 line-clamp-1">
          {product.category}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;