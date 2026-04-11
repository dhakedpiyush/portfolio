import { useEffect, useState } from "react";

/**
 * Detects whether the current device is "low-end" or mobile.
 * Used to scale down expensive visual effects so the site stays 60fps
 * on budget phones and older laptops.
 */
export function useLowPerfDevice() {
  const [low, setLow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return computeLowPerf();
  });

  useEffect(() => {
    const onResize = () => setLow(computeLowPerf());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return low;
}

function computeLowPerf(): boolean {
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const cores = (navigator as any).hardwareConcurrency ?? 8;
  const mem = (navigator as any).deviceMemory ?? 8;
  return !!reduced || coarse || narrow || cores <= 4 || mem <= 4;
}

/** Synchronous snapshot. Use for render-time decisions that don't need to react to resize. */
export function isLowPerfDeviceSync(): boolean {
  return computeLowPerf();
}

/** True when the device has a fine pointer (mouse/trackpad). */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
}
