import { useEffect, useState } from "react";
import Cart from "../components/Cart";

export default function CategoriaView({ categoria }) {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((res) => res.json())
      .then((data) =>
        setProductos(
          data.filter(
            (p) => p.categoria?.toUpperCase() === categoria.toUpperCase()
          )
        )
      )
      .catch((err) => console.error("Error cargando productos:", err));
  }, [categoria]);

  const agregar = (prod) => {
    const itemExistente = cart.find((i) => i.nombre === prod.nombre);
    if (itemExistente) {
      setCart(
        cart.map((i) =>
          i.nombre === prod.nombre ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...prod, quantity: 1 }]);
    }
  };

  const quitar = (prod) => {
    const item = cart.find((i) => i.nombre === prod.nombre);
    if (item && item.quantity > 1) {
      setCart(
        cart.map((i) =>
          i.nombre === prod.nombre ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      setCart(cart.filter((i) => i.nombre !== prod.nombre));
    }
  };

  const enviarPedido = () => {
    const items = cart.map((i) => ({
      name: i.nombre,
      quantity: i.quantity,
    }));
    const total = cart.reduce((sum, i) => sum + i.precio * i.quantity, 0);

    fetch("http://127.0.0.1:5000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, total }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.status === "success") setCart([]);
      })
      .catch(() => alert("Error al enviar pedido"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-32 px-6">
      <h1 className="text-4xl font-display text-neonOrange text-center drop-shadow-[0_0_20px_#ff8c00] mb-10">
        {categoria}
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((p) => (
          <div
            key={p.nombre}
            className="bg-black/85 border-2 border-neonOrange rounded-2xl p-4 flex flex-col items-center shadow-[0_0_20px_#ff8c00] hover:scale-[1.03] transition"
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-40 h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-display text-neonOrange text-center mb-2">
              {p.nombre}
            </h3>
            <p className="text-gray-300 text-sm text-center mb-2">
              {p.descripcion}
            </p>
            <p className="text-neonRed font-bold text-lg mb-4">
              ${p.precio.toFixed(2)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => quitar(p)}
                className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
              >
                -
              </button>
              <button
                onClick={() => agregar(p)}
                className="bg-neonOrange text-black px-3 py-1 rounded-lg hover:bg-orange-400 font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <Cart
        cart={cart}
        onSend={enviarPedido}
        onClear={() => setCart([])}
        onContinue={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
