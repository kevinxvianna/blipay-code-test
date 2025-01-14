import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue?: string) => {
  const [storedValue, setStoredValue] = useState(defaultValue || null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : null);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = (value: object) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getValue,
    setValue,
    removeItem,
  };
};
