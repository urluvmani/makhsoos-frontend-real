import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../services/productService";

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

    setForm({ name: "", price: "", size: "", color: "", description: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Images (comma separated URLs)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Sizes (comma separated)"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Colors (comma separated)"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p._id} className="border p-2 flex justify-between">
            <span>
              {p.name} - Rs.{p.price}
            </span>
            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
