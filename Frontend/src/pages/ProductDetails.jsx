import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getAllproduct } from "../api/product.api";
import { addItem } from "../api/cart.api";
import { FaShoppingCart, FaHeart, FaStar, FaChevronLeft } from "react-icons/fa";
import ProductCard from "../components/ProductCard/ProductCard";

function ProductDetails() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [cartMessage, setCartMessage] = useState(null); 
  const [saved, setSaved] = useState(false);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  useEffect(() => {
    loadRecommended();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductById(productId);
      setProduct(response);
    } catch (err) {
      setError("Unable to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const loadRecommended = async () => {
    try {
      const all = await getAllproduct();
      const filtered = (all || []).filter((p) => p._id !== productId);
      setRecommended(filtered.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddItem = async () => {
    setAdding(true);
    setCartMessage(null);
    try {
      await addItem(product._id);
      setCartMessage({ type: "success", text: "Added to cart." });
    } catch (err) {
      setCartMessage({
        type: "error",
        text: err.response?.data?.message || "Could not add to cart.",
      });
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <p className="text-center text-red-500 font-semibold">
          {error || "Product not found."}
        </p>
      </div>
    );
  }

  const storeInitial = product.store?.storeName?.charAt(0)?.toUpperCase() || "?";
  const thumbnails = [product.avatar];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <p className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          {" • "}
          <Link to="/products" className="hover:text-black">Services</Link>
          {" • "}
          <span className="text-black font-medium">{product.category}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  className="w-16 h-16 rounded-xl overflow-hidden border-2 border-black"
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden aspect-square">
              <img
                src={product.avatar}
                alt={product.itemName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            {product.store?.storeName && (
              <Link
                to={`/stores/${product.store._id}`}
                className="flex items-center gap-2 mb-4"
              >
                <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  {storeInitial}
                </span>
                <span className="text-sm font-semibold text-black">
                  {product.store.storeName}
                </span>
              </Link>
            )}

            <h1 className="text-3xl font-bold text-black tracking-tight">
              {product.itemName}
            </h1>
            <p className="text-gray-500 mt-1">{product.category}</p>

            {product.store?.averageRating != null && (
              <div className="flex items-center gap-1.5 mt-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={
                      i < Math.round(product.store.averageRating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
                <span className="text-sm text-gray-400 ml-1">
                  {product.store.averageRating.toFixed(1)} store rating
                </span>
              </div>
            )}

            <p className="text-3xl font-bold text-black mt-6">
              ₹{product.price}
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <p
              className={`font-semibold mt-4 text-sm ${
                product.isAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.isAvailable ? "Available" : "Unavailable"}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddItem}
                disabled={!product.isAvailable || adding}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-colors ${
                  !product.isAvailable
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : adding
                    ? "bg-gray-700 text-white cursor-wait"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <FaShoppingCart size={14} />
                {!product.isAvailable
                  ? "Currently Unavailable"
                  : adding
                  ? "Adding..."
                  : "Add to Cart"}
              </button>
            </div>

            {cartMessage && (
              <div className="mt-4 flex items-center justify-between">
                <p
                  className={`text-sm font-medium ${
                    cartMessage.type === "success" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {cartMessage.text}
                </p>

                {cartMessage.type === "success" && (
                  <Link
                    to="/cart"
                    className="text-sm font-semibold text-black underline hover:no-underline"
                  >
                    Go to Cart
                  </Link>
                )}
              </div>
            )}

            <p className="mt-6 text-sm text-gray-400 flex items-center gap-2">
              <FaChevronLeft className="rotate-180" size={10} />
              Free pickup and delivery on this service
            </p>
          </div>
        </div>

        {recommended.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-bold text-black mb-8">Recommended For You</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default ProductDetails;