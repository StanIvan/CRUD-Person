import { PersonsContext } from "../context/PersonContext";
import { useContext } from "react";

export const usePersonContext = () => {
  const context = useContext(PersonsContext);

  if (!context) {
    throw Error("Error context");
  }

  return context;
};
