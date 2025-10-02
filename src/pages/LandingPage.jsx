import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center">
      <Helmet>
        {/* ✅ Basic SEO */}
        <title>Makhsoos Store | Premium Men’s Dressing & Fashion 2025</title>
        <meta
          name="description"
          content="Shop premium men’s clothing at Makhsoos Store – formal suits, casual shirts, trousers, and stylish accessories for the modern gentleman."
        />
        <meta
          name="keywords"
          content="men's dressing, men's fashion, makhsoos store, men's clothing 2025, casual shirts, formal suits, trendy outfits"
        />
        <meta name="author" content="Makhsoos Store" />
        <meta name="robots" content="index, follow" />

        {/* ✅ Open Graph (Facebook / WhatsApp) */}
        <meta property="og:title" content="Makhsoos Store | Premium Men’s Dressing & Fashion" />
        <meta
          property="og:description"
          content="Discover men’s fashion – formal suits, casual shirts, trousers, and accessories for modern gentlemen."
        />
        <meta property="og:image" content="https://makhsoos.vercel.app/images/og-cover.jpg" />
        <meta property="og:url" content="https://makhsoos.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Makhsoos Store | Premium Men’s Dressing & Fashion" />
        <meta
          name="twitter:description"
          content="Shop men’s dressing – suits, shirts, trousers, and accessories for premium fashion."
        />
        <meta name="twitter:image" content="https://makhsoos.vercel.app/images/og-cover.jpg" />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://makhsoos.vercel.app/" />

        {/* ✅ JSON-LD Structured Data (Rich Snippets / Google Shopping) */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Makhsoos Store",
            "url": "https://makhsoos.vercel.app/",
            "description": "Premium men’s clothing store offering formal suits, casual shirts, trousers, and stylish accessories.",
            "publisher": {
              "@type": "Organization",
              "name": "Makhsoos Store",
              "logo": {
                "@type": "ImageObject",
                "url": "https://makhsoos.vercel.app/images/logo.png"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://makhsoos.vercel.app/products?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </script>
      </Helmet>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-wide leading-tight">
          Makhsoos <span className="text-yellow-500">Store</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-2xl mx-auto">
          Premium Men’s Clothing for the Modern Gentleman
        </p>

        <Link
          to="/products"
          className="inline-block bg-yellow-600 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;
