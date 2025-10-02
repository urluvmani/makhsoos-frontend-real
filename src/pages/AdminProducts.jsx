import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../services/productService";
import { Trash2, PlusCircle } from "lucide-react"; // ✅ nice icons

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    size: "",
    color: "",
    description: "",
    images: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct({
      ...form,
      sizes: form.size.split(","),
      colors: form.color.split(","),
      images: form.images.split(","),
    });

    setForm({ name: "", price: "", size: "", color: "", description: "", images: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="p-6 mt-10">
      <h2 className="text-3xl  font-bold mb-8 dark:text-yellow-500 text-gray-800">🛍 Manage Products</h2>

      {/* ✅ Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl dark:text-white dark:bg-black p-6 mb-10 space-y-5 border border-gray-200"
      >
        <h3 className="text-xl dark:text-white font-semibold text-gray-700 mb-4">➕ Add New Product</h3>

        <div className="flex flex-col gap-5">
 <div className="flex gap-5 flex-col md:flex-row">
           <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
 </div>

          <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none col-span-2"
            placeholder="Image URLs (comma separated)"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
          />
  <div className="flex gap-5 flex-col md:flex-row">
          <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Sizes (comma separated)"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          />
          <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Colors (comma separated)"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          /></div>
          <textarea
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none col-span-2"
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          <PlusCircle size={20} /> Add Product
        </button>
      </form>

      {/* ✅ Product List */}
      <div className="bg-white shadow-lg dark:bg-black rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold dark:text-white mb-6 text-gray-700">📋 Product List</h3>
        {products.length === 0 ? (
          <p className="text-gray-500 dark:text-white text-center">No products found.</p>
        ) : (
          <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p._id}
                className="border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300"
              >
                <h4 className="font-bold dark:text-white text-gray-800 text-lg mb-1">{p.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">Rs. {p.price}</p>
                <p className="text-sm text-gray-600 dark:text-white line-clamp-2 mb-3">
                  {p.description || "No description available."}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">ID: {p._id.slice(-6)}</span>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
