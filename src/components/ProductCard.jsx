import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <img
  src={product.images?.[0] || "https://via.placeholder.com/250"}
  alt={product.name}
  className="w-full h-48 object-cover rounded mb-3"
/>

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-blue-600 font-bold">Rs. {product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
