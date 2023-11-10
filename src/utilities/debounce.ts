import { useRef } from "react";

export function useDebounce(
  callback: (...params: any[]) => void,
  timeout: number
) {
  const timeoutRef = useRef<number>();

  return (...args: any[]) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callback, timeout, ...args);
  };
}
