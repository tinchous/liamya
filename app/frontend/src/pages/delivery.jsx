import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

export default function Delivery() {
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
              DELIVERY — <span className="text-red-500">LiamYa ir</span>
            </h1>
            <div className="bg-gray-900/90 border-8 border-orange-500 rounded-3xl p-20 shadow-2xl">
              <p className="text-5xl text-gray-300 mb-12">
                Tu pedido llega rápido, fresco y con una sonrisa.
              </p>
              <div className="text-4xl space-y-8">
                <p>Horario: <span className="text-orange-400 font-bold">08:00 — 23:30</span> todos los días</p>
                <p>Costo: <span className="text-orange-400 font-bold">$50</span> hasta $1499 • <span className="text-green-400 font-bold">GRATIS</span> desde $1500</p>
              </div>
              <div className="mt-16">
                <a href="https://wa.me/59892308828" className="bg-green-500 text-black px-16 py-10 rounded-3xl text-5xl font-bold hover:bg-green-400 transition shadow-2xl inline-block">
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
