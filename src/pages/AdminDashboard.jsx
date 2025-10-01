import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <aside className="w-48 bg-gray-100 min-h-screen p-4">
        <h2 className="font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard/products" className="text-blue-600">Products</Link>
          <Link to="/admin/dashboard/orders" className="text-blue-600">Orders</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
