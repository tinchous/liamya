import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart";

export default function Productos() {
  // --- ESTADOS PRINCIPALES ---
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("AZ");
  const { cart, agregar, quitar, vaciar } = useCart();
  const [mostrarForm, setMostrarForm] = useState(false);

  // --- DATOS DEL CLIENTE ---
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    metodoPago: "EFECTIVO",
    notas: "",
    guardar_datos: false,   // Guarda sus datos
    suscrito_promos: false, // Recibir promociones
  });

  // =====================================================
  // Cargar productos desde el backend
  // =====================================================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // =====================================================
  // Obtener cantidad actual en carrito
  // =====================================================
  const obtenerCantidad = (nombre) => {
    const item = cart.find((p) => p.nombre === nombre);
    return item ? item.quantity : 0;
  };

  // =====================================================
  // Categorías disponibles
  // =====================================================
  const categorias = [
    "TODOS",
    "FRUTAS/VERDURAS",
    "ROTISERIA",
    "BEBIDAS ALCOHOLICAS",
    "BEBIDAS SIN ALCOHOL",
    "TABACO",
    "ALMACEN",
    "PANADERIA",
    "SNACKS/DULCES",
    "FIAMBRERIA",
    "MASCOTAS",
    "LACTEOS",
    "OTROS",
  ];

  // =====================================================
  // Filtros y ordenamiento
  // =====================================================
  const productosFiltrados = productos
    .filter((p) =>
      filtroCategoria === "TODOS"
        ? true
        : p.categoria?.toUpperCase() === filtroCategoria.toUpperCase()
    )
    .filter((p) =>
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (orden) {
      case "AZ":
        return a.nombre.localeCompare(b.nombre);
      case "ZA":
        return b.nombre.localeCompare(a.nombre);
      case "MENOR":
        return a.precio - b.precio;
      case "MAYOR":
        return b.precio - a.precio;
      case "DESTACADOS":
        return a.mas_vendido === "si" ? -1 : 1;
      default:
        return 0;
    }
  });

  // =====================================================
  // Enviar pedido: guarda en backend + abre WhatsApp
  // =====================================================
  const enviarPedido = async (e) => {
    e.preventDefault();

    // Validar campos básicos
    const campos = ["nombre", "telefono", "email", "direccion"];
    for (const campo of campos) {
      if (!cliente[campo] || cliente[campo].trim() === "") {
        alert(`Por favor completa el campo: ${campo.toUpperCase()}`);
        return;
      }
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Cálculos
    const numeroPedido = "ORD-" + Date.now();
    const total = cart.reduce((sum, i) => sum + i.precio * i.quantity, 0);
    const deliveryCost = total < 1500 ? 50 : 0;
    const totalConEnvio = total + deliveryCost;

    try {
      // --- Guardar pedido en backend ---
      const response = await fetch("http://127.0.0.1:5000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente,
          productos: cart,
          total: totalConEnvio,
          guardar_datos: cliente.guardar_datos || false,
          suscrito_promos: cliente.suscrito_promos || false,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        // --- Crear mensaje para WhatsApp ---
        const detalle = cart
          .map(
            (i) =>
              `☐ ${i.quantity}x ${i.nombre} - $${i.precio} c/u = *$${(
                i.precio * i.quantity
              ).toFixed(2)}*`
          )
          .join("\n");

        const mensaje = `*PEDIDO WEB N° ${result.numero}*\n═══════════════════════════════\n\n` +
          `*CLIENTE*\n• Nombre: ${cliente.nombre}\n• Teléfono: ${cliente.telefono}\n• Email: ${cliente.email}\n\n` +
          `*ENTREGA*\n${cliente.direccion}\n\n` +
          `*DETALLE DEL PEDIDO*\n${detalle}\n\n` +
          `*PAGO*\n• Subtotal: $${total.toFixed(2)}\n• Delivery: $${deliveryCost}\n• *TOTAL: $${totalConEnvio.toFixed(2)}*\n\n` +
          `• Método: *${cliente.metodoPago}*\n` +
          (cliente.notas ? `\n*NOTAS:*\n${cliente.notas}\n` : "") +
          `\n────────────────\nAutoservice Liam Yahir\n${new Date().toLocaleString()}`;

        // --- Abrir WhatsApp ---
        const telefonoDestino = "59892308828";
        const url = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");

        alert("✅ Pedido enviado y guardado correctamente!");
        vaciar();
        setMostrarForm(false);
      } else {
        alert("❌ No se pudo guardar el pedido. Intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error enviando pedido:", err);
      alert("❌ Error de conexión con el servidor.");
    }
  };

  // =====================================================
  // Render principal
  // =====================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-32 px-6">
      <h1 className="text-4xl font-display text-neonOrange text-center drop-shadow-[0_0_20px_#ff8c00] mb-10">
        Productos
      </h1>

      {/* --- BÚSQUEDA Y ORDEN --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          className="px-4 py-2 rounded-lg bg-black/85 border border-neonOrange text-white w-64"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="px-3 py-2 rounded-lg bg-black/85 border border-neonOrange text-white"
        >
          <option value="AZ">A - Z</option>
          <option value="ZA">Z - A</option>
          <option value="MENOR">Menor precio</option>
          <option value="MAYOR">Mayor precio</option>
          <option value="DESTACADOS">Destacados</option>
        </select>
      </div>

      {/* --- CATEGORÍAS --- */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltroCategoria(cat)}
            className={`px-3 py-2 rounded-lg font-bold transition ${
              filtroCategoria === cat
                ? "bg-neonOrange text-black"
                : cat === "ROTISERIA"
                ? "bg-red-600 hover:bg-red-500"
                : cat === "FRUTAS/VERDURAS"
                ? "bg-green-600 hover:bg-green-500"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- PRODUCTOS --- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productosOrdenados.map((p) => (
          <div
            key={p.nombre}
            className="bg-black/85 border-2 border-neonOrange rounded-2xl p-4 flex flex-col items-center shadow-[0_0_20px_#ff8c00] hover:scale-[1.03] transition min-h-[360px] relative"
          >
            {/* Etiquetas */}
            <div className="absolute top-2 left-2 flex gap-1">
              {p.nuevo === "si" && (
                <span className="bg-blue-600 text-xs px-2 py-1 rounded text-white font-bold">
                  NUEVO
                </span>
              )}
              {p.oferta === "si" && (
                <span className="bg-yellow-500 text-xs px-2 py-1 rounded text-black font-bold">
                  OFERTA
                </span>
              )}
              {p.mas_vendido === "si" && (
                <span className="bg-red-600 text-xs px-2 py-1 rounded text-white font-bold">
                  DESTACADO
                </span>
              )}
            </div>

            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-40 h-40 object-cover rounded-lg mb-4 mt-4"
            />
            <h3 className="text-xl font-display text-neonOrange text-center mb-2">
              {p.nombre}
            </h3>
            <p className="text-gray-300 text-sm text-center mb-2 h-10 overflow-hidden">
              {p.descripcion}
            </p>
            <p className="text-neonRed font-bold text-lg mb-4">${p.precio}</p>

            {/* Botones + y - */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => quitar(p)}
                className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
              >
                -
              </button>
              <span className="text-white font-bold">
                {obtenerCantidad(p.nombre)}
              </span>
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

      {/* --- CARRITO FLOTANTE --- */}
      <Cart
        cart={cart}
        onSend={() => setMostrarForm(true)}
        onClear={vaciar}
        onContinue={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      {/* --- MODAL FORMULARIO --- */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border-2 border-neonOrange rounded-2xl p-6 w-[90%] max-w-md shadow-[0_0_25px_#ff8c00]">
            <h2 className="text-2xl font-display text-neonOrange mb-4 text-center">
              🧾 Datos del Cliente
            </h2>

            <div className="flex flex-col gap-3">
              {/* Campos del cliente */}
              {["nombre", "telefono", "email", "direccion"].map((campo) => (
                <input
                  key={campo}
                  type="text"
                  placeholder={`${campo.charAt(0).toUpperCase() + campo.slice(1)} *`}
                  className="p-2 rounded bg-black/75 border border-gray-700 text-white"
                  value={cliente[campo]}
                  onChange={(e) =>
                    setCliente({ ...cliente, [campo]: e.target.value })
                  }
                />
              ))}
              <textarea
                placeholder="Notas del pedido (opcional)"
                className="p-2 rounded bg-black/75 border border-gray-700 text-white"
                value={cliente.notas}
                onChange={(e) =>
                  setCliente({ ...cliente, notas: e.target.value })
                }
              />
              <select
                className="p-2 rounded bg-black/75 border border-gray-700 text-white"
                value={cliente.metodoPago}
                onChange={(e) =>
                  setCliente({ ...cliente, metodoPago: e.target.value })
                }
              >
                <option value="EFECTIVO">Efectivo</option>
                <option value="POS">POS (Tarjeta Débito)</option>
              </select>

              {/* ✅ Guardar datos */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={cliente.guardar_datos}
                  onChange={(e) =>
                    setCliente({ ...cliente, guardar_datos: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-300">
                  Guardar mis datos para futuras compras
                </span>
              </label>

              {/* ✅ Promociones */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={cliente.suscrito_promos}
                  onChange={(e) =>
                    setCliente({
                      ...cliente,
                      suscrito_promos: e.target.checked,
                    })
                  }
                />
                <span className="text-sm text-gray-300">
                  Deseo recibir promociones y ofertas
                </span>
              </label>
            </div>

            {/* --- BOTONES --- */}
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
      )}
    </div>
  );
}
