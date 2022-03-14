import { createContext, useContext } from "react";

export const globalStateContext = createContext();

export const useGlobalState = () => useContext(globalStateContext);
