import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const CERTS = [
  {
    id: "7476968",
    name: "Salesforce Certified Platform Administrator",
    date: "Feb 22, 2026",
    image: "/images/cert-admin.png",
    color: "from-blue-600 to-cyan-400",
    borderColor: "rgba(0,161,224,0.7)",
    glow: "rgba(0,161,224,0.25)",
    tag: "Administration",
  },
  {
    id: "4617729",
    name: "Salesforce Certified Platform Developer I",
    date: "Jun 22, 2024",
    image: "/images/cert-developer.png",
    color: "from-indigo-600 to-blue-400",
    borderColor: "rgba(99,102,241,0.7)",
    glow: "rgba(99,102,241,0.25)",
    tag: "Development",
  },
  {
    id: "5632130",
    name: "Salesforce Certified Agentforce Specialist",
    date: "Jan 12, 2025",
    image: "/images/cert-agentforce.png",
    color: "from-purple-600 to-indigo-400",
    borderColor: "rgba(139,92,246,0.7)",
    glow: "rgba(139,92,246,0.25)",
    tag: "AI & Agents",
  },
  {
    id: "5504441",
    name: "Salesforce Certified AI Associate",
    date: "Dec 22, 2024",
    image: "/images/cert-ai-associate.png",
    color: "from-cyan-500 to-sky-400",
    borderColor: "rgba(6,182,212,0.7)",
    glow: "rgba(6,182,212,0.25)",
    tag: "Artificial Intelligence",
  },
  {
    id: "2740409",
    name: "Salesforce Certified Platform Foundations",
    date: "Nov 2022",
    image: "/images/cert-foundations.png",
    color: "from-sky-500 to-blue-400",
    borderColor: "rgba(14,165,233,0.7)",
    glow: "rgba(14,165,233,0.25)",
    tag: "Foundations",
  },
];

const INTERVAL_MS = 3200;

export function Certifications() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => setActive(i => (i + 1) % CERTS.length), []);
  const prev = useCallback(() => setActive(i => (i - 1 + CERTS.length) % CERTS.length), []);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / INTERVAL_MS) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        next();
      }
    }, 30);
    return () => clearInterval(tick);
  }, [active, next]);

  const getOffset = (index: number) => {
    let diff = index - active;
    if (diff > CERTS.length / 2) diff -= CERTS.length;
    if (diff < -CERTS.length / 2) diff += CERTS.length;
    return diff;
  };

  const cert = CERTS[active];

  return (
    <section
      id="certifications"
      className="py-24 relative z-20 bg-black/20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ShieldCheck size={16} /> 5x Certified
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Salesforce Credentials</h2>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm">
            Verified credentials across administration, development, AI, and emerging Salesforce technologies.
          </p>
        </motion.div>

        {/* Carousel stage */}
        <div className="relative flex items-center justify-center" style={{ height: 300 }}>
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 z-30 p-2 rounded-full bg-background/80 border border-white/10 text-muted-foreground hover:text-white hover:border-white/30 transition-all shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          {CERTS.map((c, i) => {
            const offset = getOffset(i);
            const abs = Math.abs(offset);
            const isActive = abs === 0;

            const xPx = offset * 220;
            const scale = isActive ? 1 : abs === 1 ? 0.74 : 0.56;
            const opacity = isActive ? 1 : abs === 1 ? 0.38 : 0.12;
            const zIndex = 20 - abs;

            return (
              <motion.div
                key={c.id}
                animate={{ x: xPx, scale, opacity }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                style={{ position: "absolute", zIndex, originX: "50%" }}
                onClick={() => !isActive && setActive(i)}
                className={!isActive ? "cursor-pointer" : ""}
              >
                <div
                  className="relative rounded-2xl p-[1.5px] shadow-2xl"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${c.borderColor}, transparent 60%)`
                      : "rgba(255,255,255,0.08)",
                    width: 190,
                  }}
                >
                  {/* Glow behind active card */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl blur-2xl -z-10 scale-110"
                      style={{ background: c.glow }}
                    />
                  )}

                  <div className="bg-background/90 backdrop-blur-xl rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="object-contain drop-shadow-lg"
                      style={{ width: isActive ? 120 : 90, height: isActive ? 120 : 90, transition: "all 0.4s" }}
                      draggable={false}
                    />
                    {isActive && (
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r ${c.color} text-white`}
                      >
                        {c.tag}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 z-30 p-2 rounded-full bg-background/80 border border-white/10 text-muted-foreground hover:text-white hover:border-white/30 transition-all shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Active cert details panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-8 flex flex-col items-center text-center gap-3"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground">{cert.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Issued: <span className="text-foreground/80 font-medium">{cert.date}</span></span>
              <span className="opacity-30">·</span>
              <span className="font-mono text-xs opacity-60">ID #{cert.id}</span>
            </div>
            <a
              href="https://sforce.co/verifycerts"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${cert.color} text-white hover:opacity-90 transition-opacity shadow-lg`}
            >
              Verify Credential <ExternalLink size={11} />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav + progress */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {CERTS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className="relative overflow-hidden rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  background: i === active ? "transparent" : "rgba(255,255,255,0.2)",
                }}
              >
                {i === active && (
                  <>
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c.borderColor}, rgba(255,255,255,0.3))`, opacity: 0.3 }}
                    />
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c.borderColor}, rgba(255,255,255,0.6))` }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0 }}
                    />
                  </>
                )}
              </button>
            ))}
          </div>

          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            All credentials verified at
            <a
              href="https://sforce.co/verifycerts"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              sforce.co/verifycerts <ExternalLink size={10} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
