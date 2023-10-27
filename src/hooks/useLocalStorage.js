import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  // if for example we use nextjs it doesnt have window object so we check. Wanna make this hook applicable to other projects
  if (typeof window === "undefined") return initValue;

  // if a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return a result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
