import { useState, useEffect } from "react";
import { X, User, Phone, Mail, MapPin, CreditCard, DollarSign } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/DeliveryContext";
import { useAuth } from "../context/AuthContext";

const generarOrdenId = () => `ORD-${Date.now()}`;

const calcularDelivery = (direccion) => {
  if (!direccion) return null;
  const dir = direccion.toLowerCase();
  if (dir.includes("reducto")) return 0;
  if (dir.includes("prado")) return 0;
  if (dir.includes("goes")) return 70;
  if (dir.includes("cordón")) return 80;
  return 100;
};

export default function CheckoutModal({ onClose }) {
  const { cart, vaciarCarrito } = useCart();
  const { deliveryCost, updateDelivery } = useDelivery();
  const { user } = useAuth();

  const [metodoPago, setMetodoPago] = useState("EFECTIVO");
  const [notas, setNotas] = useState("");

  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    telefono: user?.telefono || "",
    email: user?.email || "",
    direccion: user?.direccion || ""
  });

  const subtotal = cart.reduce((s, i) => s + i.precio * i.quantity, 0);
  const costoActual = deliveryCost ?? calcularDelivery(form.direccion);
  const totalFinal = subtotal + (costoActual ?? 0);

  useEffect(() => {
    if (form.direccion && form.direccion.length > 5) {
      const costo = calcularDelivery(form.direccion);
      updateDelivery(costo);
    }
  }, [form.direccion]);

  const datosCompletos =
    form.nombre.length > 2 &&
    form.telefono.length > 7 &&
    form.direccion.length > 5 &&
    costoActual !== null;

  const enviarPedido = async () => {
    if (!datosCompletos) return;

    const pedido = {
      cliente: {
        ...form,
        metodoPago,
        notas
      },
      productos: cart,
      total: totalFinal
    };

    try {
      await fetch("http://localhost:5000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      vaciarCarrito();
      onClose();
      window.location.href = "/";
    } catch (err) {
      console.error("Error:", err);
      alert("No se pudo enviar el pedido");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6">
      <div className="bg-gray-900 border-8 border-orange-500 rounded-2xl w-full max-w-4xl max-h-screen overflow-y-auto">
        
        <div className="bg-orange-600 p-6 flex justify-between items-center">
          <h2 className="text-4xl font-black text-black">FINALIZAR PEDIDO</h2>
          <button onClick={onClose}><X className="w-12 h-12 text-black" /></button>
        </div>

        <div className="p-10 space-y-10">

          {/* --- FORMULARIO --- */}
          <div className="grid md:grid-cols-2 gap-10">
            
            <div>
              <h3 className="text-3xl font-black text-orange-400 mb-4 flex items-center gap-3"><User /> Datos</h3>

              <input className="input-checkout" placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })} />

              <input className="input-checkout" placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })} />

              <input className="input-checkout" placeholder="Email (opcional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <input className="input-checkout" placeholder="Dirección completa"
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })} />

              {costoActual !== null && (
                <p className="text-green-400 text-xl mt-2">
                  Costo delivery: {costoActual === 0 ? "GRATIS" : `$${costoActual}`}
                </p>
              )}
            </div>

            {/* --- FORMA DE PAGO --- */}
            <div>
              <h3 className="text-3xl font-black text-orange-400 mb-4 flex items-center gap-3"><CreditCard /> Pago</h3>

              <label className="opcion-pago">
                <input type="radio" checked={metodoPago === "EFECTIVO"} onChange={() => setMetodoPago("EFECTIVO")} />
                <DollarSign /> Efectivo
              </label>

              <label className="opcion-pago">
                <input type="radio" checked={metodoPago === "POS"} onChange={() => setMetodoPago("POS")} />
                <CreditCard /> Tarjeta POS
              </label>

              <textarea
                className="textarea-checkout"
                placeholder="Notas del pedido"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
              />
            </div>
          </div>

          {/* --- RESUMEN --- */}
          <div className="bg-black/60 rounded-2xl border-4 border-orange-500 p-6">
            <h3 className="text-3xl font-black text-orange-400 mb-4">Resumen</h3>

            <p className="text-2xl">Subtotal: <span className="text-green-400">${subtotal}</span></p>
            <p className="text-2xl">Delivery: {costoActual === 0 ? "GRATIS 🎉" : `$${costoActual}`}</p>
            <p className="text-4xl font-black text-orange-500 mt-4">TOTAL: ${totalFinal}</p>
          </div>

          {/* --- BOTONES --- */}
          <div className="flex gap-6">
            <button onClick={onClose} className="btn-cancelar">Cancelar</button>

            <button
              onClick={enviarPedido}
              disabled={!datosCompletos}
              className={`btn-confirmar ${datosCompletos ? "" : "opacity-40 cursor-not-allowed"}`}
            >
              Confirmar Pedido
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
