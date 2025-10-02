import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";


const Navbar = () => {
  const { cart } = useCart();
  const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-300 dark:bg-gray-800 rounded"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

  return (
    <header className="bg-white shadow-md dark:text-white dark:bg-black">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Makhsoos<span className="text-gray-800">Store</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/cart" className="relative hover:text-blue-600">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 text-sm">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/my-orders" className="hover:text-blue-600">My Orders</Link>
        <div className="p-4">
          <ThemeToggleButton />
        </div>
          
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
