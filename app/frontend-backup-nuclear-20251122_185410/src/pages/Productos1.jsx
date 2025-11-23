// ======================================================
// Productos.jsx – Catálogo, carrito y envío de pedidos
// ======================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart";

// ------------------------------------------------------
// ⚙️ Configuración general
// ------------------------------------------------------
const API_URL = "http://127.0.0.1:5000/api";

export default function Productos() {
  // --- Estados principales ---
  const [productos, setProductos] = useState([]);
  const { cart, agregar, quitar, vaciar } = useCart();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  // --- Datos del cliente ---
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    metodoPago: "EFECTIVO",
    notas: "",
    guardar_datos: false,
    suscrito_promos: false,
  });

  // ------------------------------------------------------
  // 📦 Cargar productos desde el backend
  // ------------------------------------------------------
  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // ------------------------------------------------------
  // 💲 Calcular total del carrito
  // ------------------------------------------------------
  const calcularTotal = () =>
    cart.reduce((acc, i) => acc + i.quantity * parseFloat(i.precio), 0);

  // ------------------------------------------------------
  // 💬 Crear mensaje WhatsApp y HTML para email
  // ------------------------------------------------------
  const generarMensaje = () => {
    let mensaje = `🧾 *Nuevo Pedido - Autoservice Liam Yahir*\n\n`;
    mensaje += `👤 *Cliente:* ${cliente.nombre}\n`;
    mensaje += `📞 *Teléfono:* ${cliente.telefono}\n`;
    if (cliente.email) mensaje += `📧 *Email:* ${cliente.email}\n`;
    mensaje += `🏠 *Dirección:* ${cliente.direccion}\n`;
    mensaje += `💳 *Método de pago:* ${cliente.metodoPago}\n`;
    if (cliente.notas) mensaje += `📝 *Notas:* ${cliente.notas}\n\n`;
    mensaje += `🛍️ *Productos:*\n`;
    cart.forEach((p) => {
      mensaje += `- ${p.nombre} x${p.quantity} ($${p.precio})\n`;
    });
    mensaje += `\n💰 *Total:* $${calcularTotal().toFixed(2)}\n`;
    mensaje += `\nGracias por tu compra ❤️\nAutoservice Liam Yahir`;
    return mensaje;
  };

  const mensajeAHTML = (texto) =>
    texto.replace(/\n/g, "<br>").replace(/\*/g, "").replace(/(❤️)/g, "❤️");

  // ------------------------------------------------------
  // 🚀 Enviar pedido (backend + WhatsApp)
  // ------------------------------------------------------
  const enviarPedido = async () => {
    if (!cliente.nombre || !cliente.telefono || cart.length === 0) {
      alert("Por favor completa todos los campos y agrega productos al carrito.");
      return;
    }

    const mensajeWhatsApp = generarMensaje();
    const mensaje_html = mensajeAHTML(mensajeWhatsApp);

    // --- Abrir WhatsApp ---
    const numero = "59899882214";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(url, "_blank");

    // --- Enviar pedido al backend ---
    try {
      const res = await axios.post(`${API_URL}/pedidos`, {
        cliente,
        productos: cart,
        total: calcularTotal(),
        mensaje_html,
      });

      console.log("✅ Pedido enviado:", res.data);
      setPedidoEnviado(true);
      vaciar();
      setMostrarForm(false);
    } catch (error) {
      console.error("❌ Error enviando pedido:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  // ------------------------------------------------------
  // 🧾 Formulario del cliente
  // ------------------------------------------------------
  const FormularioPedido = () => (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border-2 border-neonOrange rounded-2xl p-6 w-[90%] max-w-md shadow-[0_0_25px_#ff8c00]">
        <h2 className="text-2xl font-display text-neonOrange mb-4 text-center">
          🧾 Datos del Cliente
        </h2>

        <div className="flex flex-col gap-3">
          {["nombre", "telefono", "email", "direccion"].map((campo) => (
            <input
              key={campo}
              type="text"
              placeholder={`${campo.charAt(0).toUpperCase() + campo.slice(1)} *`}
              className="p-2 rounded bg-black/75 border border-gray-700 text-white"
              value={cliente[campo]}
              onChange={(e) => setCliente({ ...cliente, [campo]: e.target.value })}
            />
          ))}
          <textarea
            placeholder="Notas del pedido (opcional)"
            className="p-2 rounded bg-black/75 border border-gray-700 text-white"
            value={cliente.notas}
            onChange={(e) => setCliente({ ...cliente, notas: e.target.value })}
          />
          <select
            className="p-2 rounded bg-black/75 border border-gray-700 text-white"
            value={cliente.metodoPago}
            onChange={(e) => setCliente({ ...cliente, metodoPago: e.target.value })}
          >
            <option value="EFECTIVO">Efectivo</option>
            <option value="POS">POS (Tarjeta Débito)</option>
            <option value="TRANSFERENCIA">Transferencia</option>
          </select>

          {/* ✅ Checkbox Guardar datos */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={cliente.guardar_datos}
              onChange={(e) => setCliente({ ...cliente, guardar_datos: e.target.checked })}
            />
            <span className="text-sm text-gray-300">
              Guardar mis datos para futuras compras
            </span>
          </label>

          {/* ✅ Checkbox Promociones */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={cliente.suscrito_promos}
              onChange={(e) => setCliente({ ...cliente, suscrito_promos: e.target.checked })}
            />
            <span className="text-sm text-gray-300">
              Deseo recibir promociones y ofertas
            </span>
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={enviarPedido}
            className="bg-green-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-400 transition"
          >
            Confirmar Pedido
          </button>
          <button
            onClick={() => setMostrarForm(false)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setMostrarForm(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );

  // ------------------------------------------------------
  // 🎨 Render principal
  // ------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-32 px-6">
      <h1 className="text-4xl font-display text-neonOrange text-center drop-shadow-[0_0_20px_#ff8c00] mb-10">
        Productos
      </h1>

      {/* --- Grid de productos --- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((p, idx) => (
          <div
            key={idx}
            className="bg-black/85 border-2 border-neonOrange rounded-2xl p-4 flex flex-col items-center shadow-[0_0_20px_#ff8c00] hover:scale-[1.03] transition min-h-[360px]"
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-40 h-40 object-cover rounded-lg mb-4 mt-4"
            />
            <h3 className="text-xl font-display text-neonOrange text-center mb-2">
              {p.nombre}
            </h3>
            <p className="text-neonRed font-bold text-lg mb-4">${p.precio}</p>
            <button
              onClick={() => agregar(p)}
              className="bg-neonOrange text-black px-3 py-1 rounded-lg hover:bg-orange-400 font-bold"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      {/* --- Carrito --- */}
      <Cart
        cart={cart}
        onSend={() => setMostrarForm(true)}
        onClear={vaciar}
        onContinue={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      {/* --- Formulario --- */}
      {mostrarForm && <FormularioPedido />}

      {/* --- Confirmación --- */}
      {pedidoEnviado && (
        <div className="text-center mt-6 text-green-400 font-bold text-xl animate-bounce">
          ¡Pedido enviado con éxito! 🚀
        </div>
      )}
    </div>
  );
}
