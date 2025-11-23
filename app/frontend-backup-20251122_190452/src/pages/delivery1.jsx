import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

export default function Delivery() {
  /* ---------------------------------------------------------
     📌 COORDENADAS REALES DEL LOCAL
     --------------------------------------------------------- */
  const LOCAL_COORDS = { lat: -34.8919989, lon: -56.1777572 };

  /* ---------------------------------------------------------
     📌 FUNCIÓN PARA DEFINIR PRECIO SEGÚN DISTANCIA
     --------------------------------------------------------- */
  function getDeliveryPrice(distanceKm) {
    if (distanceKm <= 1) return 50;
    if (distanceKm <= 2) return 70;
    if (distanceKm <= 3) return 90;
    if (distanceKm <= 4) return 110;
    if (distanceKm <= 5) return 130;
    return "Fuera de zona";
  }

  /* ---------------------------------------------------------
     📌 CÁLCULO DE DISTANCIA USANDO FÓRMULA HAVERSINE
     --------------------------------------------------------- */
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // radio de la tierra km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distancia final en KM
  }

  /* ---------------------------------------------------------
     📌 RENDERIZAR RESULTADOS EN PANTALLA (distancia + precio)
     --------------------------------------------------------- */
  function showResult(distance) {
    const km = distance.toFixed(2);
    const price = getDeliveryPrice(distance);
    const el = document.getElementById("delivery-result");

    if (price === "Fuera de zona") {
      el.innerHTML = `
        <p class="text-red-400 font-bold">Estás a ${km} km — fuera de la zona de delivery.</p>
      `;
    } else {
      el.innerHTML = `
        <p class="text-green-400 font-bold">Estás a ${km} km del local.</p>
        <p class="text-orange-300 font-bold mt-4">Costo del delivery: $${price}</p>
        <p class="text-gray-300 mt-4">Si tu compra supera los $1499 → <span class="text-green-400 font-bold">GRATIS ✔</span></p>
      `;
    }
  }

  /* ---------------------------------------------------------
     📌 UBICACIÓN AUTOMÁTICA DESDE EL NAVEGADOR
     --------------------------------------------------------- */
  function handleUseLocation() {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const dist = calculateDistance(
          latitude,
          longitude,
          LOCAL_COORDS.lat,
          LOCAL_COORDS.lon
        );
        showResult(dist);
      },
      () => alert("No pudimos obtener tu ubicación. Activá permisos.")
    );
  }

  /* ---------------------------------------------------------
     📌 BÚSQUEDA DE DIRECCIÓN MANUAL (API Nominatim - gratis)
     --------------------------------------------------------- */
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
      alert("No encontramos esa dirección. Probá más datos.");
      return;
    }

    const { lat, lon } = data[0];
    const dist = calculateDistance(
      parseFloat(lat),
      parseFloat(lon),
      LOCAL_COORDS.lat,
      LOCAL_COORDS.lon
    );

    showResult(dist);
  }

  /* ---------------------------------------------------------
     📌 TABLA DE DISTANCIAS FIJA (1–5 km)
     --------------------------------------------------------- */
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

        {/* 🎥 Video de fondo */}
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/videos/liamya.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 -z-10"></div>

        <Header />

        <main className="pt-80 pb-32 text-center">
          <div className="max-w-5xl mx-auto px-8">

            {/* Título principal */}
            <h1 className="text-8xl font-black text-orange-500 mb-12 drop-shadow-2xl">
              DELIVERY <span className="text-red-500">LiamYa ir</span>
            </h1>

            <div className="bg-gray-900/90 border-8 border-orange-500 rounded-3xl p-20 shadow-2xl">

              {/* Descripción */}
              <p className="text-5xl text-gray-300 mb-12">
                Tu pedido llega rápido, fresco y con una sonrisa.
              </p>

              {/* Horario + costo base */}
              <div className="text-4xl space-y-8">
                <p>
                  Horario:{" "}
                  <span className="text-orange-400 font-bold">
                    08:00 — 23:30
                  </span>{" "}
                  todos los días
                </p>

                <p>
                  Costo base:{" "}
                  <span className="text-orange-400 font-bold">
                    Se cobra delivery hasta $1499
                  </span>{" "}
                  •{" "}
                  <span className="text-green-400 font-bold">
                    GRATIS desde $1500
                  </span>
                </p>
              </div>

              {/* ===========================
                  TABLA DE DISTANCIAS
              ============================ */}
              <div className="mt-24">
                <h2 className="text-5xl text-orange-300 font-bold mb-10 drop-shadow-xl">
                  Costos por distancia
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-4xl text-gray-200 border-collapse">
                    <thead>
                      <tr className="text-orange-400 border-b-4 border-orange-600">
                        <th className="py-6">Distancia</th>
                        <th className="py-6">Costo Delivery (≤ $1499)</th>
                        <th className="py-6">Desde $1500</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tablaDistancias.map((fila, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-6">{fila.rango}</td>
                          <td className="py-6 text-orange-300 font-bold">${fila.costo}</td>
                          <td className="py-6 text-green-400 font-bold">GRATIS</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ===========================
                  CALCULADORA DE DELIVERY
              ============================ */}
              <div className="mt-32 bg-black/30 rounded-3xl p-16 border-4 border-orange-600 shadow-xl">

                <h2 className="text-5xl text-orange-300 font-bold mb-10 drop-shadow-xl">
                  Calculá tu costo de delivery
                </h2>

                {/* Donde se imprime el resultado */}
                <div id="delivery-result" className="text-4xl text-gray-200 mt-10"></div>

                {/* Botón de geolocalización */}
                <button
                  onClick={handleUseLocation}
                  className="bg-red-500 text-black px-14 py-8 rounded-2xl text-4xl font-bold hover:bg-red-400 transition shadow-xl block mx-auto mb-12"
                >
                  Usar mi ubicación
                </button>

                {/* Input de dirección manual */}
                <div className="flex flex-col items-center space-y-8">
                  <input
                    id="address-input"
                    type="text"
                    placeholder="Ingresá tu dirección exacta…"
                    className="w-full max-w-2xl px-8 py-6 text-3xl rounded-2xl bg-gray-800 text-white border border-gray-600"
                  />

                  <button
                    onClick={handleAddressSearch}
                    className="bg-orange-500 text-black px-14 py-8 rounded-2xl text-4xl font-bold hover:bg-orange-400 transition shadow-xl"
                  >
                    Calcular desde dirección
                  </button>
                </div>
              </div>

              {/* Botón de WhatsApp */}
              <div className="mt-20">
                <a
                  href="https://wa.me/59892308828"
                  className="bg-green-500 text-black px-16 py-10 rounded-3xl text-5xl font-bold hover:bg-green-400 transition shadow-2xl inline-block"
                >
                  Hacer Pedido por WhatsApp
                </a>
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
