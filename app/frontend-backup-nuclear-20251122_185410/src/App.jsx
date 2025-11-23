import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Productos from "./pages/productos";
import Delivery from "./pages/delivery";
import Nosotros from "./pages/nosotros";
import Contacto from "./pages/contacto";
import CheckoutModal from "./components/CheckoutModal";
import FloatingCart from "./components/FloatingCart";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <FloatingCart />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </div>
  );
}
