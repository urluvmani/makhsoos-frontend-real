import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderService";
import { useState } from "react";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

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

      // ✅ localStorage میں order history save کریں
      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...existing, data]));

      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      alert("Error placing order");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 pt-20 ">Your Cart</h2>
      {cart.length === 0 && <p>No items in cart.</p>}

      <ul className="space-y-2 mb-6">
        {cart.map((item, index) => (
          <li key={index} className="border border-gray-600 p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold dark:text-yellow-600">{item.name}</p>
              <p className="text-sm dark:text-white text-gray-600">
                Size: <b>{item.size}</b> | Color: <b>{item.color}</b>
              </p>
              <p className="text-sm dark:text-white text-gray-600">
                Price: Rs.{item.price} × {item.qty} ={" "}
                <b>Rs.{item.price * item.qty}</b>
              </p>
            </div>
           <button
  onClick={() => removeFromCart(item._id, item.size, item.color)}
  className="text-red-600"
>
  Remove
</button>

          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-2">Customer Info</h3>
          <input
            placeholder="Name"
            className="border border-gray-600 p-2 w-full mb-2"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className=" border-gray-600 border p-2 w-full mb-2"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            className="border border-gray-600 p-2 w-full mb-2"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          <textarea
            placeholder="Address"
            className="border border-gray-600 resize-none p-2 w-full mb-2"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
          <p className="mb-4 font-bold">Total: Rs. {total}</p>
          <button
            onClick={handleOrder}
            className="bg-blue-600 dark:bg-yellow-600 md:font-semibold   text-white px-6 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
