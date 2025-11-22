import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

const CATEGORIAS = [
  "TODOS", "FRUTAS/VERDURAS", "LACTEOS", "BEBIDAS ALCOHOLICAS", "BEBIDAS SIN ALCOHOL", 
  "PANADERIA", "SNACKS/DULCES", "TABACO", "COMIDA PREPARADA", "OTROS", 
  "ROTISERIA", "FIAMBRERIA", "MASCOTAS", "ALMACEN"
];

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("TODOS");
  const [filtroEspecial, setFiltroEspecial] = useState("TODOS");
  const [orden, setOrden] = useState("AZ");
  const { agregar, quitar, cart } = useCart();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then(r => r.json())
      .then(data => {
        setProductos(data);
        setFiltrados(data);
      });
  }, []);

  useEffect(() => {
    let resultado = [...productos];

    // Búsqueda
    if (busqueda) {
      resultado = resultado.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Categoría
    if (categoria !== "TODOS") {
      resultado = resultado.filter(p => p.categoria === categoria);
    }

    // Filtros especiales
    if (filtroEspecial === "OFERTAS") resultado = resultado.filter(p => p.oferta === "si");
    if (filtroEspecial === "NUEVOS") resultado = resultado.filter(p => p.nuevo === "si");
    if (filtroEspecial === "DESTACADOS") resultado = resultado.filter(p => p.mas_vendido === "si");

    // Orden
    if (orden === "AZ") resultado.sort((a,b) => a.nombre.localeCompare(b.nombre));
    if (orden === "ZA") resultado.sort((a,b) => b.nombre.localeCompare(a.nombre));
    if (orden === "PRECIO_ASC") resultado.sort((a,b) => a.precio - b.precio);
    if (orden === "PRECIO_DESC") resultado.sort((a,b) => b.precio - a.precio);

    setFiltrados(resultado);
  }, [busqueda, categoria, filtroEspecial, orden, productos]);

  const getCantidad = (nombre) => cart.find(i => i.nombre === nombre)?.quantity || 0;
  const getImagen = (codigo) => codigo ? `https://res.cloudinary.com/djq691oyz/image/upload/v1763528615/${codigo}.jpg` : "/no-image.png";

  return (
    <>
      <div className="relative min-h-screen">
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/videos/frutasyverduras.mp4" type="video/mp4" />
        </video>
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-40">
          <source src="/videos/rotiseria.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/75 -z-10"></div>

        <Header />

        <main className="pt-80 pb-32">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-8xl font-black text-orange-500 text-center mb-10 drop-shadow-2xl">
              NUESTROS PRODUCTOS
            </h1>

            {/* FILTROS */}
            <div className="bg-gray-900/95 border-8 border-orange-500 rounded-3xl p-8 mb-16 shadow-2xl">
              <input
                type="text"
                placeholder="🔍 Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full p-6 text-3xl bg-black/80 border-4 border-orange-500 rounded-2xl text-white placeholder-gray-500 mb-6"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="p-6 text-2xl bg-black/80 border-4 border-orange-500 rounded-2xl text-white">
                  {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <select value={filtroEspecial} onChange={(e) => setFiltroEspecial(e.target.value)} className="p-6 text-2xl bg-black/80 border-4 border-orange-500 rounded-2xl text-white">
                  <option value="TODOS">Todos los productos</option>
                  <option value="OFERTAS">🔥 Ofertas</option>
                  <option value="NUEVOS">🆕 Nuevos</option>
                  <option value="DESTACADOS">⭐ Destacados</option>
                </select>

                <select value={orden} onChange={(e) => setOrden(e.target.value)} className="p-6 text-2xl bg-black/80 border-4 border-orange-500 rounded-2xl text-white">
                  <option value="AZ">A → Z</option>
                  <option value="ZA">Z → A</option>
                  <option value="PRECIO_ASC">Precio ↑</option>
                  <option value="PRECIO_DESC">Precio ↓</option>
                </select>
              </div>
            </div>

            {/* PRODUCTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {filtrados.map(p => (
                <div key={p.id} className="relative bg-gray-900/95 border-8 border-orange-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/50 transition">
                  {/* Etiquetas */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {p.oferta === "si" && <span className="bg-red-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">OFERTA</span>}
                    {p.nuevo === "si" && <span className="bg-green-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">NUEVO</span>}
                    {p.mas_vendido === "si" && <span className="bg-yellow-500 text-black px-6 py-2 rounded-full text-xl font-bold shadow-lg">⭐ TOP</span>}
                  </div>

                  <img 
                    src={getImagen(p.codigo_barra)} 
                    alt={p.nombre}
                    className="w-full h-64 object-cover"
                    onError={(e) => { e.target.src = "/no-image.png"; e.target.onerror = null; }}
                  />

                  <div className="p-8 text-center">
                    <h3 className="text-3xl font-bold text-orange-400 mb-4 min-h-24 flex items-center justify-center">
                      {p.nombre}
                    </h3>
                    <p className="text-5xl font-black text-green-400 mb-8">${parseFloat(p.precio).toFixed(0)}</p>

                    <div className="flex items-center justify-center gap-6">
                      <button onClick={() => quitar(p)} className="bg-red-600 hover:bg-red-500 text-white w-16 h-16 rounded-full text-5xl font-bold transition">-</button>
                      <span className="text-5xl font-black text-orange-400 w-20 text-center">{getCantidad(p.nombre)}</span>
                      <button onClick={() => agregar(p)} className="bg-green-600 hover:bg-green-500 text-white w-16 h-16 rounded-full text-5xl font-bold transition">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
        <FloatingCart />
      </div>
    </>
  );
}
