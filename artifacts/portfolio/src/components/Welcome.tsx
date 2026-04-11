import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WelcomeProps {
  onExitStart: () => void;
  onDone: () => void;
}

const SHOW_MS = 900;
const EXIT_MS = 700;

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
      initial={{ opacity: 0 }}
      animate={exiting ? { opacity: 0, y: "-100%" } : { opacity: 1, y: 0 }}
      transition={{
        duration: exiting ? EXIT_MS / 1000 : 0.35,
        ease: exiting ? [0.76, 0, 0.24, 1] : [0.215, 0.61, 0.355, 1],
      }}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
    >
      {/* Subtle glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(38,143,204,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
        className="text-center relative z-10"
      >
        <h1 className="text-gradient text-6xl md:text-8xl font-extrabold leading-none tracking-tight">
          Welcome
        </h1>
      </motion.div>
    </motion.div>
  );
}
