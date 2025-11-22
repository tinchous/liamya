import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FloatingCart() {
  const { cart, vaciar } = useCart();
  const total = cart.reduce((sum, i) => sum + i.precio * i.quantity, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 bg-black border-8 border-orange-500 rounded-3xl p-8 shadow-2xl shadow-orange-500/70">
      <div className="flex items-center gap-6 mb-6">
        <ShoppingCart className="w-20 h-20 text-orange-500" />
        <div>
          <p className="text-4xl font-black text-orange-400">{totalItems} items</p>
          <p className="text-5xl font-black text-green-400">${total}</p>
        </div>
      </div>
      <button className="w-full bg-orange-500 text-black text-3xl font-bold py-6 rounded-2xl hover:bg-orange-400 transition">
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}
