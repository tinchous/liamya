import React, { createContext, useContext, useState } from 'react'

const DeliveryContext = createContext()

export function DeliveryProvider({ children }) {
  const [delivery, setDelivery] = useState(null)

  return (
    <DeliveryContext.Provider value={{ delivery, setDelivery }}>
      {children}
    </DeliveryContext.Provider>
  )
}
