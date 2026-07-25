import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStores } from "../features/storeSlice";
import { getAllStore } from "../api/store.api";
import StoreCard from "../components/StoreCard/StoreCard";

function Stores() {
  const dispatch = useDispatch();

  const stores = useSelector((state) => state.store.stores);

  useEffect(() => {
    const fetchStores = async () => {
    try {
        const response = await getAllStore();

        console.log("Stores:", response);

        dispatch(setStores(response));
    } catch (error) {
        console.log(error);
    }
};

    fetchStores();
  }, [dispatch]);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Laundry Stores
        </h1>

        <p className="text-gray-600 mb-10">
          Choose a laundry store and explore its services.
        </p>

        {stores.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-lg text-gray-500">
              No stores available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stores.map((store) => (
              <StoreCard
                key={store._id}
                store={store}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Stores;