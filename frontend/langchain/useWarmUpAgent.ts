import { useEffect } from "react";

let warmed = false;
// If not warmed up yet, trigger the warm‑up endpoint
export function useWarmUpAgent() {
  useEffect(() => {
    if (!warmed) {
      warmed = true;
      fetch("/api/warm-up").catch(console.error);
    }
  }, []);
}
