import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";

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
      {/* 🔑 SEO META TAGS */}
      <Helmet>
        {/* ✅ Basic SEO */}
        <title>Shop Men’s Dressing | Premium Collection 2025 - Makhsoos Store</title>
        <meta
          name="description"
          content="Browse Makhsoos Store’s premium men’s dressing collection – formal suits, casual shirts, trousers, jackets, and stylish accessories for modern gentlemen."
        />
        <meta
          name="keywords"
          content="men's dressing, men's clothing 2025, men's suits, casual shirts, formal wear, jackets, trousers, accessories, makhsoos store collection"
        />
        <meta name="author" content="Makhsoos Store" />
        <meta name="robots" content="index, follow" />

        {/* ✅ Open Graph */}
        <meta property="og:title" content="Shop Men’s Dressing | Premium Collection 2025" />
        <meta
          property="og:description"
          content="Shop the latest collection of men’s fashion at Makhsoos Store – suits, shirts, trousers, jackets, and accessories."
        />
        <meta property="og:image" content="https://makhsoos.vercel.app/images/og-products.jpg" />
        <meta property="og:url" content="https://makhsoos.vercel.app/products" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop Men’s Dressing | Premium Collection 2025" />
        <meta
          name="twitter:description"
          content="Explore Makhsoos Store’s men’s clothing – formal suits, casual shirts, trousers, jackets, and accessories."
        />
        <meta name="twitter:image" content="https://makhsoos.vercel.app/images/og-products.jpg" />

        {/* ✅ Canonical */}
        <link rel="canonical" href="https://makhsoos.vercel.app/products" />

        {/* ✅ JSON-LD Structured Data (Product Collection) */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Makhsoos Store - Men’s Dressing Collection",
            "description": "Premium men’s fashion collection including suits, shirts, trousers, jackets, and accessories.",
            "url": "https://makhsoos.vercel.app/products",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Makhsoos Store",
              "url": "https://makhsoos.vercel.app/"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                ${products
                  .slice(0, 5) // only 5 products for SEO snippet
                  .map(
                    (p, i) => `
                  {
                    "@type": "Product",
                    "position": ${i + 1},
                    "name": "${p.name}",
                    "image": "${p.images?.[0] || ""}",
                    "description": "${p.description?.slice(0, 100) || "Premium men’s fashion product"}",
                    "brand": {
                      "@type": "Brand",
                      "name": "Makhsoos Store"
                    },
                    "offers": {
                      "@type": "Offer",
                      "priceCurrency": "PKR",
                      "price": "${p.price}",
                      "availability": "https://schema.org/InStock",
                      "url": "https://makhsoos.vercel.app/products/${p._id}"
                    }
                  }`
                  )
                  .join(",")}
              ]
            }
          }
          `}
        </script>
      </Helmet>

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
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading products...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="transform transition-transform duration-300"
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
