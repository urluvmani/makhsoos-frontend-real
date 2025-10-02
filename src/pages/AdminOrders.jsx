import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, deleteOrder, downloadReceipt } from "../services/orderService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await getOrders();
    setOrders(data);
  };

  const handleStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(id);
      fetchOrders();
    }
  };

  const handleDownloadReceipt = async (id) => {
    try {
      const pdfBlob = await downloadReceipt(id);
      const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Receipt download error:", err);
      alert("Failed to download receipt");
    }
  };

  return (
    <div className="p-6 mt-10">
      <h2 className="text-3xl font-bold dark:text-yellow-600 mb-6 text-gray-800">📦 Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl border dark:bg-black  border-gray-200 p-5 hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold dark:text-white text-gray-700">
                  {order.name}
                </h3>
                <span
                  className={`px-3 py-1  rounded-full text-sm font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Shipped"
                      ? "bg-indigo-100 text-indigo-700"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm dark:text-white text-gray-600 mb-1">
                <b>Email:</b> {order.email}
              </p>
              <p className="text-sm dark:text-white text-gray-600 mb-1">
                <b>Phone:</b> {order.phone}
              </p>
              <p className="text-sm dark:text-white text-gray-600 mb-1">
                <b>Address:</b> {order.address}
              </p>
              <p className="text-sm dark:text-white text-gray-800 font-medium mb-2">
                <b>Total:</b> Rs.{order.total}
              </p>

              <ul className="list-disc dark:text-white list-inside text-gray-600 text-sm mb-4">
                {order.items.map((i, idx) => (
                  <li key={idx}>
                    {i.name} - {i.qty} pcs
                    {i.size && <> | Size: <b>{i.size}</b></>}
                    {i.color && <> | Color: <b>{i.color}</b></>}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatus(order._id, e.target.value)}
                  className="border  border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                >
                  <option className="dark:text-white dark:bg-black/50">Pending</option>
                  <option className="dark:text-white dark:bg-black/50">Processing</option>
                  <option className="dark:text-white dark:bg-black/50">Shipped</option>
                  <option className="dark:text-white dark:bg-black/50">Delivered</option>
                  <option className="dark:text-white dark:bg-black/50">Cancelled</option>
                </select>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleDownloadReceipt(order._id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                >
                  Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
