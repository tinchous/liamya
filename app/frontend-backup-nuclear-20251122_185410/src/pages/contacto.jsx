import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = () => {
    if (!nombre || !telefono || !mensaje) {
      alert("Por favor completá todos los campos");
      return;
    }
    const texto = `Hola! Soy ${nombre} (${telefono})%0A%0A${mensaje}`;
    window.open(`https://wa.me/59892308828?text=${texto}`, "_blank");
  };

  return (
    <>
      <div className="relative min-h-screen">
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/videos/local.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/85 -z-10"></div>

        <Header />

        <main className="pt-80 pb-32">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-8xl font-black text-orange-500 text-center mb-20 drop-shadow-2xl">
              CONTACTO
            </h1>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Formulario */}
              <div className="bg-black/75 border-8 border-orange-500 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-5xl font-black text-orange-400 mb-10 drop-shadow-2xl">
                  Enviános tu mensaje
                </h2>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full mb-6 p-6 text-2xl rounded-2xl bg-black/40 border-4 border-orange-500 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500 transition"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full mb-6 p-6 text-2xl rounded-2xl bg-black/40 border-4 border-orange-500 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500 transition"
                />
                <textarea
                  placeholder="Tu mensaje..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows="6"
                  className="w-full mb-8 p-6 text-2xl rounded-2xl bg-black/40 border-4 border-orange-500 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500 transition resize-none"
                ></textarea>
                <button
                  onClick={enviarMensaje}
                  className="w-full bg-orange-500 text-black font-black text-4xl py-8 rounded-2xl hover:bg-orange-400 transition shadow-2xl shadow-orange-500/50"
                >
                  Enviar por WhatsApp
                </button>
              </div>

              {/* Información del local */}
              <div className="bg-black/75 border-8 border-red-600 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-5xl font-black text-red-500 mb-10 drop-shadow-2xl">
                  Información del Local
                </h2>
                <div className="text-3xl text-gray-300 space-y-6">
                  <p>📍 <strong>Dirección:</strong> Alejandro Fiol de Pereda 1251, Montevideo, Uruguay</p>
                  <p>☎️ <strong>Teléfono:</strong> +598 92 308 828</p>
                  <p>🕗 <strong>Horario:</strong> 24 hs - Martes desde las 08:00</p>
                </div>
                <iframe
                  title="Mapa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.228!2d-56.189096!3d-34.890868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a034e8b4e0a5a3%3A0x1234567890!2sAlejandro%20Fiol%20de%20Pereda%201251%2C%20Montevideo!5e0!3m2!1ses!2suy!4v1732100000000"
                  className="w-full h-96 rounded-2xl border-4 border-orange-500 mt-10 shadow-2xl"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
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
