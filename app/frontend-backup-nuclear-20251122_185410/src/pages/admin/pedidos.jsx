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
      .catch(() => console.log("Backend no conectado aún"));
  }, []);

  const cambiarEstado = (id, nuevo) => {
    const pedido = pedidos.find(p => p.id === id);
    const viejo = pedido.estado;

    setPedidos(prev => prev.map(p => p.id===id ? {...p, estado:nuevo} : p));

    setLogs(prev => ({
      ...prev,
      [id]: [...(prev[id]||[]), {
        usuario: "Tino",
        accion: "CAMBIO ESTADO",
        detalle: `${viejo} → ${nuevo}`,
        fecha: new Date().toLocaleString("es-UY")
      }]
    }));
  };

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', padding:'40px', fontFamily:'Arial'}}>
      <h1 style={{fontSize:'60px', textAlign:'center', color:'#ff6b00', textShadow:'0 0 40px #ff6b00', marginBottom:'50px'}}>
        PANEL DE PEDIDOS - NEÓN FULL POWER
      </h1>
      
      {pedidos.length === 0 ? (
        <div style={{textAlign:'center', fontSize:'30px', color:'#ff6b00'}}>
          Cargando pedidos o backend apagado... (pero el frontend FUNCIONA!)
        </div>
      ) : (
        pedidos.map(p => (
          <div key={p.id} style={{background:'#111', border:'4px solid #ff6b00', borderRadius:'25px', padding:'35px', margin:'40px auto', maxWidth:'900px', boxShadow:'0 0 50px #ff6b00'}}>
            <h2 style={{color:'#ff6b00', fontSize:'32px'}}>Pedido #{p.numero || p.id}</h2>
            <p style={{fontSize:'20px'}}><strong>Cliente:</strong> {p.cliente.nombre || "Anónimo"} - {p.cliente.telefono || "Sin teléfono"}</p>
            <p style={{fontSize:'20px'}}><strong>Total:</strong> ${p.total || "0.00"}</p>
            
            <div style={{margin:'30px 0'}}>
              <strong style={{fontSize:'22px'}}>Estado actual: </strong>
              <select value={p.estado || "RECIBIDO"} onChange={e=>cambiarEstado(p.id, e.target.value)} style={{padding:'15px', fontSize:'20px', background:'#000', color:'#ff6b00', border:'3px solid #ff6b00', borderRadius:'15px'}}>
                <option>RECIBIDO</option>
                <option>PREPARANDO</option>
                <option>EN_CAMINO</option>
                <option>ENTREGADO</option>
              </select>
            </div>

            {logs[p.id] && logs[p.id].length > 0 && (
              <div style={{marginTop:'40px', padding:'25px', background:'#000', border:'3px solid #ff6b00', borderRadius:'20px'}}>
                <h3 style={{color:'#ff6b00', fontSize:'28px', marginBottom:'20px'}}>HISTORIAL DE CAMBIOS</h3>
                {logs[p.id].map((l,i) => (
                  <div key={i} style={{margin:'15px 0', padding:'15px', background:'#222', borderRadius:'15px', border:'1px solid #ff6b00'}}>
                    <strong style={{color:'#ff6b00'}}>{l.usuario}</strong> → {l.detalle} <small style={{color:'#aaa'}}>({l.fecha})</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
