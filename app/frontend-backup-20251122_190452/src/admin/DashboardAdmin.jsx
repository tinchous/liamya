import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

/**
 * Dashboard Administrativo
 * - Conectado al backend: /api/dashboard y /api/reportes/ventas-mensuales
 * - Muestra ventas diarias reales del mes en gráfico
 * - Lanza confeti y mensaje al romper récord
 */

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null);
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [celebrar, setCelebrar] = useState(false);

  // ==============================
  // 🔄 Cargar datos del dashboard
  // ==============================
  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/dashboard");
        const data = await res.json();
        setStats(data);
        if (data.nuevo_record) {
          lanzarConfeti();
          setCelebrar(true);
        }
        cargarVentasMensuales();
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      }
    };
    cargarDashboard();
  }, []);

  // ==============================
  // 📈 Cargar ventas mensuales reales
  // ==============================
  const cargarVentasMensuales = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/reportes/ventas-mensuales");
      const data = await res.json();
      setVentasMensuales(data);
    } catch (err) {
      console.error("Error cargando ventas mensuales:", err);
    }
  };

  // ==============================
  // 🎉 Función de confeti animado
  // ==============================
  const lanzarConfeti = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen text-neonOrange text-2xl">
        Cargando estadísticas...
      </div>
    );
  }

  // ==============================
  // 🎨 INTERFAZ
  // ==============================
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8 pt-24">
      <h1 className="text-4xl text-center font-display text-neonOrange drop-shadow-[0_0_15px_#ff8c00] mb-10">
        Ventas del día por <span className="text-neonRed">LiamYa ir</span>
      </h1>

      {/* ======== CAJAS RESUMEN ======== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black/70 border-2 border-neonOrange rounded-2xl p-6 text-center shadow-[0_0_20px_#ff8c00]">
          <h2 className="text-xl text-gray-300 mb-2">Ventas del Día</h2>
          <p className="text-3xl text-neonOrange font-bold">
            ${stats.ventas_dia.toLocaleString("es-UY")}
          </p>
        </div>

        <div className="bg-black/70 border-2 border-neonOrange rounded-2xl p-6 text-center shadow-[0_0_20px_#ff8c00]">
          <h2 className="text-xl text-gray-300 mb-2">Pedidos</h2>
          <p className="text-3xl text-neonOrange font-bold">
            {stats.pedidos_dia}
          </p>
        </div>

        <div className="bg-black/70 border-2 border-neonOrange rounded-2xl p-6 text-center shadow-[0_0_20px_#ff8c00]">
          <h2 className="text-xl text-gray-300 mb-2">Delivery del Día</h2>
          <p className="text-3xl text-neonOrange font-bold">
            ${stats.delivery_dia.toLocaleString("es-UY")}
          </p>
        </div>
      </div>

      {/* ======== GRÁFICO DE BARRAS ======== */}
      <div className="bg-black/60 border border-neonOrange rounded-2xl p-6 shadow-[0_0_15px_#ff8c00]">
        <h2 className="text-2xl text-center mb-6 text-neonOrange">
          Rendimiento del Mes
        </h2>
        <div className="flex gap-2 items-end justify-between h-64">
          {ventasMensuales
            .filter((v) => v.monto > 0)
            .map((v) => (
              <div
                key={v.dia}
                className="flex flex-col items-center justify-end flex-1"
              >
                <div
                  className={`w-6 rounded-t-lg transition-all ${
                    v.monto === stats.ventas_dia
                      ? "bg-neonRed"
                      : "bg-neonOrange/70"
                  }`}
                  style={{
                    height: `${Math.min((v.monto / 20000) * 100, 100)}%`,
                  }}
                ></div>
                <span className="text-xs text-gray-400 mt-1">{v.dia}</span>
              </div>
            ))}
        </div>
      </div>

      {/* ======== FELICITACIÓN ======== */}
      {celebrar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="text-center animate-bounce">
            <h1 className="text-6xl font-display text-neonOrange drop-shadow-[0_0_20px_#ff8c00] mb-4">
              🎉 ¡FELICITACIONES! 🎉
            </h1>
            <p className="text-2xl text-gray-300 font-bold">
              Hoy alcanzaste un nuevo récord de ventas
            </p>
            <p className="text-xl text-neonRed mt-2">
              ¡LiamYa ir no para de crecer!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
