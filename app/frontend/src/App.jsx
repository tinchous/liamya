import { useEffect, useState } from "react";

export default function App() {
  const [pedidos, setPedidos] = useState([]);
  const [logs, setLogs] = useState({});

  useEffect(() => {
    // Datos de prueba para que veas que funciona AUNQUE el backend esté apagado
    setPedidos([
      {
        id: 1,
        numero: "0001",
        cliente: { nombre: "Juan Pérez", telefono: "099 123 456" },
        total: 1850,
        estado: "RECIBIDO",
        productos: [{ nombre: "Milanesa completa", quantity: 2 }, { nombre: "Coca 2.25L", quantity: 1 }]
      }
    ]);
  }, []);

  const cambiarEstado = (id, nuevo) => {
    const pedido = pedidos.find(p => p.id === id);
    const viejo = pedido.estado;

    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevo } : p));

    setLogs(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), {
        usuario: "Tino Admin",
        accion: "CAMBIO ESTADO",
        detalle: `${viejo} → ${nuevo}`,
        fecha: new Date().toLocaleString("es-UY")
      }]
    }));
  };

  return (
    <div style={{background: '#000', color: '#fff', minHeight: '100vh', padding: '30px', fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{fontSize: '70px', textAlign: 'center', color: '#ff6b00', textShadow: '0 0 60px #ff6b00', margin: '40px 0'}}>
        AUTO SERVICE LIAM-YAHIR
      </h1>
      <h2 style={{fontSize: '50px', textAlign: 'center', color: '#ff8c00', marginBottom: '60px'}}>
        PANEL DE PEDIDOS - NEÓN FULL POWER
      </h2>

      {pedidos.map(p => (
        <div key={p.id} style={{background: '#111', border: '6px solid #ff6b00', borderRadius: '35px', padding: '50px', margin: '60px auto', maxWidth: '1100px', boxShadow: '0 0 80px #ff6b00'}}>
          <h2 style={{color: '#ff6b00', fontSize: '45px', marginBottom: '30px'}}>
            Pedido #{p.numero}
          </h2>
          
          <div style={{fontSize: '28px', marginBottom: '40px', lineHeight: '1.6'}}>
            <p><strong>Cliente:</strong> {p.cliente.nombre}</p>
            <p><strong>Teléfono:</strong> {p.cliente.telefono}</p>
            <p><strong>Total:</strong> ${p.total.toLocaleString()}</p>
          </div>

          <div style={{margin: '50px 0'}}>
            <strong style={{fontSize: '32px', color: '#ff8c00'}}>Estado actual: </strong>
            <select 
              value={p.estado} 
              onChange={e => cambiarEstado(p.id, e.target.value)}
              style={{padding: '25px', fontSize: '28px', background: '#000', color: '#ff6b00', border: '5px solid #ff6b00', borderRadius: '25px', marginLeft: '30px'}}
            >
              <option>RECIBIDO</option>
              <option>PREPARANDO</option>
              <option>EN_CAMINO</option>
              <option>ENTREGADO</option>
            </select>
          </div>

          {/* HISTORIAL DE CAMBIOS */}
          {logs[p.id] && logs[p.id].length > 0 && (
            <div style={{marginTop: '70px', padding: '40px', background: '#000', border: '5px solid #ff6b00', borderRadius: '30px'}}>
              <h3 style={{color: '#ff6b00', fontSize: '40px', marginBottom: '35px', textAlign: 'center'}}>
                HISTORIAL DE CAMBIOS
              </h3>
              {logs[p.id].map((l, i) => (
                <div key={i} style={{margin: '25px 0', padding: '25px', background: '#222', borderRadius: '25px', border: '3px solid #ff6b00'}}>
                  <strong style={{color: '#ff6b00', fontSize: '24px'}}>{l.usuario}</strong>
                  <div style={{color: '#fff', fontSize: '22px', marginTop: '10px'}}>
                    {l.accion}: {l.detalle}
                  </div>
                  <div style={{color: '#aaa', fontSize: '18px', marginTop: '10px'}}>
                    {l.fecha}
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
