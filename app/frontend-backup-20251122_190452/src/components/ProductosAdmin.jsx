export default function ProductosAdmin() {
  return (
    <div className="bg-gray-900/90 border-8 border-orange-500 rounded-3xl p-12">
      <h2 className="text-7xl font-black text-orange-500 mb-12 text-center">GESTIÓN DE PRODUCTOS</h2>
      <div className="grid grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-black border-4 border-orange-600 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🍔</div>
            <h3 className="text-2xl font-bold text-orange-400">Producto {i}</h3>
            <p className="text-4xl text-green-400 mt-4">$999</p>
          </div>
        ))}
      </div>
    </div>
  );
}
