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

  const vaciar = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, agregar, quitar, vaciar }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
