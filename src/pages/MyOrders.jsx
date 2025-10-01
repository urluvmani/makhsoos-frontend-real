import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  if (orders.length === 0) return <p className="p-4">No orders placed yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Status:</b> {order.status}</p>
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
