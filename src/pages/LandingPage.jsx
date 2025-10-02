import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden h-screen  flex items-center justify-center ">
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
