import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden transition-all border border-gray-700 rounded shadow-sm hover:shadow-md  flex flex-col">
      <img
  src={product.images?.[0] || "https://via.placeholder.com/250"}
  alt={product.name}
  className="w-full h-48 object-cover rounded hover:scale-[1.04] mb-3"
/>

      <h3 className="text-lg pl-2 font-semibold">{product.name}</h3>
      <p className="text-blue-600 dark:text-white pl-2 font-bold">Rs. {product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="mt-auto bg-blue-600 md:font-semibold dark:bg-yellow-600 text-white px-4 py-2 rounded text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
