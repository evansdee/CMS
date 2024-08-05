/* eslint-disable react/prop-types */

import { createContext, useContext } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const EnrollmentContext = createContext();

export default function EnrollmentListContext({ children }) {
  const [enrollArr, setEnroll] = useLocalStorageState([], "enroll");
  return (
    <EnrollmentContext.Provider value={{ enrollArr, setEnroll }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useLocalEnroll() {
  const context = useContext(EnrollmentContext);
  if (!context) throw new Error("not here");
  return context;
}
