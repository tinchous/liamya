import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/DeliveryContext";
import CheckoutModal from "./CheckoutModal";
import { Link } from "react-router-dom";

export default function FloatingCart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, quitar, vaciarCarrito, agregar } = useCart();
  const { deliveryCost } = useDelivery();

  if (cart.length === 0) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const deliveryFinal = deliveryCost !== null 
    ? deliveryCost 
    : (subtotal >= 1500 ? 0 : null);

  const totalFinal = subtotal + (deliveryFinal !== null ? deliveryFinal : 0);

  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23333'/%3E%3Ctext x='40' y='50' font-size='30' text-anchor='middle' fill='%23999'%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E";

  return (
    <>
      <div className="fixed right-8 bottom-8 z-40 w-96 bg-gray-900/95 border-8 border-orange-500 rounded-3xl shadow-2xl">
        <div className="bg-orange-600 p-4 flex justify-between items-center">
          <h3 className="text-3xl font-black text-black">TU PEDIDO</h3>
          <button onClick={vaciarCarrito} className="text-black hover:scale-110"><X className="w-10 h-10" /></button>
        </div>

        <div className="max-h-96 overflow-y-auto p-6 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-black/60 rounded-2xl p-5 border-4 border-orange-500/50">
              <div className="flex gap-4">
                <img 
                  src={item.codigo_barra ? `https://res.cloudinary.com/djq691oyz/image/upload/v1763528615/${item.codigo_barra}.jpg` : placeholder} 
                  alt={item.nombre} 
                  className="w-24 h-24 object-cover rounded-xl" 
                  onError={e => e.target.src = placeholder} 
                />
                <div className="flex-1">
                  <p className="text-orange-400 font-black text-xl">{item.nombre}</p>
                  <p className="text-green-400 text-2xl mt-2">
                    ${item.precio} × {item.quantity} = <span className="text-yellow-300 font-black">${item.precio * item.quantity}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-4">
                <button onClick={() => quitar(item)} className="bg-red-600 hover:bg-red-500 w-14 h-14 rounded-full text-4xl font-bold">-</button>
                <span className="text-4xl font-black text-orange-400 w-20 text-center flex items-center justify-center">{item.quantity}</span>
                <button onClick={() => agregar(item)} className="bg-green-600 hover:bg-green-500 w-14 h-14 rounded-full text-4xl font-bold">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black p-6 border-t-4 border-orange-500">
          <div className="space-y-3 text-2xl font-bold">
            <p className="flex justify-between"><span>Subtotal:</span> <span className="text-green-400">${subtotal}</span></p>
            <p className="flex justify-between">
              <span>Delivery:</span>
              {deliveryFinal === null ? (
                <Link to="/delivery" className="text-orange-400 underline hover:text-orange-300">
                  a confirmar
                </Link>
              ) : (
                <span className={deliveryFinal === 0 ? "text-green-400" : "text-orange-400"}>
                  {deliveryFinal === 0 ? "GRATIS 🎉" : `$${deliveryFinal}`}
                </span>
              )}
            </p>
            <p className="flex justify-between text-4xl text-orange-500">
              <span>TOTAL:</span> <span>${totalFinal}</span>
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button onClick={vaciarCarrito} className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold text-xl">Vaciar Carrito</button>
            <button onClick={() => setShowCheckout(true)} className="w-full bg-green-500 hover:bg-green-400 text-black py-5 rounded-2xl font-black text-3xl shadow-2xl">
              FINALIZAR PEDIDO
            </button>
          </div>
        </div>
      </div>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
}
