export default function ProductCard({ product, onAdd, onRemove, quantity }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-neonOrange shadow-[0_0_15px_#ff8c00] hover:shadow-[0_0_25px_#ff8c00] hover:-translate-y-1 transition flex flex-col">
      <img
        src={product.imagen}
        alt={product.nombre}
        className="rounded-md mb-3 h-40 w-full object-cover"
      />
      <h2 className="font-semibold text-lg text-neonOrange">
        {product.nombre}
      </h2>
      <p className="text-gray-400 text-sm">{product.descripcion}</p>
      <p className="text-neonRed font-bold mt-2">${product.precio}</p>
      <div className="flex items-center justify-center gap-3 mt-3">
        <button
          onClick={() => onRemove(product)}
          className="bg-neonRed text-black rounded-full w-8 h-8 font-bold hover:bg-red-700 transition"
        >
          −
        </button>
        <span className="text-white w-6 text-center">{quantity || 0}</span>
        <button
          onClick={() => onAdd(product)}
          className="bg-neonOrange text-black rounded-full w-8 h-8 font-bold hover:bg-orange-600 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
