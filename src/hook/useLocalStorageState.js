import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValueItem] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValueItem];
}
