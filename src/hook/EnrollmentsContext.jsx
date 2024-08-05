/* eslint-disable react/prop-types */

import { createContext, useContext } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const EnrollmentContext = createContext();

export default function EnrollmentsContext({ children }) {
  const [data, setData] = useLocalStorageState([], "enrollment");
  return (
    <EnrollmentContext.Provider value={{ data, setData }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useLocalEnrollments() {
  const context = useContext(EnrollmentContext);
  if (!context) throw new Error("not here");
  return context;
}
