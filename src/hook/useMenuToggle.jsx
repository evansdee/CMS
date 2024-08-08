import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export default function ToggleProvider({ children }) {
  const [isSideToggle, setIsSideToggle] = useState(false);


  return (
    <ToggleContext.Provider value={{ isSideToggle, setIsSideToggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useMenuToggle(){
  const context = useContext(ToggleContext)

  return context
}

export {ToggleContext,}

// export function useMenu(){
//     const context = useContext()

//     return context
// }
