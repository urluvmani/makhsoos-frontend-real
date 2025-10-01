import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 // context/CartContext.jsx

const addToCart = (item) => {
  const qtyToAdd = Math.max(1, Number(item.qty) || 1); // respect selected qty

  setCart((prev) => {
    const idx = prev.findIndex(
      (p) =>
        p._id === item._id &&
        p.size === item.size &&
        p.color === item.color
    );

    if (idx !== -1) {
      // already in cart -> increase by selected qty
      const updated = [...prev];
      updated[idx] = { ...updated[idx], qty: updated[idx].qty + qtyToAdd };
      return updated;
    }

    // new line item -> use selected qty
    return [...prev, { ...item, qty: qtyToAdd }];
  });
};


const removeFromCart = (id, size, color) => {
  setCart((prev) => prev.filter(
    (i) => !(i._id === id && i.size === size && i.color === color)
  ));
};

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
