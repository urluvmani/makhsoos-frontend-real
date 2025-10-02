import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderService";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const isFormValid =
    customer.name.trim() !== "" &&
    customer.phone.trim() !== "" &&
    customer.address.trim() !== "";

  const handleOrder = async () => {
    try {
      const { data } = await placeOrder({
        ...customer,
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          size: item.size,
          color: item.color,
          qty: item.qty,
        })),
        total,
      });

      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...existing, data]));

      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      alert("Error placing order");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomer({ ...customer, phone: value });
  };

  return (
    <div className="min-h-screen pt-20 md:pb-10 px-6 md:px-12">
      {/* 🔑 SEO META TAGS */}
      <Helmet>
        {/* ✅ Basic SEO */}
        <title>Shopping Cart | Makhsoos Store</title>
        <meta
          name="description"
          content="Review your selected men’s dressing items in the shopping cart. Proceed to checkout and place your order for premium men’s fashion."
        />
        <meta
          name="keywords"
          content="men's dressing cart, checkout men's clothing, buy men's fashion online, makhsoos store shopping cart"
        />
        <meta name="robots" content="noindex, follow" />
        {/* ❌ Tip: Checkout/Cart pages ko Google par index karna zaroori nahi hota. */}

        {/* ✅ Open Graph */}
        <meta property="og:title" content="Shopping Cart | Makhsoos Store" />
        <meta
          property="og:description"
          content="Check your selected men’s fashion items and proceed to checkout."
        />
        <meta property="og:image" content="https://makhsoos.vercel.app/images/og-cart.jpg" />
        <meta property="og:url" content="https://makhsoos.vercel.app/cart" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Shopping Cart | Makhsoos Store" />
        <meta
          name="twitter:description"
          content="Your selected men’s clothing items are ready for checkout."
        />
        <meta name="twitter:image" content="https://makhsoos.vercel.app/images/og-cart.jpg" />

        {/* ✅ Canonical */}
        <link rel="canonical" href="https://makhsoos.vercel.app/cart" />

        {/* ✅ JSON-LD Breadcrumb + CartPage */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://makhsoos.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://makhsoos.vercel.app/products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Cart",
                "item": "https://makhsoos.vercel.app/cart"
              }
            ]
          }
          `}
        </script>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-black dark:text-yellow-600">
        Your Cart
      </h2>

      {cart.length === 0 && (
        <p className="text-gray-600 dark:text-white">No items in cart.</p>
      )}

      <ul className="space-y-4 mb-6">
        {cart.map((item, index) => (
          <li
            key={index}
            className="border border-black/30 dark:border-yellow-600 p-4 rounded-lg flex justify-between items-center bg-white dark:bg-neutral-900"
          >
            <div>
              <p className="font-semibold text-black dark:text-yellow-600">
                {item.name}
              </p>
              <p className="text-sm text-gray-700 dark:text-white">
                Size: <b>{item.size}</b> | Color: <b>{item.color}</b>
              </p>
              <p className="text-sm text-gray-700 dark:text-white">
                Price: Rs.{item.price} × {item.qty} ={" "}
                <b className="text-black dark:text-yellow-600">
                  Rs.{item.price * item.qty}
                </b>
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item._id, item.size, item.color)}
              className="text-black dark:text-yellow-600 font-semibold hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-black/30 dark:border-yellow-600">
          <h3 className="text-2xl font-bold mb-4 text-black dark:text-yellow-600">
            Customer Info
          </h3>

          {/* Name */}
          <label className="block mb-1 text-black dark:text-white font-semibold">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            placeholder="Name"
            required
            className="border border-black/40 dark:border-yellow-600 p-3 w-full mb-3 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />

          {/* Email */}
          <label className="block mb-1 text-black dark:text-white font-semibold">
            Email
          </label>
          <input
            placeholder="Email"
            className="border border-black/40 dark:border-yellow-600 p-3 w-full mb-3 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          {/* Phone */}
          <label className="block mb-1 text-black dark:text-white font-semibold">
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            placeholder="Phone"
            required
            inputMode="numeric"
            pattern="[0-9]*"
            className="border border-black/40 dark:border-yellow-600 p-3 w-full mb-3 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
            value={customer.phone}
            onChange={handlePhoneChange}
          />

          {/* Address */}
          <label className="block mb-1 text-black dark:text-white font-semibold">
            Address <span className="text-red-600">*</span>
          </label>
          <textarea
            placeholder="Address"
            required
            className="border border-black/40 dark:border-yellow-600 p-3 w-full mb-4 rounded bg-white dark:bg-neutral-800 text-black dark:text-white resize-none"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />

          <p className="mb-4 font-bold text-lg text-black dark:text-yellow-600">
            Total: Rs. {total}
          </p>

          <button
            onClick={handleOrder}
            disabled={!isFormValid}
            className={`w-full font-semibold py-3 rounded-lg transition-colors ${
              isFormValid
                ? "bg-black hover:bg-neutral-800 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white dark:text-black"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
