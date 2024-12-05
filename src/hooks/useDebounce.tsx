import { useEffect, useRef, useState } from "react";

type InputValue = string | number | undefined | null;

type TimeoutId = ReturnType<typeof setTimeout>;

export function useDebounce(value: InputValue, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<TimeoutId>();

  const input = `${value}`;

  useEffect(() => {
    const identifier: TimeoutId = setTimeout(() =>
      setDebouncedValue(input),
      delay || 500
    );

    timerRef.current = identifier;

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
