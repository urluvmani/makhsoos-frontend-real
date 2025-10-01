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

      // Browser ke liye blob se URL banao
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
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-3 mb-3 rounded">
          <p><b>Customer:</b> {order.name} ({order.email})</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> Rs.{order.total}</p>

          <ul className="ml-4 list-disc">
            {order.items.map((i, idx) => (
              <li key={idx}>
                {i.name} - {i.qty} pcs
                {i.size && <> | Size: <b>{i.size}</b></>}
                {i.color && <> | Color: <b>{i.color}</b></>}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex items-center gap-2">
            <select
              value={order.status}
              onChange={(e) => handleStatus(order._id, e.target.value)}
              className="border p-2"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            <button
              onClick={() => handleDelete(order._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            {/* ✅ Download Receipt Button */}
            <button
              onClick={() => handleDownloadReceipt(order._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Download Receipt
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
