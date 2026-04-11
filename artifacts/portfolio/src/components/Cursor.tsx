import { useEffect, useRef } from "react";

const BLUE = "rgba(38, 143, 204, 1)";
const WHITE = "rgba(255, 255, 255, 1)";

function isMouseDevice() {
  return typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;
}

/** Walk up the DOM and return the first non-transparent background color found */
function getBgColor(el: HTMLElement | null): string {
  while (el && el !== document.body) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    el = el.parentElement;
  }
  return "rgba(0,0,0,0)";
}

/** Returns true if the color is blue-ish (matches our primary #00A1E0) */
function isBlueBackground(color: string): boolean {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const r = +m[1], g = +m[2], b = +m[3];
  // Primary blue: r≈0, g≈161, b≈224 — detect high-blue, low-red
  return b > 150 && b > r * 3 && b >= g * 0.6;
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMouseDevice()) return;
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      dot.style.opacity = "1";
    };

    const onLeave = () => { dot.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;

      // Size: grow on interactive elements
      const interactive = t.tagName === "A" || t.tagName === "BUTTON" ||
        !!t.closest("a") || !!t.closest("button");
      dot.style.width  = interactive ? "12px" : "8px";
      dot.style.height = interactive ? "12px" : "8px";

      // Color: white on blue bg, blue everywhere else
      const bg = getBgColor(t);
      dot.style.backgroundColor = isBlueBackground(bg) ? WHITE : BLUE;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!isMouseDevice()) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: BLUE,
        pointerEvents: "none",
        zIndex: 10000,
        opacity: 0,
        willChange: "transform",
        transition: "width 0.12s ease, height 0.12s ease, background-color 0.1s ease",
      }}
    />
  );
}
