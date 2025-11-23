import { createContext, useContext, useState, useEffect } from "react";

const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
  const [deliveryCost, setDeliveryCost] = useState(null);

  // Cargar delivery guardado
  useEffect(() => {
    const saved = localStorage.getItem("deliveryCost");
    if (saved !== null) {
      setDeliveryCost(Number(saved));
    }
  }, []);

  const updateDelivery = (cost) => {
    setDeliveryCost(cost);
    localStorage.setItem("deliveryCost", cost);
  };

  return (
    <DeliveryContext.Provider value={{ deliveryCost, updateDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => useContext(DeliveryContext);
