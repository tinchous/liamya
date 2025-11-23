import { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = () => {
    if (!nombre || !telefono || !mensaje) {
      alert("Por favor, completá todos los campos antes de enviar.");
      return;
    }

    const texto = `Hola! Soy ${nombre} (${telefono}).%0A%0A${mensaje}`;
    const url = `https://wa.me/59892308828?text=${texto}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-display text-neonOrange drop-shadow-[0_0_20px_#ff8c00] text-center mb-10">
          Contacto
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Formulario */}
          <div className="bg-black/75 border-2 border-neonOrange rounded-2xl shadow-[0_0_25px_#ff8c00] p-8">
            <h2 className="text-2xl font-display text-neonOrange mb-6 drop-shadow-[0_0_10px_#ff8c00]">
              Enviános tu mensaje
            </h2>

            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-neonOrange text-white focus:outline-none focus:ring-2 focus:ring-neonOrange"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-neonOrange text-white focus:outline-none focus:ring-2 focus:ring-neonOrange"
            />
            <textarea
              placeholder="Tu mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows="5"
              className="w-full mb-6 p-3 rounded-lg bg-black/40 border border-neonOrange text-white focus:outline-none focus:ring-2 focus:ring-neonOrange"
            ></textarea>

            <button
              onClick={enviarMensaje}
              className="w-full bg-neonOrange text-black font-bold py-3 rounded-lg hover:bg-orange-400 transition shadow-[0_0_20px_#ff8c00]"
            >
              📲 Enviar por WhatsApp
            </button>
          </div>

          {/* Información del local */}
          <div className="flex flex-col justify-center bg-black/75 border-2 border-neonRed rounded-2xl shadow-[0_0_25px_#ff2d2d] p-8">
            <h2 className="text-2xl font-display text-neonRed mb-6 drop-shadow-[0_0_10px_#ff2d2d]">
              Información del Local
            </h2>
            <p className="text-gray-300 mb-4">
              📍 <strong>Dirección:</strong> Alejadro Fiol de Pereda 1251,     Montevideo, Uruguay
            </p>
            <p className="text-gray-300 mb-4">
              ☎️ <strong>Teléfono:</strong> +598 92 308 828
            </p>
            <p className="text-gray-300 mb-4">
              🕗 <strong>Horario:</strong> 24 hs - Martes desde las 08:00
            </p>

            <iframe
              title="Mapa"
              src="https://www.google.com/maps?q=aleandrofiol de pereda 1251%2C+montevideo&output=embed"
              className="rounded-xl border border-neonOrange mt-4 w-full h-60"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
