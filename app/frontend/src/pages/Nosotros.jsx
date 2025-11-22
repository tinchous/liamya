import fondoLocal from "../assets/local-1.jpg";

export default function Nosotros() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative"
      style={{ backgroundImage: `url(${fondoLocal})` }}
    >
      {/* Capa translúcida */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-5xl font-display text-neonOrange drop-shadow-[0_0_20px_#ff8c00] mb-10">
          Nosotros
        </h1>

        <section className="mb-10 bg-black/60 border-2 border-neonOrange rounded-2xl shadow-[0_0_25px_#ff8c00] p-6 text-left">
          <h2 className="text-3xl font-display text-neonOrange mb-4 drop-shadow-[0_0_10px_#ff8c00]">
            Nuestra Historia
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Autoservice <span className="text-neonOrange">Liam Yahir</span> nació con el
            propósito de acercar productos de calidad a la comunidad del
            Cordón, en Montevideo. Desde nuestros inicios, combinamos el trato
            familiar con una atención moderna, ágil y transparente.
            Creemos en los lazos de barrio y en hacer de cada compra una
            experiencia cercana y humana.
          </p>
        </section>

        <section className="mb-10 bg-black/60 border-2 border-neonRed rounded-2xl shadow-[0_0_25px_#ff2d2d] p-6 text-left">
          <h2 className="text-3xl font-display text-neonRed mb-4 drop-shadow-[0_0_10px_#ff2d2d]">
            Nuestra Misión
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Ser el autoservice de confianza que brinda comodidad, calidad y
            precios justos, con entrega rápida gracias a nuestro servicio de
            delivery <span className="text-neonOrange font-bold">LiamYa ir</span>.
            Buscamos simplificar la vida de nuestros clientes sin perder el
            contacto humano que nos caracteriza.
          </p>
        </section>

        <section className="bg-black/60 border-2 border-neonOrange rounded-2xl shadow-[0_0_25px_#ff8c00] p-6 text-left">
          <h2 className="text-3xl font-display text-neonOrange mb-4 drop-shadow-[0_0_10px_#ff8c00]">
            Nuestra Visión
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Convertirnos en una referencia local en servicio, innovación y
            cercanía. Queremos crecer sin perder la esencia de barrio, adaptando
            la tecnología a las necesidades reales de la gente, con la calidez
            que distingue a <span className="text-neonOrange">Liam Yahir</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
