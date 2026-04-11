import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroProps {
  onDone: () => void;
}

const LINES: { text: string; color?: string; delay: number }[] = [
  { text: "$ npm run dev", color: "text-foreground/70", delay: 0 },
  { text: "", delay: 200 },
  { text: "> Getting changes for Guest User...", color: "text-primary/70", delay: 380 },
  { text: "", delay: 520 },
  { text: "  ✓ hero.tsx", color: "text-green-400/80", delay: 660 },
  { text: "  ✓ about.tsx", color: "text-green-400/80", delay: 800 },
  { text: "  ✓ experience.tsx", color: "text-green-400/80", delay: 940 },
  { text: "  ✓ projects.tsx", color: "text-green-400/80", delay: 1080 },
  { text: "  ✓ contact.tsx", color: "text-green-400/80", delay: 1220 },
  { text: "", delay: 1320 },
  { text: "  ✓ Retrieved 5 components successfully", color: "text-primary/60", delay: 1440 },
  { text: "", delay: 1560 },
  { text: "  → ready.", color: "text-foreground", delay: 1700 },
];

const PROGRESS_DONE_AT = 1700;
const EXIT_DELAY = 2300;

export function Intro({ onDone }: IntroProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Schedule each line
    LINES.forEach((line, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), line.delay);
      timers.current.push(t);
    });

    // Animate progress bar
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(elapsed / PROGRESS_DONE_AT, 1));
      if (elapsed < PROGRESS_DONE_AT) rafId = requestAnimationFrame(tick);
      else setProgress(1);
    };
    rafId = requestAnimationFrame(tick);

    // Trigger exit
    const exitTimer = setTimeout(() => setExiting(true), EXIT_DELAY);
    timers.current.push(exitTimer);

    // Notify parent after exit animation completes
    const doneTimer = setTimeout(onDone, EXIT_DELAY + 500);
    timers.current.push(doneTimer);

    return () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(38,143,204,0.06) 0%, transparent 70%)" }} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
            className="w-full max-w-lg mx-4"
          >
            {/* Terminal window */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40"
              style={{ background: "hsl(220 15% 8%)" }}>

              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30"
                style={{ background: "hsl(220 15% 10%)" }}>
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-muted-foreground/40 font-mono tracking-wide">
                  bash — ~/portfolio
                </span>
              </div>

              {/* Terminal body */}
              <div className="px-5 py-5 font-mono text-sm min-h-[220px]">
                {LINES.slice(0, visibleCount).map((line, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${line.color ?? "text-foreground/50"}`}
                    style={{ minHeight: "1.5rem" }}
                  >
                    {line.text}
                    {/* Blinking cursor on last visible line */}
                    {i === visibleCount - 1 && visibleCount < LINES.length && (
                      <span className="inline-block w-2 h-[1.1em] ml-0.5 align-middle rounded-sm animate-pulse"
                        style={{ background: "hsl(var(--primary))", opacity: 0.8 }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="px-5 pb-5">
                <div className="h-[2px] w-full rounded-full bg-border/20 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress * 100}%`,
                      background: "linear-gradient(90deg, hsl(207 72% 40%), hsl(207 72% 60%))",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
