import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const agregar = (producto) => {
    setCart(prev => {
      const existe = prev.find(p => p.nombre === producto.nombre);
      if (existe) {
        return prev.map(p => 
          p.nombre === producto.nombre 
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  };

  const quitar = (producto) => {
    setCart(prev => {
      const existe = prev.find(p => p.nombre === producto.nombre);
      if (existe && existe.quantity > 1) {
        return prev.map(p => 
          p.nombre === producto.nombre 
            ? { ...p, quantity: p.quantity - 1 }
            : p
        );
      }
      return prev.filter(p => p.nombre !== producto.nombre);
    });
  };

  const vaciarCarrito = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, agregar, quitar, vaciarCarrito, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
