import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl ">
      {/* Product Image */}
      <div className="overflow-hidden relative">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/250"}
          alt={product.name}
          className="w-full h-56 object-cover  object-[0%_32%] transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-blue-600 dark:text-yellow-500 font-bold text-base mb-4">
          Rs. {product.price}
        </p>

        {/* Button */}
        <Link
          to={`/products/${product._id}`}
          className="mt-auto inline-block text-center bg-black hover:bg-black/70 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
