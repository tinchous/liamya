import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";

export default function Nosotros() {
  return (
    <>
      <div className="relative min-h-screen">
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
          <source src="/videos/local.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 -z-10"></div>

        <Header />

        <main className="pt-80 pb-32">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-8xl font-black text-orange-500 text-center mb-20 drop-shadow-2xl">
              NOSOTROS
            </h1>

            <div className="space-y-12">
              <section className="bg-black/70 border-8 border-orange-500 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-5xl font-black text-orange-400 mb-8">Nuestra Historia</h2>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Autoservice <span className="text-orange-400 font-bold">Liam Yahir</span> surgió de los sueños y el esfuerzo de inmigrantes provenientes de República Dominicana, quienes llegaron a Uruguay con dedicación y perseverancia para construir un futuro mejor. Establecidos en el vibrante barrio de Reducto en Montevideo, hemos crecido combinando el trato familiar y cálido con una atención moderna, ágil y transparente. Desde nuestros humildes inicios, nos hemos enfocado en fortalecer los lazos comunitarios, haciendo de cada compra una experiencia cercana y humana, inspirada en las raíces dominicanas de hospitalidad y resiliencia.
                </p>
              </section>

              <section className="bg-black/70 border-8 border-red-600 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-5xl font-black text-red-500 mb-8">Nuestra Misión</h2>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Ser el autoservice de confianza en Reducto que ofrece comodidad, calidad y precios justos, ahora potenciado con nuestro innovador servicio de delivery <span className="text-orange-400 font-bold">LiamYa ir</span>. Buscamos simplificar la vida diaria de nuestros clientes, entregando productos frescos y esenciales directamente a sus puertas, sin perder el contacto humano y la calidez que nos define, heredada de nuestra herencia dominicana.
                </p>
              </section>

              <section className="bg-black/70 border-8 border-orange-500 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-5xl font-black text-orange-400 mb-8">Nuestra Visión</h2>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Convertirnos en una referencia en Reducto y más allá, fusionando innovación con la esencia de barrio. Aspiramos a crecer manteniendo nuestras raíces de esfuerzo y dedicación desde República Dominicana, adaptando tecnología como el delivery <span className="text-orange-400 font-bold">LiamYa ir</span> a las necesidades reales de la comunidad, siempre con calidez y compromiso.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingCart />
      </div>
    </>
  );
}
