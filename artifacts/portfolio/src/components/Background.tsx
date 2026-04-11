import { useEffect, useRef } from "react";
import { isLowPerfDeviceSync } from "@/hooks/use-perf";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const lowPerf = isLowPerfDeviceSync();
    // Cheaper settings on mobile / low-end: fewer particles, skip line connections,
    // smaller DPR, and a viewport-height canvas instead of full-document canvas.
    const PARTICLE_COUNT = lowPerf ? 28 : 60;
    const MAX_DIST = 130;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const DRAW_LINES = !lowPerf;
    const DPR = Math.min(window.devicePixelRatio || 1, lowPerf ? 1 : 1.5);

    const particles: Particle[] = [];
    let rafId = 0;
    let width = 0;
    let height = 0;
    let running = true;
    let lastTime = 0;
    const FRAME_MIN_MS = lowPerf ? 1000 / 40 : 1000 / 60; // throttle to ~40fps on low-end

    const resize = () => {
      width = window.innerWidth;
      // Use viewport height on low-end so the canvas stays small; only fixed element anyway.
      height = lowPerf ? window.innerHeight : window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.3 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const DOT_COLOR = "38, 143, 204";

    const draw = (t: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(draw);

      if (t - lastTime < FRAME_MIN_MS) return;
      lastTime = t;

      ctx.clearRect(0, 0, width, height);

      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR}, ${p.opacity})`;
        ctx.fill();
      }

      if (DRAW_LINES) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < len; i++) {
          const p = particles[i];
          for (let j = i + 1; j < len; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < MAX_DIST_SQ) {
              const alpha = (1 - Math.sqrt(distSq) / MAX_DIST) * 0.12;
              ctx.strokeStyle = `rgba(${DOT_COLOR}, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    // Pause the loop when the tab is hidden to save battery / CPU.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        lastTime = 0;
        rafId = requestAnimationFrame(draw);
      }
    };

    resize();
    init();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const lowPerf = isLowPerfDeviceSync();

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.75 }}
      />

      {/* Floating gradient orbs — expensive compositor layers, so we ship fewer on low-end */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left: primary blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "5%",
            left: "-12%",
            background:
              "radial-gradient(circle, rgba(38,143,204,0.05) 0%, transparent 65%)",
            animation: lowPerf ? undefined : "float-orb 20s ease-in-out infinite",
            willChange: lowPerf ? undefined : "transform",
          }}
        />
        {/* Middle-right: purple accent */}
        <div
          className="absolute rounded-full"
          style={{
            width: 550,
            height: 550,
            top: "45%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(112,96,186,0.04) 0%, transparent 65%)",
            animation: lowPerf ? undefined : "float-orb 25s ease-in-out infinite reverse",
            animationDelay: "-4s",
            willChange: lowPerf ? undefined : "transform",
          }}
        />
        {!lowPerf && (
          <>
            {/* Bottom-center: light cyan */}
            <div
              className="absolute rounded-full"
              style={{
                width: 450,
                height: 450,
                bottom: "10%",
                left: "28%",
                background:
                  "radial-gradient(circle, rgba(38,143,204,0.032) 0%, transparent 65%)",
                animation: "float-orb 30s ease-in-out infinite",
                animationDelay: "-9s",
                willChange: "transform",
              }}
            />
            {/* Top-right: subtle warm blue */}
            <div
              className="absolute rounded-full"
              style={{
                width: 380,
                height: 380,
                top: "15%",
                right: "15%",
                background:
                  "radial-gradient(circle, rgba(38,143,204,0.022) 0%, transparent 65%)",
                animation: "float-orb 18s ease-in-out infinite reverse",
                animationDelay: "-12s",
                willChange: "transform",
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
