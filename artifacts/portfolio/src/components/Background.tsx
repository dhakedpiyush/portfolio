import { useEffect, useRef } from "react";

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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 65;
    const MAX_DIST = 130;
    const particles: Particle[] = [];
    let rafId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dotColor = "38, 143, 204";
      const lineColor = "38, 143, 204";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.75 }}
      />

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left: primary blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "5%",
            left: "-12%",
            background: "radial-gradient(circle, rgba(38,143,204,0.05) 0%, transparent 65%)",
            animation: "float-orb 20s ease-in-out infinite",
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
            background: "radial-gradient(circle, rgba(112,96,186,0.04) 0%, transparent 65%)",
            animation: "float-orb 25s ease-in-out infinite reverse",
            animationDelay: "-4s",
          }}
        />
        {/* Bottom-center: light cyan */}
        <div
          className="absolute rounded-full"
          style={{
            width: 450,
            height: 450,
            bottom: "10%",
            left: "28%",
            background: "radial-gradient(circle, rgba(38,143,204,0.032) 0%, transparent 65%)",
            animation: "float-orb 30s ease-in-out infinite",
            animationDelay: "-9s",
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
            background: "radial-gradient(circle, rgba(38,143,204,0.022) 0%, transparent 65%)",
            animation: "float-orb 18s ease-in-out infinite reverse",
            animationDelay: "-12s",
          }}
        />
      </div>
    </>
  );
}
