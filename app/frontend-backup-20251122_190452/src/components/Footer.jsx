import { useState } from "react";

export default function Footer() {
  const [formTrabajo, setFormTrabajo] = useState({
    nombre: "", telefono: "", email: "", cargo: "", experiencia: "", cv: null
  });

  const handleFileChange = (e) => {
    setFormTrabajo({ ...formTrabajo, cv: e.target.files[0] });
  };

  const enviarTrabajo = async (e) => {
    e.preventDefault();

    if (!formTrabajo.nombre.trim() || !formTrabajo.telefono.trim() || !formTrabajo.email.trim() || !formTrabajo.cargo.trim() || !formTrabajo.cv) {
      alert("¡Completá todos los campos obligatorios!");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", formTrabajo.nombre);
    formData.append("telefono", formTrabajo.telefono);
    formData.append("email", formTrabajo.email);
    formData.append("cargo", formTrabajo.cargo);
    formData.append("experiencia", formTrabajo.experiencia || "Sin experiencia");
    formData.append("cv", formTrabajo.cv);

    try {
      const response = await fetch("/api/send-cv", { method: "POST", body: formData });
      if (response.ok) {
        alert("¡CV enviado con éxito! Te contactaremos pronto 🔥");
        setFormTrabajo({ nombre: "", telefono: "", email: "", cargo: "", experiencia: "", cv: null });
        e.target.reset();
      } else {
        alert("Error al enviar. Intentá de nuevo.");
      }
    } catch (err) {
      alert("Error de conexión. Revisá tu internet.");
    }
  };

  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t-8 border-orange-500 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Columna 1: Logo + Datos */}
          <div>
            <img src="/logo-header.png" alt="Autoservice Liam Yahir" className="h-32 mb-6" />
            <h3 className="text-3xl font-black text-orange-500 mb-4">AUTO SERVICE LIAM YAHIR</h3>
            <p className="text-gray-300 text-lg">
              Alejandro Fiol de Pereda 1251<br />
              Reducto, Montevideo<br />
              WhatsApp: +598 92 308 828
            </p>
          </div>

          {/* Columna 2: Acceso Rápido */}
          <div>
            <h4 className="text-2xl font-black text-orange-500 mb-6">ACCESO RÁPIDO</h4>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li><a href="/" className="hover:text-orange-500 transition">Inicio</a></li>
              <li><a href="/productos" className="hover:text-orange-500 transition">Productos</a></li>
              <li><a href="/delivery" className="hover:text-orange-500 transition">Delivery</a></li>
              <li><a href="/nosotros" className="hover:text-orange-500 transition">Nosotros</a></li>
              <li><a href="/contacto" className="hover:text-orange-500 transition">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Trabaja con Nosotros */}
          <div>
            <h4 className="text-2xl font-black text-orange-500 mb-6">TRABAJA CON NOSOTROS</h4>
            <form onSubmit={enviarTrabajo} className="space-y-4">
              <input type="text" placeholder="Nombre completo *" required onChange={e => setFormTrabajo({...formTrabajo, nombre: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-orange-500 text-white text-sm" />
              <input type="tel" placeholder="Teléfono *" required onChange={e => setFormTrabajo({...formTrabajo, telefono: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-orange-500 text-white text-sm" />
              <input type="email" placeholder="Email *" required onChange={e => setFormTrabajo({...formTrabajo, email: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-orange-500 text-white text-sm" />
              <input type="text" placeholder="Cargo solicitado *" required onChange={e => setFormTrabajo({...formTrabajo, cargo: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-orange-500 text-white text-sm" />
              <textarea placeholder="Experiencia laboral (opcional)" onChange={e => setFormTrabajo({...formTrabajo, experiencia: e.target.value})} rows="2" className="w-full p-3 rounded-lg bg-black/50 border border-orange-500 text-white text-sm resize-none" />
              <input type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-black hover:file:bg-orange-400" />
              <button type="submit" className="w-full bg-orange-500 text-black font-bold py-3 rounded-lg hover:bg-orange-400 transition shadow-lg">
                Enviar CV
              </button>
            </form>
          </div>

          {/* Columna 4: Legales */}
          <div>
            <h4 className="text-2xl font-black text-orange-500 mb-6">LEGALES</h4>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li><a href="/terminos" className="hover:text-orange-500 transition">Términos y Condiciones</a></li>
              <li><a href="/privacidad" className="hover:text-orange-500 transition">Política de Privacidad</a></li>
              <li><a href="/devoluciones" className="hover:text-orange-500 transition">Cambios y Devoluciones</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-orange-500 mt-16 pt-10 text-center">
          <p className="text-gray-400 text-lg">
            © 2025 Auto Service Liam Yahir • Todos los derechos reservados
          </p>
          <p className="text-orange-500 text-xl font-bold mt-4">
            Realizado por{" "}
            <a href="https://tinuxsoluciones.online" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-400 transition">
              TinuX SolucioneS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
