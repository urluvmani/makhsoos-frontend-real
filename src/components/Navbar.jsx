import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-md dark:text-white fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="md:text-3xl text-2xl font-extrabold tracking-wide text-yellow-600 dark:text-yellow-500 hover:scale-105 transition-transform duration-300"
        >
          Makhsoos
          <span className="text-gray-800 dark:text-white">Store</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-lg">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            Products
          </Link>
          <Link to="/my-orders" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            My Orders
          </Link>
          <Link to="/cart" className="relative hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            <CiShoppingCart className="w-7 h-7" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white font-bold rounded-full px-2 text-xs shadow-md">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden gap-4 items-center">
          {/* Cart Icon for Mobile */}
          <Link to="/cart" className="relative hover:text-blue-600">
            <CiShoppingCart className="w-7 h-7" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white font-bold rounded-full px-2 text-xs shadow-md">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl focus:outline-none hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav (Slide Down with Animation) */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full h-fit bg-white dark:bg-neutral-900 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-[200%]"
        }`}
      >
        {/* Close Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-blue-600 dark:text-yellow-500">
            Menu
          </h2>
          <div onClick={() => setIsOpen(false)} className="text-3xl hover:text-red-600 transition-colors">
            <FiX />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 px-6 py-8 text-lg font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            Products
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            Cart
          </Link>
          <Link to="/my-orders" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
            My Orders
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
