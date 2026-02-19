import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

export default function ScrollRestoration() {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    // Restore scroll when navigating back
    if (prevPath.current && scrollPositions.has(currentPath)) {
      window.scrollTo(0, scrollPositions.get(currentPath)!);
    } else {
      // New page → go to top
      window.scrollTo(0, 0);
    }

    prevPath.current = currentPath;

    return () => {
      // Save scroll position before leaving page
      scrollPositions.set(currentPath, window.scrollY);
    };
  }, [location.pathname]);

  return null;
}
