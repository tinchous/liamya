#!/bin/bash

FRONT=~/Proyectos/autoserviceliamyahir/app/frontend

echo "🔥 Creando frontend neón en $FRONT ..."
rm -rf $FRONT
mkdir -p $FRONT && cd $FRONT

# === INSTALAR VITE + REACT ===
npm create vite@latest . -- --template react
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# === CONFIG TAILWIND ===
cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neonRed: "#ff2d2d",
        neonOrange: "#ff8c00",
        darkBg: "#0a0a0a",
      },
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
EOF

# === POSTCSS CONFIG ===
cat > postcss.config.js <<'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

# === CSS GLOBAL ===
cat > src/index.css <<'EOF'
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-darkBg text-white;
}
EOF

# === MAIN.JSX ===
cat > src/main.jsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# === APP.JSX ===
mkdir -p src/components src/pages src/assets

cat > src/App.jsx <<'EOF'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Rotiseria from "./pages/Rotiseria";
import FrutasVerduras from "./pages/FrutasVerduras";
import Categorias from "./pages/Categorias";
import Delivery from "./pages/Delivery";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/rotiseria" element={<Rotiseria />} />
            <Route path="/frutas-verduras" element={<FrutasVerduras />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
EOF

# === HEADER ===
cat > src/components/Header.jsx <<'EOF'
import { Link } from "react-router-dom";
import logo from "../assets/logo-header.png";

export default function Header() {
  const menu = [
    { label: "Inicio", to: "/" },
    { label: "CATEGORÍAS", to: "/categorias" },
    { label: "ROTISERIA", to: "/rotiseria" },
    { label: "FRUTAS & VERDURAS", to: "/frutas-verduras" },
    { label: "Productos", to: "/productos" },
    { label: "Delivery", to: "/delivery" },
    { label: "Nosotros", to: "/nosotros" },
    { label: "Contacto", to: "/contacto" },
  ];

  return (
    <header className="bg-black border-b-2 border-neonRed shadow-[0_0_20px_#ff2d2d] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-14 drop-shadow-[0_0_10px_#ff8c00]" />
          <h1 className="text-neonOrange font-display text-2xl drop-shadow-[0_0_10px_#ff8c00]">
            Autoservice Liam Yahir
          </h1>
        </div>
        <nav className="flex gap-6 font-display text-lg">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="hover:text-neonRed drop-shadow-[0_0_5px_#ff2d2d] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
EOF

# === FOOTER ===
cat > src/components/Footer.jsx <<'EOF'
export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-neonOrange py-6 text-center">
      <p className="font-display text-neonRed drop-shadow-[0_0_10px_#ff2d2d]">
        © 2025 Autoservice Liam Yahir — Delivery <span className="text-neonOrange">“Liam YA ir”</span> 🚚
      </p>
    </footer>
  );
}
EOF

# === HOME PAGE ===
cat > src/pages/Home.jsx <<'EOF'
import fondo from "../assets/local-1.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  const boxes = [
    { title: "FRUTAS & VERDURAS", to: "/frutas-verduras" },
    { title: "ROTISERIA", to: "/rotiseria" },
    { title: "NUEVO SERVICIO DE DELIVERY", to: "/delivery" },
  ];

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <h2 className="relative z-10 text-5xl font-display text-neonOrange drop-shadow-[0_0_20px_#ff8c00] mb-12">
        ¡Bienvenido a Autoservice Liam Yahir!
      </h2>
      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
        {boxes.map((box) => (
          <Link
            key={box.title}
            to={box.to}
            className="bg-black/70 border-2 border-neonOrange rounded-xl p-8 text-center hover:scale-105 hover:shadow-[0_0_30px_#ff8c00] transition"
          >
            <h3 className="text-2xl font-display text-neonRed drop-shadow-[0_0_10px_#ff2d2d]">
              {box.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
EOF

# === DEMÁS PÁGINAS VACÍAS ===
for page in Productos Rotiseria FrutasVerduras Categorias Delivery Nosotros Contacto; do
cat > src/pages/$page.jsx <<EOF
export default function $page() {
  return (
    <div className="p-10 text-center font-display text-3xl text-neonOrange drop-shadow-[0_0_15px_#ff8c00]">
      Página: $page
    </div>
  );
}
EOF
done

echo "✅ Sitio base creado con éxito."
echo "➡️ Ahora ejecutá:"
echo "cd $FRONT"
echo "npm run dev"
