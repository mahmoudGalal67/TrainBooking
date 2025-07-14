import { createContext, useContext, useState } from 'react'

const RailwayCon = createContext()

export const RailwayContext = ({ children }) => {
  const [railway, setRailway] = useState([])
  const [carDetails, setcarDetails] = useState(null)
  return (
    <RailwayCon.Provider
      value={{ railway, setRailway, setcarDetails, carDetails }}
    >
      {children}
    </RailwayCon.Provider>
  )
}

export const useRailway = () => useContext(RailwayCon)
