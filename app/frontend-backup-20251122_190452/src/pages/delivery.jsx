import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";
import { useDelivery } from "../context/DeliveryContext";
import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const { updateDelivery } = useDelivery();
  const navigate = useNavigate();

  const LOCAL_COORDS = { lat: -34.8919989, lon: -56.1777572 };

  function getDeliveryPrice(distanceKm) {
    if (distanceKm <= 1) return 50;
    if (distanceKm <= 2) return 70;
    if (distanceKm <= 3) return 90;
    if (distanceKm <= 4) return 110;
    if (distanceKm <= 5) return 130;
    return "Fuera de zona";
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  function showResult(distance) {
    const km = distance.toFixed(2);
    const price = getDeliveryPrice(distance);
    const el = document.getElementById("delivery-result");

    if (price === "Fuera de zona") {
      el.innerHTML = `
        <p class="text-red-400 font-bold">Estás a ${km} km — fuera de la zona de delivery.</p>
      `;
      return;
    }

    el.innerHTML = `
      <p class="text-green-400 font-bold">Estás a ${km} km del local.</p>
      <p class="text-orange-300 font-bold mt-4">Costo del delivery: $${price}</p>
      <p class="text-gray-300 mt-4">Si tu compra supera los $1499 →
        <span class="text-green-400 font-bold">GRATIS ✔</span></p>
      <p class="text-yellow-300 font-bold mt-8 text-3xl">Guardando costo y volviendo a productos...</p>
    `;

    updateDelivery(price);

    setTimeout(() => navigate("/productos"), 1200);
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = calculateDistance(
          pos.coords.latitude,
          pos.coords.longitude,
          LOCAL_COORDS.lat,
          LOCAL_COORDS.lon
        );
        showResult(dist);
      },
      () => alert("No pudimos obtener tu ubicación.")
    );
  }

  async function handleAddressSearch() {
    const address = document.getElementById("address-input").value;
    if (!address.trim()) {
      alert("Ingresá una dirección válida");
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}&countrycodes=uy`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length === 0) {
      alert("No encontramos esa dirección.");
      return;
    }

    const dist = calculateDistance(
      parseFloat(data[0].lat),
      parseFloat(data[0].lon),
      LOCAL_COORDS.lat,
      LOCAL_COORDS.lon
    );

    showResult(dist);
  }

  const tablaDistancias = [
    { rango: "0 – 1 km", costo: 50 },
    { rango: "1 – 2 km", costo: 70 },
    { rango: "2 – 3 km", costo: 90 },
    { rango: "3 – 4 km", costo: 110 },
    { rango: "4 – 5 km", costo: 130 },
  ];

  return (
    <>
      <div className="relative min-h-screen">
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/videos/liamya.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 -z-10"></div>

        <Header />

        <main className="pt-80 pb-32 text-center">
          <div className="max-w-5xl mx-auto px-8">

            <h1 className="text-8xl font-black text-orange-500 mb-12 drop-shadow-2xl">
              DELIVERY <span className="text-red-500">LiamYa ir</span>
            </h1>

            <div className="bg-gray-900/90 border-8 border-orange-500 rounded-3xl p-20 shadow-2xl">

              <p className="text-5xl text-gray-300 mb-12">
                Tu pedido llega rápido, fresco y con una sonrisa.
              </p>

              <div className="text-4xl space-y-8">
                <p>Horario: <span className="text-orange-400 font-bold">08:00 — 23:30</span></p>
                <p>Costo: <span className="text-orange-400 font-bold">hasta $1499</span> • <span className="text-green-400 font-bold">GRATIS desde $1500</span></p>
              </div>

              <div className="mt-24">
                <h2 className="text-5xl text-orange-300 font-bold mb-10">Costos por distancia</h2>
                <table className="w-full text-4xl text-gray-200 border-collapse">
                  <thead>
                    <tr className="text-orange-400 border-b-4 border-orange-600">
                      <th className="py-6">Distancia</th>
                      <th className="py-6">≤ $1499</th>
                      <th className="py-6">≥ $1500</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaDistancias.map((fila, idx) => (
                      <tr key={idx} className="border-b border-gray-700">
                        <td className="py-6">{fila.rango}</td>
                        <td className="py-6 text-orange-300 font-bold">${fila.costo}</td>
                        <td className="py-6 text-green-400 font-bold">GRATIS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-32 bg-black/30 p-16 rounded-3xl border-4 border-orange-600 shadow-xl">
                <h2 className="text-5xl text-orange-300 font-bold mb-10">Calculá tu costo de delivery</h2>

                <div id="delivery-result" className="text-4xl text-gray-200 mt-10"></div>

                <button onClick={handleUseLocation}
                  className="bg-red-500 text-black px-14 py-8 rounded-2xl text-4xl font-bold mb-12 block mx-auto">
                  Usar mi ubicación
                </button>

                <input id="address-input" type="text" placeholder="Ingresá tu dirección..."
                  className="w-full max-w-2xl px-8 py-6 text-3xl bg-gray-800 text-white rounded-2xl border" />

                <button onClick={handleAddressSearch}
                  className="mt-8 bg-orange-500 text-black px-14 py-8 rounded-2xl text-4xl font-bold">
                  Calcular desde dirección
                </button>
              </div>

            </div>
          </div>
        </main>

        <Footer />
        <FloatingCart />
      </div>
    </>
  );
}
