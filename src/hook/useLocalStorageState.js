import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValueItem] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // useEffect(
  //   function () {
  //     localStorage.setItem(key, JSON.stringify(value));
  //   },
  //   [value, key]
  // );
  useEffect(() => {
    // Get the current value from localStorage to avoid unnecessary updates
    const storedValue = localStorage.getItem(key);
    
    if (storedValue !== JSON.stringify(value)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    // No cleanup needed in this scenario
  }, [value, key]);
  

  return [value, setValueItem];
}
