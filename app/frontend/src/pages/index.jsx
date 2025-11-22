import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/videos/local.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 -z-10"></div>

        <Header />

        <main className="pt-80 pb-32">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h1 className="text-8xl md:text-9xl font-black text-orange-500 drop-shadow-2xl mb-10">
              BIENVENIDOS
            </h1>

            {/* 3 CAJAS DESTACADAS */}
            <div className="grid md:grid-cols-3 gap-12 mt-20">
              <Link to="/productos?categoria=ROTISERIA" className="group">
                <div className="bg-gradient-to-br from-red-600 to-orange-600 border-8 border-red-500 rounded-3xl p-16 text-center shadow-2xl hover:scale-105 transition">
                  <h3 className="text-5xl font-black text-white mb-6 drop-shadow-2xl">
                    🔥 Milanesas de Pollo y Carne
                  </h3>
                  <p className="text-3xl text-yellow-300 font-bold">
                    Las mejores del barrio Reducto
                  </p>
                </div>
              </Link>

              <Link to="/productos?categoria=FRUTAS/VERDURAS" className="group">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 border-8 border-green-500 rounded-3xl p-16 text-center shadow-2xl hover:scale-105 transition">
                  <h3 className="text-5xl font-black text-white mb-6 drop-shadow-2xl">
                    🥬 Frutas y Verduras
                  </h3>
                  <p className="text-3xl text-yellow-300 font-bold">
                    Frescas cada día
                  </p>
                </div>
              </Link>

              <Link to="/delivery" className="group">
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 border-8 border-blue-500 rounded-3xl p-16 text-center shadow-2xl hover:scale-105 transition">
                  <h3 className="text-5xl font-black text-white mb-6 drop-shadow-2xl">
                    🚀 LiamYa ir
                  </h3>
                  <p className="text-3xl text-yellow-300 font-bold">
                    Delivery 08:00 - 23:30 todos los días
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingCart />
      </div>
    </>
  );
}
