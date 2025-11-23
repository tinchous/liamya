import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState({
    ventas_dia: 0,
    pedidos_dia: 0,
    delivery_dia: 0,
    nuevo_record: false,
  });
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Llama a los endpoints del backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then((res) => res.json())
      .then((info) => {
        setData(info);
        if (info.nuevo_record) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 10000);
        }
      })
      .catch((err) => console.error("Error cargando dashboard:", err));

    fetch("http://127.0.0.1:5000/api/dashboard/ventas_mensuales")
      .then((res) => res.json())
      .then((info) => setVentasMensuales(info))
      .catch((err) => console.error("Error cargando gráfico:", err));
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white p-8 overflow-hidden">
      {/* CONFETTI DE RECORD */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center text-center bg-black/60 z-10 animate-pulse">
          <h1 className="text-4xl font-bold text-neonOrange drop-shadow-[0_0_25px_#ff8c00]">
            🎉 FELICITACIONES 🎉<br />
            HOY FUE EL DÍA CON MEJORES VENTAS 🏆
          </h1>
        </div>
      )}

      <h1 className="text-4xl font-display text-neonOrange text-center drop-shadow-[0_0_20px_#ff8c00] mb-10">
        Ventas del día por LiamYa ir
      </h1>

      {/* CAJAS DE RESUMEN */}
      <div className="grid sm:grid-cols-3 gap-8 mb-16 text-center">
        <div className="bg-gradient-to-br from-red-700 via-black to-red-900 border-2 border-red-500 rounded-2xl p-6 shadow-[0_0_25px_#ff0000]">
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_0_10px_#ff0000]">
            💵 Ventas del Día
          </h2>
          <p className="text-4xl font-extrabold text-neonOrange">${data.ventas_dia.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-700 via-black to-yellow-900 border-2 border-yellow-400 rounded-2xl p-6 shadow-[0_0_25px_#ffaa00]">
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_0_10px_#ffaa00]">
            📦 Pedidos del Día
          </h2>
          <p className="text-4xl font-extrabold text-yellow-400">{data.pedidos_dia}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-700 via-black to-blue-900 border-2 border-blue-500 rounded-2xl p-6 shadow-[0_0_25px_#00bfff]">
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_0_10px_#00bfff]">
            🚚 Delivery del Día
          </h2>
          <p className="text-4xl font-extrabold text-blue-400">${data.delivery_dia.toFixed(2)}</p>
        </div>
      </div>

      {/* GRÁFICO DE VENTAS */}
      <div className="bg-black/60 border border-neonOrange rounded-2xl p-6 shadow-[0_0_25px_#ff8c00]">
        <h2 className="text-2xl font-bold text-center mb-6 text-neonOrange">
          📊 Ventas del Mes Actual
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={ventasMensuales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="dia" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #ff8c00",
                color: "#fff",
              }}
            />
            <Bar dataKey="ventas" fill="#ff8c00" barSize={40} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
