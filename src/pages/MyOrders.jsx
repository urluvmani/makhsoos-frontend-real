import { useEffect, useState } from "react";
import { cancelOrder } from "../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const handleCancel = async (id) => {
    // ✅ Confirmation before cancel
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

  if (orders.length === 0) return <p className="p-4">No orders placed yet.</p>;

  return (
    <div className="p-4 pt-20">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <p>
              <b>Order ID:</b> {order._id}
            </p>
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
            <p>
              <b>Total:</b> Rs.{order.total}
            </p>
            <ul className="ml-4 mt-2 list-disc">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.size}/{item.color} × {item.qty}
                </li>
              ))}
            </ul>

            {/* Cancel button only if not already cancelled */}
            {order.status !== "Cancelled" && (
              <button
                onClick={() => handleCancel(order._id)}
                className="mt-3 bg-red-600 text-white px-4 py-1 rounded"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
