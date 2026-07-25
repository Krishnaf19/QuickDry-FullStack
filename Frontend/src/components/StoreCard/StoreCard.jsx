import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

function StoreCard({ store, onClick }) {
  return (
    <Link to={`/stores/${store._id}`}>
      <div onClick={onClick} className="cursor-pointer group">
        <div className="rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
          <img
            src={store.owner?.image}
            alt={store.storeName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <h2 className="text-base md:text-xl font-semibold text-black">{store.storeName}</h2>

          <span className="flex items-center gap-1 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Star size={12} className="fill-white" />
            {store.averageRating}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <MapPin size={13} className="text-gray-400" />
          <span className="text-xs text-gray-400">{store.address}</span>
        </div>
      </div>
    </Link>
  );
}

export default StoreCard;