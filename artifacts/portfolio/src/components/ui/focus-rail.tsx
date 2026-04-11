import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */
const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 450,
  damping: 18,
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  // Autoplay — CSS animation drives the progress bar, a single timeout advances the slide.
  // This replaces a 30ms setInterval that was forcing ~33 re-renders/sec of the whole carousel.
  React.useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(handleNext, interval);
    return () => clearTimeout(t);
  }, [autoPlay, handleNext, interval, active]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-[520px] md:h-[580px] w-full flex-col overflow-hidden rounded-3xl text-white outline-none select-none",
        className
      )}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      style={{ background: "hsl(222 47% 8%)" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,8%)] via-[hsl(222,47%,8%)/70%] to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[280px] md:h-[320px] w-full max-w-6xl items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 200;
            const zOffset = -dist * 120;
            const scale = isCenter ? 1 : 0.8;
            const rotateY = offset * -15;

            const opacity = isCenter ? 1 : Math.max(0.15, 1 - dist * 0.45);
            const blur = isCenter ? 0 : dist * 4;
            const brightness = isCenter ? 1 : 0.6;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[3/4] w-[180px] md:w-[220px] rounded-2xl border border-white/10 bg-background/80 backdrop-blur-sm shadow-2xl",
                  isCenter ? "z-20 shadow-primary/20 border-primary/30" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={BASE_SPRING}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <div className="h-full w-full rounded-2xl overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-lg"
                  />
                </div>

                {/* Lighting layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Glow effect for active card */}
                {isCenter && (
                  <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl -z-10" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-center justify-between gap-5 md:flex-row pointer-events-auto px-4">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left min-h-[100px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-md text-sm text-muted-foreground">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-3">
            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  className="relative overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 28 : 8,
                    height: 8,
                    background: i === activeIndex ? "transparent" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {i === activeIndex && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-primary/30" />
                      <span
                        key={active}
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        style={{
                          width: "100%",
                          transformOrigin: "left center",
                          willChange: "transform",
                          animation: autoPlay
                            ? `focus-rail-progress ${interval}ms linear forwards`
                            : undefined,
                          transform: autoPlay ? undefined : "scaleX(1)",
                        }}
                      />
                    </>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-background/60 p-1 ring-1 ring-white/10 backdrop-blur-md">
                <button
                  onClick={handlePrev}
                  className="rounded-full p-2.5 text-muted-foreground transition hover:bg-white/10 hover:text-white active:scale-95"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[36px] text-center text-xs font-mono text-muted-foreground">
                  {activeIndex + 1} / {count}
                </span>
                <button
                  onClick={handleNext}
                  className="rounded-full p-2.5 text-muted-foreground transition hover:bg-white/10 hover:text-white active:scale-95"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {activeItem.href && (
                <a
                  href={activeItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  Verify
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
