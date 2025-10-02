import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } = await getProduct(id);
    setProduct(data);

    // Defaults
    if (data.sizes?.length) setSelectedSize(data.sizes[0]);
    if (data.colors?.length) setSelectedColor(data.colors[0]);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      qty,
    });

    alert("Item added to cart!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col pt-20 md:pt-0 md:flex-row gap-6">
      {/* Images */}
      <div className="flex gap-3 overflow-x-auto mb-4 overflow-hidden">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name}-${idx}`}
            className="w-32 h-32 object-cover rounded border border-yellow-500"
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="text-2xl dark:text-yellow-600 font-bold mb-2">{product.name}</h2>
        <p className="text-xl text-blue-600 dark:text-white mb-4">Rs. {product.price}</p>
        <p className="mb-4">{product.description}</p>

        {/* Size Selection */}
        {product.sizes?.length > 0 && (
          <div className="mb-3">
            <label className="font-semibold mr-2">Size:</label>
            <select
              className="border p-2"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Color Selection */}
        {product.colors?.length > 0 && (
          <div className="mb-3">
            <label className="font-semibold mr-2">Color:</label>
            <select
              className="border p-2"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mb-3">
          <label className="font-semibold mr-2">Quantity:</label>
          <input
            type="number"
            min="1"
            className="border p-2 w-20"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-green-600 dark:bg-yellow-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
