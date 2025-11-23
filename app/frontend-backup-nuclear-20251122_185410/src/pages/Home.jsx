import { Link } from "react-router-dom";
import frutas from "../assets/frutas-verduras.jpg";
import rotiseria from "../assets/rotiseria.jpg";
import delivery from "../assets/delivery.png";
import fondoLocal from "../assets/local-1.jpg";

export default function Home() {
  const boxes = [
    {
      text: "Frescura que llega en minutos",
      color: "#27AE60",
      bg: frutas,
      link: "/productos",
    },
    {
      text: "El sabor que esperabas",
      color: "#E74C3C",
      bg: rotiseria,
      link: "/productos",
    },
    {
      text: "Tu pedido al momento",
      color: "#F39C12",
      bg: delivery,
      link: "/delivery",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{ backgroundImage: `url(${fondoLocal})` }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-center w-full max-w-7xl px-6 py-20">
        {boxes.map((box, i) => (
          <Link
            key={i}
            to={box.link}
            className="relative group flex-1 h-80 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
            style={{
              borderColor: box.color,
              boxShadow: `0 0 20px ${box.color}80`,
            }}
          >
            {/* Fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition"
              style={{ backgroundImage: `url(${box.bg})` }}
            ></div>

            {/* Capa degradada */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.7) 20%, transparent 80%)`,
              }}
            ></div>

            {/* Texto */}
            <div className="absolute top-0 left-0 w-full text-center p-4">
              <p
                className="text-xl font-display drop-shadow-[0_0_10px_#000]"
                style={{ color: box.color }}
              >
                {box.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
