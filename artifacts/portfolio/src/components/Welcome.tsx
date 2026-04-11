import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WelcomeProps {
  onExitStart: () => void;
  onDone: () => void;
}

const SHOW_MS = 850;
const EXIT_MS = 600;

export function Welcome({ onExitStart, onDone }: WelcomeProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setExiting(true);
      onExitStart();
    }, SHOW_MS);
    const t2 = setTimeout(onDone, SHOW_MS + EXIT_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onExitStart, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={exiting ? { opacity: 0, y: "-100%" } : { opacity: 1, y: 0 }}
      transition={{
        duration: exiting ? EXIT_MS / 1000 : 0.3,
        ease: exiting ? [0.7, 0, 0.2, 1] : [0.25, 0.46, 0.45, 0.94],
      }}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Subtle glow — lighter, gpu-only */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(38,143,204,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center relative z-10"
        style={{ willChange: "transform, opacity" }}
      >
        <h1 className="text-gradient text-6xl md:text-8xl font-extrabold leading-none tracking-tight">
          Welcome
        </h1>
      </motion.div>
    </motion.div>
  );
}
