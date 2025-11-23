export default function UsuariosAdmin() {
  return (
    <div className="bg-gray-900/90 border-8 border-orange-500 rounded-3xl p-12">
      <h2 className="text-7xl font-black text-orange-500 mb-12 text-center">GESTIÓN DE USUARIOS</h2>
      <div className="space-y-6">
        {["Tino (ADMIN)", "Ana (SUPERVISOR)", "Juan (EMPLEADO)"].map(u => (
          <div key={u} className="bg-black border-4 border-orange-600 rounded-2xl p-8 flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-orange-400">{u}</p>
            </div>
            <button className="bg-orange-500 text-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-orange-400">
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
