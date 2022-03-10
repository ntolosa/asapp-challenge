import { createContext, useContext } from "react";

export const citiesContext = createContext();

export const useCities = () => useContext(citiesContext);
