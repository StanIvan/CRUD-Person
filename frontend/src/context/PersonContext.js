import { createContext, useReducer } from "react";

export const PersonsContext = createContext();
export const personsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERSONS":
      return {
        persons: action.payload,
      };
    case "CREATE_PERSON":
      return {
        persons: [action.payload, ...state.persons],
      };
    case "DELETE_PERSON":
      return {
        persons: state.persons.filter((p) => p._id !== action.payload._id),
      };
    case "UPDATE_PERSON":
      if (!state.persons) {
        return state; // Return the current state if persons is null or undefined
      }
      // Find the index of the person to be updated in the array
      const updatedPersonIndex = state.persons.findIndex(
        (p) => p._id === action.payload._id
      );
      // Create a copy of the state and update the person at the found index
      const updatedPersons = [...state.persons];
      if (updatedPersonIndex !== -1) {
        updatedPersons[updatedPersonIndex] = action.payload;
      }
      return {
        persons: updatedPersons,
      };
    default:
      return state;
  }
};

export const PersonsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personsReducer, { persons: null });
  return (
    <PersonsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PersonsContext.Provider>
  );
};
