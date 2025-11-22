import deliveryImg from "../assets/delivery2.png";

export default function Delivery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-900 flex flex-col justify-center items-center text-center p-6 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-3xl text-white">
        <img
          src={deliveryImg}
          alt="LiamYa ir"
          className="mx-auto w-40 md:w-56 mb-6 drop-shadow-[0_0_30px_#F39C12] animate-pulse"
        />

        <h1 className="font-display text-5xl text-neonOrange drop-shadow-[0_0_25px_#ff8c00] mb-4">
          Delivery — <span className="text-neonRed">LiamYa ir</span>
        </h1>

        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          Tu pedido llega rápido, fresco y con una sonrisa.
          Entregamos en todo Montevideo, directamente desde{" "}
          <span className="text-neonOrange font-semibold">
            Autoservice Liam Yahir
          </span>.
        </p>

        <div className="bg-black/60 border-2 border-neonOrange rounded-2xl shadow-[0_0_25px_#ff8c00] p-6 mb-8">
          <h2 className="text-2xl font-display text-neonOrange mb-4">
            🚀 Horarios y Tarifas
          </h2>
          <ul className="text-left text-gray-300 text-lg space-y-2">
            <li>🕗 <span className="text-white font-semibold">Horario:</span> 08:00 — 23:30 todos los días</li>
            <li>💰 <span className="text-white font-semibold">Costo:</span> $50 hasta compras de $1500</li>
            <li>🎁 <span className="text-white font-semibold">Gratis</span> desde $1500 en adelante</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://wa.me/59897888728"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-black px-6 py-3 rounded-full font-bold hover:bg-green-400 transition transform hover:scale-105 shadow-[0_0_15px_#00FF7F]"
          >
            📲 Hacer Pedido por WhatsApp
          </a>

          <a
            href="/productos"
            className="bg-neonOrange text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition transform hover:scale-105 shadow-[0_0_15px_#ff8c00]"
          >
            🛒 Ver Productos
          </a>
        </div>
      </div>
    </div>
  );
}
