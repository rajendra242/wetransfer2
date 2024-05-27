import { useCallback, useEffect, useState } from "react";

const APP_ID = "euretina-quiz";

export default function useLocalStorage(storageKey, initialValue) {
  const key = `${APP_ID}${APP_ID && "-"}${storageKey}`;
  const getValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Set initial value to false if we don't want to save initial value
      if ((!item || item === "undefined") && initialValue !== false) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }

      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(getValue());

  useEffect(() => {
    setStoredValue(getValue());
  }, [storageKey, initialValue, getValue]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

     

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
