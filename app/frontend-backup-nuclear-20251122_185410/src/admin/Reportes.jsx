import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export default function Reportes() {
  const [filtros, setFiltros] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    cliente: "",
    rol: "TODOS",
    categoria: "",
    producto: "",
  });
  const [todosResultados, setTodosResultados] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [totalRango, setTotalRango] = useState(0);
  const [cantidadProductoSel, setCantidadProductoSel] = useState(0);
  const [importeProductoSel, setImporteProductoSel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hoverPedido, setHoverPedido] = useState(null);

  useEffect(() => {
    obtenerReportes();
  }, []);

  const obtenerReportes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/reportes`);
      const datos = res.data.pedidos || [];

      const normalizados = datos.map((p) => {
        const c = p.cliente || {};
        return {
          ...p,
          nombre: c.nombre || "",
          email: c.email || "",
          telefono: c.telefono || "",
          direccion: c.direccion || "",
          metodo_pago: c.metodo_pago || c.metodoPago || "—",
          notas: c.notas || "",
          rol: p.rol || inferirRol(c),
        };
      });

      setTodosResultados(normalizados);
      setResultados(normalizados);
      setTotal(res.data.total || 0);
      setCantidad(normalizados.length);
      setTotalRango(res.data.total || 0);

      const listaClientes = [
        ...new Set(
          normalizados.flatMap((p) =>
            [p.nombre, p.email].filter((v) => v && v.trim() !== "")
          )
        ),
      ];
      setClientes(listaClientes);
    } catch (err) {
      console.error("Error al cargar reportes:", err);
    } finally {
      setLoading(false);
    }
  };

  const inferirRol = (cliente) => {
    if (!cliente) return "Desconocido";
    if (
      cliente.email &&
      cliente.email.includes("@") &&
      cliente.email !== "kkkk"
    ) {
      return "USUARIO REGISTRADO";
    }
    return "USUARIO INVITADO";
  };

  const aplicarFiltros = () => {
    let filtrados = [...todosResultados];
    let totalVendidas = 0;
    let importeTotal = 0;

    if (filtros.cliente.trim() !== "") {
      const c = filtros.cliente.toLowerCase();
      filtrados = filtrados.filter(
        (p) =>
          p.nombre.toLowerCase().includes(c) ||
          p.email.toLowerCase().includes(c)
      );
    }

    if (filtros.rol !== "TODOS") {
      filtrados = filtrados.filter(
        (p) => (p.rol || "").toLowerCase() === filtros.rol.toLowerCase()
      );
    }

    if (filtros.categoria) {
      filtrados = filtrados.filter((p) => {
        const lista = Array.isArray(p.productos)
          ? p.productos
          : JSON.parse(p.productos || "[]");
        return lista.some(
          (i) =>
            (i.categoria || "").toUpperCase() ===
            filtros.categoria.toUpperCase()
        );
      });
    }

    if (filtros.producto) {
      filtrados = filtrados.filter((p) => {
        const lista = Array.isArray(p.productos)
          ? p.productos
          : JSON.parse(p.productos || "[]");
        const match = lista.some((i) =>
          (i.nombre || "")
            .toLowerCase()
            .includes(filtros.producto.toLowerCase())
        );
        if (match) {
          lista.forEach((i) => {
            if (
              i.nombre
                .toLowerCase()
                .includes(filtros.producto.toLowerCase())
            ) {
              const q = parseInt(i.quantity || 0);
              const precio = parseFloat(i.precio || 0);
              totalVendidas += q;
              importeTotal += q * precio;
            }
          });
        }
        return match;
      });
    }

    setCantidadProductoSel(totalVendidas);
    setImporteProductoSel(importeTotal);

    if (filtros.fecha_inicio || filtros.fecha_fin) {
      filtrados = filtrados.filter((p) => {
        try {
          const [dia, mes, año] = p.fecha.split(",")[0].split("/");
          const fPedido = new Date(`${año}-${mes}-${dia}`);
          const ini = filtros.fecha_inicio
            ? new Date(filtros.fecha_inicio)
            : null;
          const fin = filtros.fecha_fin
            ? new Date(filtros.fecha_fin)
            : null;
          return (!ini || fPedido >= ini) && (!fin || fPedido <= fin);
        } catch {
          return true;
        }
      });
    }

    const totalFiltrado = filtrados.reduce(
      (sum, p) => sum + parseFloat(p.total || 0),
      0
    );

    setResultados(filtrados);
    setTotalRango(totalFiltrado);
    setCantidad(filtrados.length);
  };

  const limpiarFiltros = () => {
    setFiltros({
      fecha_inicio: "",
      fecha_fin: "",
      cliente: "",
      rol: "TODOS",
      categoria: "",
      producto: "",
    });
    setResultados(todosResultados);
    setTotalRango(total);
    setCantidad(todosResultados.length);
    setCantidadProductoSel(0);
    setImporteProductoSel(0);
  };

  const handleChange = (e) =>
    setFiltros({ ...filtros, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <h1 className="text-3xl font-display text-neonOrange text-center mb-8 drop-shadow-[0_0_10px_#ff8c00]">
        📈 Reportes Avanzados
      </h1>

      {/* FILTROS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <input
          type="date"
          name="fecha_inicio"
          value={filtros.fecha_inicio}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-800 border border-neonOrange rounded-lg"
        />
        <input
          type="date"
          name="fecha_fin"
          value={filtros.fecha_fin}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-800 border border-neonOrange rounded-lg"
        />
        <input
          list="clientes"
          name="cliente"
          placeholder="Cliente o email"
          value={filtros.cliente}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-800 border border-neonOrange rounded-lg"
        />
        <datalist id="clientes">
          {clientes.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>

        <select
          name="rol"
          value={filtros.rol}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-800 border border-neonOrange rounded-lg"
        >
          {[
            "TODOS",
            "ADMINISTRADOR",
            "SUPERVISOR",
            "EMPLEADO ALTAS",
            "USUARIO REGISTRADO",
            "USUARIO INVITADO",
            "DESCONOCIDO",
          ].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-800 border border-neonOrange rounded-lg"
        >
          <option value="">Todas las categorías</option>
          {[
            "ALMACEN",
            "BEBIDAS ALCOHOLICAS",
            "BEBIDAS SIN ALCOHOL",
            "CARNES/EMBUTIDOS",
            "COMIDA PREPARADA",
            "FIAMBRERIA",
            "FRUTAS/VERDURAS",
            "LACTEOS",
            "MASCOTAS",
            "OTROS",
            "PANADERIA",
            "ROTISERIA",
            "SNACKS/DULCES",
            "TABACO",
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          list="productos"
          name="producto"
          placeholder="Producto"
          value={filtros.producto}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-800 border border-neonOrange rounded-lg"
        />
        <datalist id="productos">
          {todosResultados
            .flatMap((p) => {
              const lista = Array.isArray(p.productos)
                ? p.productos
                : JSON.parse(p.productos || "[]");
              return lista.map((i) => i.nombre);
            })
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort()
            .map((n, i) => (
              <option key={i} value={n} />
            ))}
        </datalist>
      </div>

      {/* BOTONES */}
      <div className="text-center mb-10 flex justify-center gap-4">
        <button
          onClick={aplicarFiltros}
          disabled={loading}
          className="bg-neonOrange text-black px-6 py-2 rounded-lg font-bold hover:brightness-125 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Aplicar Filtros"}
        </button>
        <button
          onClick={limpiarFiltros}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-500"
        >
          Borrar Filtros
        </button>
      </div>

      {/* RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10 text-center">
        <div className="bg-gray-900 border border-neonOrange rounded-xl p-4 shadow-[0_0_10px_#ff8c00]">
          <h3 className="text-lg text-gray-300">Pedidos encontrados</h3>
          <p className="text-3xl text-neonOrange font-bold">{cantidad}</p>
        </div>
        <div className="bg-gray-900 border border-neonOrange rounded-xl p-4 shadow-[0_0_10px_#ff8c00]">
          <h3 className="text-lg text-gray-300">Total general</h3>
          <p className="text-3xl text-neonOrange font-bold">
            ${total.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-900 border border-neonOrange rounded-xl p-4 shadow-[0_0_10px_#ff8c00]">
          <h3 className="text-lg text-gray-300">Total rango seleccionado</h3>
          <p className="text-3xl text-green-400 font-bold">
            ${totalRango.toFixed(2)}
          </p>
        </div>

        {filtros.producto && cantidadProductoSel > 0 && (
          <div className="bg-gray-900 border border-neonOrange rounded-xl p-4 shadow-[0_0_10px_#ff8c00] animate-fadeIn">
            <h3 className="text-lg text-gray-300">
              Ventas del producto seleccionado
            </h3>
            <p className="text-md text-orange-300 italic mb-1">
              {filtros.producto}
            </p>
            <p className="text-2xl text-yellow-400 font-bold mb-1">
              {cantidadProductoSel} unidades
            </p>
            <p className="text-xl text-green-400 font-semibold">
              ${importeProductoSel.toFixed(2)} total vendido
            </p>
          </div>
        )}
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto mb-12 relative">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-orange-400">
              <th className="p-2 border border-gray-700">N° Pedido</th>
              <th className="p-2 border border-gray-700">Cliente</th>
              <th className="p-2 border border-gray-700">Email</th>
              <th className="p-2 border border-gray-700">Método Pago</th>
              <th className="p-2 border border-gray-700">Fecha</th>
              <th className="p-2 border border-gray-700">Total</th>
              <th className="p-2 border border-gray-700">Rol</th>
            </tr>
          </thead>
          <tbody>
            {resultados.length ? (
              resultados.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-800 relative"
                  onMouseEnter={() => setHoverPedido(p)}
                  onMouseLeave={() => setHoverPedido(null)}
                >
                  <td className="p-2 border border-gray-700 text-orange-400 font-bold">
                    {p.numero}
                  </td>
                  <td className="p-2 border border-gray-700">{p.nombre}</td>
                  <td className="p-2 border border-gray-700">{p.email}</td>
                  <td className="p-2 border border-gray-700">
                    {p.metodo_pago}
                  </td>
                  <td className="p-2 border border-gray-700">{p.fecha}</td>
                  <td className="p-2 border border-gray-700 text-green-400">
                    ${parseFloat(p.total).toFixed(2)}
                  </td>
                  <td className="p-2 border border-gray-700">
                    {p.rol || "Desconocido"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  No hay pedidos para los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {hoverPedido && (
          <div className="absolute bg-gray-900 text-white border border-neonOrange rounded-xl p-4 shadow-lg z-50 w-[420px] right-4 top-10">
            <h3 className="text-lg text-orange-400 font-bold mb-2">
              Detalle del pedido
            </h3>
            <ul className="text-sm text-gray-200 space-y-1">
              {(
                Array.isArray(hoverPedido.productos)
                  ? hoverPedido.productos
                  : JSON.parse(hoverPedido.productos || "[]")
              ).map((item, idx) => (
                <li key={idx}>
                  {item.nombre} x{item.quantity} – $
                  {(
                    parseFloat(item.precio || 0) * parseInt(item.quantity || 1)
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="mt-3 text-sm text-gray-300 space-y-1">
              <p>📍 Dirección: {hoverPedido.direccion || "—"}</p>
              <p>📞 Teléfono: {hoverPedido.telefono || "—"}</p>
              <p>🏦 Método de pago: {hoverPedido.metodo_pago}</p>
              {hoverPedido.notas && hoverPedido.notas.trim() !== "" && (
                <p>📝 Notas: {hoverPedido.notas}</p>
              )}
            </div>
            <p className="text-right text-green-400 font-bold mt-3">
              Total: ${parseFloat(hoverPedido.total).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
