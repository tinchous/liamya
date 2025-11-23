import { useState, useEffect } from "react";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    categoria: "",
    subcategoria: "",
    precio: "",
    imagen: "",
    descripcion: "",
    oferta: "no",
    nuevo: "no",
    mas_vendido: "no",
  });
  const [modoEditar, setModoEditar] = useState(false);

  // cargar productos al montar
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((r) => r.json())
      .then((data) => setProductos(data))
      .catch((e) => console.error("Error cargando productos:", e));
  }, []);

  const limpiarFormulario = () => {
    setForm({
      id: null,
      nombre: "",
      categoria: "",
      subcategoria: "",
      precio: "",
      imagen: "",
      descripcion: "",
      oferta: "no",
      nuevo: "no",
      mas_vendido: "no",
    });
    setModoEditar(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // alta o edición
  const guardarProducto = () => {
    if (!form.nombre.trim() || !form.categoria.trim() || !form.precio.trim()) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const payload = { ...form, precio: parseFloat(form.precio) || 0 };

    if (modoEditar) {
      // actualizar producto existente
      fetch(`http://127.0.0.1:5000/api/products/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then(() => {
          alert("✅ Producto actualizado.");
          limpiarFormulario();
          return fetch("http://127.0.0.1:5000/api/products")
            .then((r) => r.json())
            .then((data) => setProductos(data));
        });
    } else {
      // agregar nuevo producto
      fetch("http://127.0.0.1:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then(() => {
          alert("✅ Producto agregado.");
          limpiarFormulario();
          return fetch("http://127.0.0.1:5000/api/products")
            .then((r) => r.json())
            .then((data) => setProductos(data));
        });
    }
  };

  const editarProducto = (p) => {
    setForm(p);
    setModoEditar(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const borrarProducto = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    const restantes = productos.filter((p) => p.id !== id);
    // sobrescribir CSV
    fetch(`http://127.0.0.1:5000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        setProductos(restantes);
        alert("🗑️ Producto eliminado.");
      });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-neonOrange mb-6">
        🛠️ Administración de Productos
      </h1>

      {/* formulario */}
      <div className="bg-gray-900 border border-neonOrange rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">
          {modoEditar ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre *"
            value={form.nombre}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría *"
            value={form.categoria}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <input
            type="text"
            name="subcategoria"
            placeholder="Subcategoría"
            value={form.subcategoria}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio *"
            value={form.precio}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL Imagen"
            value={form.imagen}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <select
            name="oferta"
            value={form.oferta}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          >
            <option value="no">Oferta: No</option>
            <option value="si">Oferta: Sí</option>
          </select>
          <select
            name="nuevo"
            value={form.nuevo}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          >
            <option value="no">Nuevo: No</option>
            <option value="si">Nuevo: Sí</option>
          </select>
          <select
            name="mas_vendido"
            value={form.mas_vendido}
            onChange={handleChange}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          >
            <option value="no">Destacado: No</option>
            <option value="si">Destacado: Sí</option>
          </select>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={guardarProducto}
            className="bg-neonOrange text-black px-4 py-2 rounded-lg font-bold hover:bg-orange-400 transition"
          >
            {modoEditar ? "Actualizar" : "Agregar"}
          </button>
          <button
            onClick={limpiarFormulario}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* buscador */}
      <input
        type="text"
        placeholder="🔍 Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="px-3 py-2 rounded-lg bg-black/60 border border-gray-700 text-white w-full mb-4"
      />

      {/* tabla de productos */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-neonOrange">
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos
              .filter(
                (p) =>
                  p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                  p.categoria.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-800 hover:bg-gray-900"
                >
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.nombre}</td>
                  <td className="p-2">{p.categoria}</td>
                  <td className="p-2">${p.precio}</td>
                  <td className="p-2">
                    <button
                      onClick={() => editarProducto(p)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => borrarProducto(p.id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
