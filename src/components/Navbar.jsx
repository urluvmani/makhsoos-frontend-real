import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md dark:text-white dark:bg-neutral-900 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-yellow-600"
        >
          Makhsoos
          <span className="text-gray-800 dark:text-white">Store</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="dark:hover:text-yellow-300">
            Home
          </Link>
          <Link to="/products" className="dark:hover:text-yellow-300">
            Products
          </Link>
          
          <Link to="/my-orders" className="dark:hover:text-yellow-300">
            My Orders
          </Link> 
          <Link to="/cart" className="relative dark:hover:text-yellow-300 mr-5">
            <CiShoppingCart className="w-7 h-7"/>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 text-sm">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
       <div className="flex md:hidden gap-3"> 
                 <Link to="/cart" className="relative md:hidden hover:text-blue-600">
           <CiShoppingCart className="w-7 h-7"/>
            {cart.length > 0 && (
              <span className="absolute  -top-2 -right-3 bg-red-600 text-white rounded-full px-2 text-sm">
                {cart.length}
              </span>
            )}
          </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          <FiMenu />
        </button>
</div>
      </div>

      {/* Mobile Nav (Slide Down) */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-white dark:bg-neutral-900 shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600 dark:text-yellow-600">
            Menu
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 p-6 text-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 mr-5">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-blue-600 mr-5">
            Products
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="relative  mr-5hover:text-blue-600">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-sm">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/my-orders" onClick={() => setIsOpen(false)} className="hover:text-blue-600 mr-5">
            My Orders
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
