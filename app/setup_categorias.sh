#!/bin/bash
# =======================================================
# Autoservice Liam Yahir
# Setup de vistas unificadas con fondos y carrito global
# =======================================================

echo "🚀 Configurando vistas de categorías y delivery..."

# Crear carpeta pages si no existe
mkdir -p src/pages

# ------------------------------
# CategoriaView.jsx
# ------------------------------
cat <<'EOF' > src/pages/CategoriaView.jsx
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart";

export default function CategoriaView({ categoria }) {
  const [productos, setProductos] = useState([]);
  const { cart, agregar, quitar, vaciar } = useCart();

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
        if (data.status === "success") vaciar();
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
            className="bg-black/70 border-2 border-neonOrange rounded-2xl p-4 flex flex-col items-center shadow-[0_0_20px_#ff8c00] hover:scale-[1.03] transition min-h-[340px]"
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-40 h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-display text-neonOrange text-center mb-2">
              {p.nombre}
            </h3>
            <p className="text-gray-300 text-sm text-center mb-2 h-10 overflow-hidden">
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
        onClear={vaciar}
        onContinue={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
EOF

# ------------------------------
# Rotiseria.jsx
# ------------------------------
cat <<'EOF' > src/pages/Rotiseria.jsx
import CategoriaView from "./CategoriaView";
import rotiseriaBg from "../assets/rotiseria.jpg";

export default function Rotiseria() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${rotiseriaBg})` }}
    >
      <div className="bg-black/80 min-h-screen">
        <CategoriaView categoria="ROTISERIA" />
      </div>
    </div>
  );
}
EOF

# ------------------------------
# FrutasVerduras.jsx
# ------------------------------
cat <<'EOF' > src/pages/FrutasVerduras.jsx
import CategoriaView from "./CategoriaView";
import frutasBg from "../assets/frutas-verduras.jpg";

export default function FrutasVerduras() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${frutasBg})` }}
    >
      <div className="bg-black/80 min-h-screen">
        <CategoriaView categoria="FRUTAS & VERDURAS" />
      </div>
    </div>
  );
}
EOF

# ------------------------------
# Delivery.jsx (actualizado con delivery2.png)
# ------------------------------
cat <<'EOF' > src/pages/Delivery.jsx
import deliveryImg from "../assets/delivery2.png";

export default function Delivery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-900 flex flex-col justify-center items-center text-center p-6 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-3xl text-white">
        <img
          src={deliveryImg}
          alt="LiamYa ir"
          className="mx-auto w-40 md:w-56 mb-6 drop-shadow-[0_0_30px_#F39C12] animate-pulse"
        />

        <h1 className="font-display text-5xl text-neonOrange drop-shadow-[0_0_25px_#ff8c00] mb-4">
          Delivery — <span className="text-neonRed">LiamYa ir</span>
        </h1>

        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          Tu pedido llega rápido, fresco y con una sonrisa.
          Entregamos en todo Montevideo, directamente desde{" "}
          <span className="text-neonOrange font-semibold">
            Autoservice Liam Yahir
          </span>.
        </p>

        <div className="bg-black/60 border-2 border-neonOrange rounded-2xl shadow-[0_0_25px_#ff8c00] p-6 mb-8">
          <h2 className="text-2xl font-display text-neonOrange mb-4">
            🚀 Horarios y Tarifas
          </h2>
          <ul className="text-left text-gray-300 text-lg space-y-2">
            <li>🕗 <span className="text-white font-semibold">Horario:</span> 08:00 — 23:30 todos los días</li>
            <li>💰 <span className="text-white font-semibold">Costo:</span> $50 hasta compras de $1500</li>
            <li>🎁 <span className="text-white font-semibold">Gratis</span> desde $1500 en adelante</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://wa.me/59897888728"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-black px-6 py-3 rounded-full font-bold hover:bg-green-400 transition transform hover:scale-105 shadow-[0_0_15px_#00FF7F]"
          >
            📲 Hacer Pedido por WhatsApp
          </a>

          <a
            href="/productos"
            className="bg-neonOrange text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition transform hover:scale-105 shadow-[0_0_15px_#ff8c00]"
          >
            🛒 Ver Productos
          </a>
        </div>
      </div>
    </div>
  );
}
EOF

echo "✅ Archivos actualizados correctamente:"
echo " - src/pages/CategoriaView.jsx"
echo " - src/pages/Rotiseria.jsx"
echo " - src/pages/FrutasVerduras.jsx"
echo " - src/pages/Delivery.jsx"
echo "🚀 Listo para correr: npm run dev"
