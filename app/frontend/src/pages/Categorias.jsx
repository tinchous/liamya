import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const categorias = [
  {
    nombre: "CERVEZAS",
    icon: "🍺",
    subcategorias: ["Zillertal", "Patricia", "Pilsen", "Corona", "Heineken", "Stella", "Norteña", "Schneider"]
  },
  {
    nombre: "BEBIDAS",
    icon: "🥃",
    subcategorias: ["Fernet", "Vodka", "Whisky", "Gancia", "Cinzano", "Ron", "Tequila", "Aperitivos"]
  },
  {
    nombre: "GASEOSAS",
    icon: "🥤",
    subcategorias: ["Coca Cola", "Fanta", "Sprite", "Pepsi", "Paso de los Toros", "Aquarius", "Monster", "Red Bull"]
  },
  {
    nombre: "ROTISERÍA",
    icon: "🍔",
    subcategorias: ["Hamburguesas", "Chivitos", "Pizzas", "Milanesas", "Papas", "Panchos", "Lomitos", "Tacos"]
  },
  {
    nombre: "FRUTAS & VERDURAS",
    icon: "🥬",
    subcategorias: ["Verduras", "Frutas", "Ensaladas", "Hierbas", "Tubérculos"]
  },
  {
    nombre: "AUTOSERVICIO",
    icon: "🛒",
    subcategorias: ["Snacks", "Dulces", "Lácteos", "Panadería", "Congelados", "Limpieza", "Cigarrillos"]
  }
]

export default function Categorias() {
  const [abierta, setAbierta] = useState(null)

  return (
    <div className="pt-64 pb-32 px-8">
      <h1 className="text-7xl md:text-9xl font-black text-orange-500 text-center mb-20 neon-text">
        CATEGORÍAS
      </h1>
      <div className="max-w-5xl mx-auto space-y-8">
        {categorias.map((cat, i) => (
          <div key={i} className="bg-gray-900 border-8 border-orange-500 rounded-3xl overflow-hidden">
            <button
              onClick={() => setAbierta(abierta === i ? null : i)}
              className="w-full px-12 py-10 flex items-center justify-between hover:bg-orange-900 transition"
            >
              <div className="flex items-center gap-8">
                <span className="text-6xl md:text-8xl">{cat.icon}</span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white">{cat.nombre}</h2>
              </div>
              {abierta === i ? <ChevronUp className="w-16 h-16 text-orange-500" /> : <ChevronDown className="w-16 h-16 text-orange-500" />}
            </button>
            
            {abierta === i && (
              <div className="bg-black px-12 py-10 border-t-8 border-orange-500">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cat.subcategorias.map((sub, j) => (
                    <div key={j} className="bg-gradient-to-br from-orange-800 to-red-800 p-6 rounded-2xl text-center hover:scale-110 transition cursor-pointer">
                      <p className="text-sm text-orange-300 mt-2 opacity-0 group-hover:opacity-100 transition">Próximamente disponible</p>
                      <p className="text-2xl md:text-3xl font-black text-white">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
