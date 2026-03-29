import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Smooth springs for cursor movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (hidden) setHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, hidden]);

  if (typeof window === "undefined" || hidden) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: 32,
          height: 32,
          backgroundColor: isHovered ? "white" : "rgba(0, 212, 255, 0.5)",
          border: isHovered ? "none" : "2px solid rgba(0, 161, 224, 0.8)",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 2.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-primary"
        style={{
          x: position.x - 4,
          y: position.y - 4,
          width: 8,
          height: 8,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  );
}
