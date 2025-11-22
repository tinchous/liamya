export default function Cart({ cart, onSend, onClear, onContinue }) {
  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const deliveryCost = total > 0 && total < 1500 ? 50 : 0;
  const faltante = total < 1500 ? 1500 - total : 0;
  const totalConEnvio = total + deliveryCost;

  return (
    <div className="fixed bottom-24 right-6 bg-black/90 border-2 border-neonOrange shadow-[0_0_25px_#ff8c00] rounded-2xl p-5 w-80 z-50 text-white backdrop-blur-md">
      <h3 className="font-display text-neonOrange text-xl mb-3 drop-shadow-[0_0_10px_#ff8c00] text-center">
        🛒 Carrito de Compras
      </h3>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-center mb-4">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="text-sm text-gray-200 mb-4 max-h-48 overflow-y-auto">
            {cart.map((item) => (
              <li
                key={item.nombre}
                className="flex justify-between items-center border-b border-gray-700 py-1"
              >
                <span className="text-gray-300 w-40 truncate">
                  {item.nombre} x {item.quantity}
                </span>
                <span className="text-neonRed text-right">
                  ${item.precio * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 space-y-1">
            <p className="text-right text-gray-300">Subtotal: ${total.toFixed(2)}</p>

            {deliveryCost > 0 ? (
              <p className="text-right text-yellow-400 font-semibold">
                + Envío: ${deliveryCost}
              </p>
            ) : (
              <p className="text-right text-green-400 font-semibold">
                🚀 ¡Envío Gratis!
              </p>
            )}

            <p className="text-right text-neonOrange font-bold text-lg mt-1">
              Total: ${totalConEnvio.toFixed(2)}
            </p>

            {faltante > 0 && (
              <p className="text-center text-gray-400 text-sm mt-2">
                Te faltan{" "}
                <span className="text-neonOrange font-semibold">
                  ${faltante.toFixed(0)}
                </span>{" "}
                para el envío <span className="text-neonOrange font-semibold">GRATIS</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={onSend}
              className="w-full bg-green-500 text-black py-2 rounded-lg font-bold hover:bg-green-400 transition transform hover:scale-105 shadow-[0_0_15px_#00FF7F]"
            >
              ✅ Realizar Pedido
            </button>

            <button
              onClick={onContinue}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition transform hover:scale-105"
            >
              🛍️ Seguir Comprando
            </button>

            <button
              onClick={onClear}
              className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              🗑️ Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
