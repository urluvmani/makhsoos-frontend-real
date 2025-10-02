import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 md:px-12 py-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Our Premium Collection
        </h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-3 rounded-full"></div>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Explore luxury, style, and comfort – designed for modern gentlemen.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
        />
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="transform  transition-transform duration-300"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
