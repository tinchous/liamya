import { useEffect, useState } from "react";

export default function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    categoria: "TODAS",
  });
  const [total, setTotal] = useState(0);

  const obtenerReportes = () => {
    const query = new URLSearchParams(filtros).toString();
    fetch(`http://127.0.0.1:5000/api/reportes?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setReportes(data.detalle);
        setTotal(data.total_ventas);
      })
      .catch((err) => console.error("Error cargando reportes:", err));
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-3xl text-neonOrange mb-6 text-center font-display">
        📊 Reportes de Ventas
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input type="date" value={filtros.desde} onChange={(e) => setFiltros({ ...filtros, desde: e.target.value })} className="bg-gray-800 p-2 rounded" />
        <input type="date" value={filtros.hasta} onChange={(e) => setFiltros({ ...filtros, hasta: e.target.value })} className="bg-gray-800 p-2 rounded" />
        <select value={filtros.categoria} onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })} className="bg-gray-800 p-2 rounded">
          <option value="TODAS">Todas las categorías</option>
          <option value="ROTISERIA">Rotisería</option>
          <option value="FRUTAS/VERDURAS">Frutas y Verduras</option>
          <option value="BEBIDAS ALCOHOLICAS">Bebidas Alcohólicas</option>
          <option value="BEBIDAS SIN ALCOHOL">Bebidas sin Alcohol</option>
          <option value="ALMACEN">Almacén</option>
        </select>
        <button onClick={obtenerReportes} className="bg-neonOrange text-black px-4 py-2 rounded font-bold hover:bg-orange-400 transition">
          Generar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead className="bg-gray-800 text-neonOrange">
            <tr>
              <th className="p-2 border border-gray-700">Producto</th>
              <th className="p-2 border border-gray-700">Categoría</th>
              <th className="p-2 border border-gray-700">Total Vendido ($)</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r, i) => (
              <tr key={i} className="hover:bg-gray-800">
                <td className="p-2 border border-gray-700">{r.nombre}</td>
                <td className="p-2 border border-gray-700">{r.categoria}</td>
                <td className="p-2 border border-gray-700 text-right">{r.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6 text-2xl font-bold text-neonOrange">
        Total vendido: ${total.toFixed(2)}
      </div>
    </div>
  );
}
