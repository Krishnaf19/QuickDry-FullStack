import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { addItem } from "../api/cart.api";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [adding, setAdding] = useState(false);
  const [cartMessage, setCartMessage] = useState(null); // { type: "success" | "error", text: string }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response);
      } catch (err) {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleaddItem = async () => {
    setAdding(true);
    setCartMessage(null);
    try {
      await addItem(product._id, 1);
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-center text-red-600 font-semibold">{error || "Product not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-28">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-100">
            <img
              src={product.avatar}
              alt={product.itemName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-gray-900">{product.itemName}</h1>
            <p className="mt-4 text-gray-600">{product.category}</p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">Price</p>
                <p className="text-3xl font-semibold text-blue-600">₹{product.price}</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">Status</p>
                <p className={`font-semibold ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>
                  {product.isAvailable ? "Available" : "Unavailable"}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">Description</p>
                <p className="mt-2 text-gray-700">{product.description || "No description available."}</p>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={handleaddItem}
                disabled={!product.isAvailable || adding}
                className={`w-full rounded-xl px-6 py-3 text-white font-semibold transition ${
                  !product.isAvailable
                    ? "bg-gray-300 cursor-not-allowed"
                    : adding
                    ? "bg-blue-400 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {!product.isAvailable
                  ? "Currently Unavailable"
                  : adding
                  ? "Adding..."
                  : "Add to Cart"}
              </button>

              {cartMessage && (
                <p
                  className={`mt-3 text-sm font-medium ${
                    cartMessage.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {cartMessage.text}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;