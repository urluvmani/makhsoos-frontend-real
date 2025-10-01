import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Makhsoos Store</h1>
      <p className="text-lg text-gray-600 mb-6">Premium Men’s Clothing Collection</p>
      <Link
        to="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default LandingPage;
