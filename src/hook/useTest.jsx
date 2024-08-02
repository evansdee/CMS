/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TestContext = createContext();

export function TestProvider({ children }) {
  const [email, setEmail] = useState("ictu");
  return (
    <TestContext.Provider value={{ email, setEmail }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);

  return context;
}
