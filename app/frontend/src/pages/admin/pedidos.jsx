import { useEffect, useState } from "react";

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [logs, setLogs] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/pedidos")
      .then(r => r.json())
      .then(data => {
        const parseados = data.map(p => ({
          ...p,
          cliente: JSON.parse(p.cliente || "{}"),
          productos: JSON.parse(p.productos || "[]")
        }));
        setPedidos(parseados);
      })
      .catch(() => {
        // Si el backend no está, mostramos datos de prueba
        setPedidos([
          { id: 1, numero: "0001", cliente: { nombre: "Juan Pérez", telefono: "099123456" }, total: 1250, estado: "RECIBIDO", productos: [{ nombre: "Milanesa", quantity: 2 }] }
        ]);
      });
  }, []);

  const cambiarEstado = (id, nuevo) => {
    const pedido = pedidos.find(p => p.id === id);
    const viejo = pedido.estado;

    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevo } : p));

    setLogs(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), {
        usuario: "Tino",
        accion: "CAMBIO ESTADO",
        detalle: `${viejo} → ${nuevo}`,
        fecha: new Date().toLocaleString("es-UY")
      }]
    }));
  };

  return (
    <div style={{background: '#000', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'Arial'}}>
      <h1 style={{fontSize: '70px', textAlign: 'center', color: '#ff6b00', textShadow: '0 0 50px #ff6b00', marginBottom: '50px'}}>
        PANEL DE PEDIDOS - NEÓN FULL POWER
      </h1>

      {pedidos.map(p => (
        <div key={p.id} style={{background: '#111', border: '5px solid #ff6b00', borderRadius: '30px', padding: '40px', margin: '50px auto', maxWidth: '1000px', boxShadow: '0 0 60px #ff6b00'}}>
          <h2 style={{color: '#ff6b00', fontSize: '40px', marginBottom: '20px'}}>Pedido #{p.numero || p.id}</h2>
          
          <div style={{fontSize: '24px', marginBottom: '30px'}}>
            <p><strong>Cliente:</strong> {p.cliente.nombre} - {p.cliente.telefono}</p>
            <p><strong>Total:</strong> ${p.total}</p>
          </div>

          <div style={{margin: '40px 0'}}>
            <strong style={{fontSize: '28px'}}>Estado: </strong>
            <select 
              value={p.estado} 
              onChange={e => cambiarEstado(p.id, e.target.value)}
              style={{padding: '20px', fontSize: '24px', background: '#000', color: '#ff6b00', border: '4px solid #ff6b00', borderRadius: '20px', marginLeft: '20px'}}
            >
              <option>RECIBIDO</option>
              <option>PREPARANDO</option>
              <option>EN_CAMINO</option>
              <option>ENTREGADO</option>
            </select>
          </div>

          {logs[p.id] && logs[p.id].length > 0 && (
            <div style={{marginTop: '50px', padding: '30px', background: '#000', border: '4px solid #ff6b00', borderRadius: '25px'}}>
              <h3 style={{color: '#ff6b00', fontSize: '35px', marginBottom: '25px'}}>HISTORIAL DE CAMBIOS</h3>
              {logs[p.id].map((l, i) => (
                <div key={i} style={{margin: '20px 0', padding: '20px', background: '#222', borderRadius: '20px', border: '2px solid #ff6b00'}}>
                  <strong style={{color: '#ff6b00', fontSize: '20px'}}>{l.usuario}</strong> → {l.detalle}
                  <div style={{color: '#aaa', fontSize: '16px', marginTop: '10px'}}>{l.fecha}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
