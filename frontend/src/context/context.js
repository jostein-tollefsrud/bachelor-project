// src/context/state.js
import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children, initialValue }) {
  //   console.log(initialValue);

  return (
    <AppContext.Provider value={initialValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
