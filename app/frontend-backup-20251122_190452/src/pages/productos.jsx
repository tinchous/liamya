import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Productos() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-5xl font-black text-orange-500 mb-10">Productos</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {productos.map((p) => (
          <div key={p.id} className="bg-gray-900 rounded-2xl border-4 border-orange-500 p-4">

            <img
              src={`https://res.cloudinary.com/djq691oyz/image/upload/v1763528615/${p.codigo_barra}.jpg`}
              className="w-full h-40 object-contain"
            />

            <h3 className="text-2xl font-bold mt-4">{p.nombre}</h3>
            <p className="text-xl text-green-400">${p.precio}</p>

            <button
              onClick={() => addToCart(p)}
              className="w-full bg-orange-500 hover:bg-orange-400 mt-4 p-3 rounded-xl font-black text-black"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
