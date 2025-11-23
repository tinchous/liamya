import { useEffect, useState } from "react";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [nueva, setNueva] = useState({ nombre: "", descripcion: "" });

  // --- Cargar categorías ---
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  // --- Agregar o actualizar ---
  const guardar = async () => {
    if (!nueva.nombre.trim()) return alert("Nombre requerido");
    const existe = categorias.find(
      (c) => c.nombre.toLowerCase() === nueva.nombre.toLowerCase()
    );
    const url = existe
      ? `http://127.0.0.1:5000/api/categorias/${nueva.nombre}`
      : "http://127.0.0.1:5000/api/categorias";
    const method = existe ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva),
    });

    setNueva({ nombre: "", descripcion: "" });
    const res = await fetch("http://127.0.0.1:5000/api/categorias");
    setCategorias(await res.json());
  };

  // --- Eliminar ---
  const eliminar = async (nombre) => {
    if (!window.confirm(`Eliminar categoría ${nombre}?`)) return;
    await fetch(`http://127.0.0.1:5000/api/categorias/${nombre}`, {
      method: "DELETE",
    });
    const res = await fetch("http://127.0.0.1:5000/api/categorias");
    setCategorias(await res.json());
  };

  // --- Render ---
  const filtradas = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-neonOrange mb-6">Categorías</h1>

      {/* Formulario */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={nueva.nombre}
          onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          className="p-2 rounded bg-gray-800 border border-gray-700 flex-1"
          value={nueva.descripcion}
          onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })}
        />
        <button
          onClick={guardar}
          className="bg-neonOrange text-black font-bold px-4 py-2 rounded hover:bg-orange-400"
        >
          Guardar
        </button>
      </div>

      {/* Filtro */}
      <input
        type="text"
        placeholder="Buscar categoría..."
        className="mb-4 p-2 w-full md:w-1/3 rounded bg-gray-800 border border-gray-700"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/* Tabla */}
      <table className="w-full border border-gray-700 text-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((c, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="p-2">{c.nombre}</td>
              <td className="p-2">{c.descripcion}</td>
              <td className="p-2">
                <button
                  onClick={() => setNueva(c)}
                  className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(c.nombre)}
                  className="bg-red-600 hover:bg-red-500 px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
