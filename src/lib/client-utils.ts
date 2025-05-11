"use client";

import { useState, useEffect } from "react";

// Hook to safely access window dimensions
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

// Check if current route is homepage
export function useIsHomePage() {
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    // Check if pathname is just the language code (e.g., /en, /fr)
    const isHome = /^\/[a-z]{2}$/.test(pathname);
    setIsHomePage(isHome);
  }, []);

  return isHomePage;
}
