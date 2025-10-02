import { useEffect, useState } from "react";
import { cancelOrder } from "../services/orderService";
import { Helmet } from "react-helmet-async";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const { data } = await cancelOrder(id);
      const updated = orders.map((order) =>
        order._id === id ? { ...order, status: data.status } : order
      );
      setOrders(updated);
      localStorage.setItem("orders", JSON.stringify(updated));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="p-4 pt-20">
        <Helmet>
          <title>My Orders | Makhsoos Store</title>
          <meta
            name="description"
            content="Check your past and current orders at Makhsoos Store. Track status, total price, and purchased items."
          />
          <meta
            name="keywords"
            content="my orders, order history, order tracking, men’s fashion orders, makhsoos store"
          />
          <meta name="robots" content="noindex, follow" />
          {/* ✅ Noindex: Google search mein dikhne ki zaroorat nahi */}
          <meta property="og:title" content="My Orders - Makhsoos Store" />
          <meta property="og:description" content="Track your orders, check delivery status and purchase history at Makhsoos Store." />
          <meta property="og:url" content="https://makhsoos.vercel.app/my-orders" />
        </Helmet>
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-20">
      {/* 🔑 SEO META TAGS */}
      <Helmet>
        <title>My Orders | Track Men’s Fashion Purchases - Makhsoos Store</title>
        <meta
          name="description"
          content="View your order history, track delivery status, and manage your men’s fashion purchases at Makhsoos Store."
        />
        <meta
          name="keywords"
          content="my orders, order history, track orders, men’s dressing, men’s fashion purchases, makhsoos store"
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="My Orders - Makhsoos Store" />
        <meta property="og:description" content="Track your men’s clothing orders and check delivery updates at Makhsoos Store." />
        <meta property="og:url" content="https://makhsoos.vercel.app/my-orders" />
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <p><b>Order ID:</b> {order._id}</p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`${
                  order.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p><b>Total:</b> Rs.{order.total}</p>
            <ul className="ml-4 mt-2 list-disc">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.size}/{item.color} × {item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
