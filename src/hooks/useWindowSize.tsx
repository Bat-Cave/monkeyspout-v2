import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedHandleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
};
