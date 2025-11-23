import { useEffect, useState } from "react";

export default function PedidosTable({ usuario }) {
  const [pedidos, setPedidos] = useState([]);
  const [auditoria, setAuditoria] = useState({});

  useEffect(() => {
    setPedidos([
      { id: 1, numero: "0001", cliente: "María González", telefono: "098765432", total: 2150, estado: "RECIBIDO" },
      { id: 2, numero: "0002", cliente: "Carlos López", telefono: "091234567", total: 890, estado: "PREPARANDO" },
      { id: 3, numero: "0003", cliente: "Lucía Pérez", telefono: "099888777", total: 3200, estado: "EN_CAMINO" }
    ]);
  }, []);

  const cambiarEstado = (id, nuevoEstado) => {
    const pedido = pedidos.find(p => p.id === id);
    const estadoAnterior = pedido.estado;

    setPedidos(prev => prev.map(p => 
      p.id === id ? { ...p, estado: nuevoEstado } : p
    ));

    const log = {
      usuario: usuario.nombre,
      rol: usuario.rol.replace("_", " "),
      accion: "CAMBIO ESTADO",
      detalle: `${estadoAnterior} → ${nuevoEstado}`,
      fecha: new Date().toLocaleString("es-UY")
    };

    setAuditoria(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), log]
    }));
  };

  return (
    <div>
      <h2 className="text-7xl font-black text-orange-500 mb-16 text-center drop-shadow-2xl">
        GESTIÓN DE PEDIDOS
      </h2>

      {pedidos.map(pedido => (
        <div key={pedido.id} className="bg-gradient-to-r from-gray-900 to-black border-8 border-orange-500 rounded-3xl p-12 mb-16 shadow-2xl shadow-orange-600/70">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-3xl mb-12">
            <div><strong className="text-orange-400">#Pedido:</strong> <span className="text-5xl font-bold">#{pedido.numero}</span></div>
            <div><strong className="text-orange-400">Cliente:</strong> {pedido.cliente}</div>
            <div><strong className="text-green-400 text-5xl font-bold">Total: ${pedido.total}</strong></div>
          </div>

          <div className="flex items-center gap-12 mb-12">
            <strong className="text-4xl text-orange-300">Estado:</strong>
            <select
              value={pedido.estado}
              onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
              className="text-4xl font-bold px-12 py-6 bg-black border-8 border-orange-500 rounded-3xl text-orange-400 cursor-pointer hover:border-orange-300 transition"
            >
              <option>RECIBIDO</option>
              <option>PREPARANDO</option>
              <option>EN_CAMINO</option>
              <option>ENTREGADO</option>
            </select>
          </div>

          {auditoria[pedido.id] && auditoria[pedido.id].length > 0 && (
            <div className="mt-12 p-12 bg-black/90 border-8 border-orange-700 rounded-3xl">
              <h3 className="text-5xl font-bold text-orange-500 mb-8 text-center">HISTORIAL DE CAMBIOS</h3>
              {auditoria[pedido.id].map((log, i) => (
                <div key={i} className="bg-gray-900/90 border-6 border-orange-800 rounded-3xl p-8 mb-6 flex justify-between items-center">
                  <div>
                    <strong className="text-orange-400 text-3xl">{log.usuario}</strong>
                    <span className="text-gray-400 ml-4 text-xl">({log.rol})</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-white">{log.detalle}</p>
                    <p className="text-lg text-gray-500">{log.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
