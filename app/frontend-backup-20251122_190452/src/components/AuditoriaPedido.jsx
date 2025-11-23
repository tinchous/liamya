import { useEffect, useState } from "react";

export default function AuditoriaPedido({ pedidoId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!pedidoId) return;

    fetch(`/api/pedidos/${pedidoId}/auditoria`)
      .then(r => r.json())
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .catch(() => setLogs([]));
  }, [pedidoId]);

  if (logs.length === 0) return null;

  return (
    <div className="mt-8 p-6 bg-black/90 border-2 border-orange-500 rounded-2xl shadow-lg shadow-orange-500/50">
      <h3 className="text-2xl font-bold text-orange-500 mb-5 drop-shadow-lg">
        Historial de Cambios
      </h3>
      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="bg-gray-900/90 p-5 rounded-xl border border-orange-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-orange-400 font-bold text-lg">{log.usuario || "Admin"}</span>
              <span className="text-gray-500 text-sm">
                {new Date(log.fecha).toLocaleString("es-UY")}
              </span>
            </div>
            <div className="text-white">
              <strong className="text-orange-300">{log.accion}:</strong> {log.detalle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
