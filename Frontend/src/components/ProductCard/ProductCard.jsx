import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { addItem } from "../../api/cart.api";

function ProductCard({ product }) {
  const [status, setStatus] = useState("idle"); // idle | loading | added | error

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading") return;

    setStatus("loading");
    try {
      await addItem(product._id);
      setStatus("added");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (error) {
      console.log(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="block group">

      <div className="rounded-2xl overflow-hidden aspect-square md:aspect-[4/3]">
        <img
          src={product.avatar}
          alt={product.itemName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <h3 className="text-base md:text-lg font-bold text-black line-clamp-1">
          {product.itemName}
        </h3>

        <span className="flex items-center gap-1 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
          {product.category}
        </span>
      </div>

      <p className="mt-1.5 text-sm text-gray-400 line-clamp-1">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-base font-bold text-black">
          ₹{product.price}
        </span>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={status === "loading"}
          className={`flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
            status === "added"
              ? "scale-101"
              : status === "error"
              ? "bg-red-500 text-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {status === "added" ? (
            <FaCheck size={12} />
          ) : (
            <FaShoppingCart size={12} />
          )}
          {status === "added" ? "Added" : "Add"}
        </button>
      </div>

    </Link>
  );
}

export default ProductCard;