import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    const { data } = await getProduct(id);
    setProduct(data);
    setPreview(data.images?.[0] || "");

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

    alert("✅ Item added to cart!");
  };

  if (!product) return <p className="pt-20 text-center">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-10 py-24 px-6 md:px-12">
      {/* 🔑 SEO META TAGS */}
      <Helmet>
        {/* ✅ Basic SEO */}
        <title>{`${product.name} | Premium Men’s Dressing - Makhsoos Store`}</title>
        <meta
          name="description"
          content={`Buy ${product.name} for just Rs. ${product.price}. ${product.description?.slice(
            0,
            150
          )} | Available in sizes ${product.sizes?.join(", ") || "Standard"} and colors ${
            product.colors?.join(", ") || "various"
          }.`}
        />
        <meta
          name="keywords"
          content={`buy ${product.name}, men's dressing, men's fashion, ${product.colors?.join(
            ", "
          )}, ${product.sizes?.join(", ")}, makhsoos store`}
        />
        <meta name="author" content="Makhsoos Store" />
        <meta name="robots" content="index, follow" />

        {/* ✅ Open Graph */}
        <meta property="og:title" content={`${product.name} | Makhsoos Store`} />
        <meta property="og:description" content={product.description?.slice(0, 150)} />
        <meta property="og:image" content={product.images?.[0] || "https://makhsoos.vercel.app/images/default-product.jpg"} />
        <meta property="og:url" content={`https://makhsoos.vercel.app/products/${product._id}`} />
        <meta property="og:type" content="product" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Makhsoos Store`} />
        <meta name="twitter:description" content={product.description?.slice(0, 150)} />
        <meta name="twitter:image" content={product.images?.[0] || "https://makhsoos.vercel.app/images/default-product.jpg"} />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href={`https://makhsoos.vercel.app/products/${product._id}`} />

        {/* ✅ JSON-LD Structured Data (Product Schema) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "${product.name}",
              "image": ${JSON.stringify(product.images || [])},
              "description": "${product.description || "Premium men’s fashion product"}",
              "sku": "${product._id}",
              "brand": {
                "@type": "Brand",
                "name": "Makhsoos Store"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://makhsoos.vercel.app/products/${product._id}",
                "priceCurrency": "PKR",
                "price": "${product.price}",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Left: Images */}
      <div className="flex-1">
        <div className="mb-4 h-[50vh] md:h-[35vw] overflow-hidden">
          <img
            src={preview}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-lg border border-gray-300 dark:border-gray-700"
          />
        </div>

        <div className="flex gap-3 py-2 md:pl-5 pl-2 overflow-x-auto">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name}-${idx}`}
              onClick={() => setPreview(img)}
              className={`w-24 h-22 object-cover rounded-lg cursor-pointer border-2 transition-transform ${
                preview === img
                  ? "border-yellow-600 dark:border-yellow-500 scale-105"
                  : "border-gray-300 dark:border-gray-700 hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex-1">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-yellow-500 mb-3">
          {product.name}
        </h2>
        <p className="text-2xl font-semibold text-yellow-600 dark:text-white mb-4">
          Rs. {product.price}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mb-4">
            <label className="font-semibold block mb-2">Size:</label>
            <div className="flex gap-3">
              {product.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedSize === s
                      ? "bg-yellow-600 text-white border-yellow-600 dark:bg-yellow-500 dark:border-yellow-500"
                      : "border-gray-400 hover:border-yellow-600 dark:hover:border-yellow-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mb-4">
            <label className="font-semibold block mb-2">Color:</label>
            <div className="flex gap-3">
              {product.colors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedColor === c
                      ? "bg-black text-white border-black dark:bg-yellow-500 dark:border-yellow-500"
                      : "border-gray-400 hover:border-black dark:hover:border-yellow-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Quantity:</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 py-1 border rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded-lg w-20 text-center py-2"
            />
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 border rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-neutral-800 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
