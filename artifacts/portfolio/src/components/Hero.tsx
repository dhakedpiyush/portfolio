import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ExternalLink, MapPin, Mountain } from "lucide-react";

const FULL_NAME = "Piyush Dhaked";
const TYPE_SPEED = 90;
const START_DELAY = 600;

function MagneticButton({
  href,
  children,
  primary,
  external,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.25s ease, box-shadow 0.3s ease" }}
      className={
        primary
          ? "px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:shadow-[0_0_32px_rgba(0,161,224,0.4)] relative overflow-hidden shimmer-btn"
          : "px-8 py-4 rounded-full glass font-semibold flex items-center gap-2 hover:bg-white/10 text-foreground hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      }
    >
      {children}
    </a>
  );
}

export function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 40, damping: 18 };
  const sX = useSpring(mouseX, springCfg);
  const sY = useSpring(mouseY, springCfg);

  const orb1X = useTransform(sX, [-1, 1], [-40, 40]);
  const orb1Y = useTransform(sY, [-1, 1], [-25, 25]);
  const orb2X = useTransform(sX, [-1, 1], [30, -30]);
  const orb2Y = useTransform(sY, [-1, 1], [20, -20]);
  const imgX  = useTransform(sX, [-1, 1], [-12, 12]);
  const imgY  = useTransform(sY, [-1, 1], [-8,  8]);
  const txtX  = useTransform(sX, [-1, 1], [5, -5]);
  const txtY  = useTransform(sY, [-1, 1], [3, -3]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      mouseY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const type = () => {
        idx++;
        setDisplayed(FULL_NAME.slice(0, idx));
        if (idx < FULL_NAME.length) {
          timer = setTimeout(type, TYPE_SPEED);
        } else {
          setDone(true);
          setTimeout(() => setCursorVisible(false), 1200);
        }
      };
      type();
    }, START_DELAY);
    return () => { clearTimeout(start); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (done) return;
    const b = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(b);
  }, [done]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-aurora"
    >
      {/* Parallax orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/8 rounded-full blur-[140px] pointer-events-none z-0"
        style={{ x: orb2X, y: orb2Y }}
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-0" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left — text */}
        <motion.div
          className="flex-1 flex flex-col items-start text-left"
          style={{ x: txtX, y: txtY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="font-extrabold mb-4"
          >
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.05 }}
              className="block text-3xl md:text-4xl text-foreground/70 font-medium mb-1"
            >
              Hi, I'm
            </motion.span>
            <span className="text-gradient text-5xl md:text-6xl lg:text-7xl whitespace-nowrap inline-flex items-center">
              {displayed}
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "0.85em",
                  marginLeft: "4px",
                  borderRadius: "2px",
                  verticalAlign: "middle",
                  background: "hsl(var(--primary))",
                  opacity: cursorVisible ? 1 : 0,
                  transition: done ? "opacity 0.4s ease" : "none",
                  flexShrink: 0,
                }}
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="flex flex-col gap-1 mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-display text-muted-foreground">
              Salesforce Developer{" "}
              <a href="https://www.metadologie.com/" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors">
                @ Metadologie Inc
              </a>
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <a href="https://maps.app.goo.gl/xRoTsfy1VsHqmem68" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <MapPin size={14} className="text-primary group-hover:scale-110 transition-transform" />
                Jaipur, Rajasthan, India
              </a>
              <span className="text-border">·</span>
              <a href="https://www.metadologie.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink size={12} />
                metadologie.com
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, filter: "blur(4px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.75, delay: 0.48 }}
            className="text-lg text-foreground/70 max-w-xl mb-10 leading-relaxed"
          >
            5x Certified Salesforce Developer with 4 years of experience specializing in Apex, LWC, and Service Cloud. Based in Jaipur, building enterprise-scale solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" primary>
              View My Work <ArrowDown size={18} />
            </MagneticButton>
            <MagneticButton href="https://linkedin.com/in/piyushdhaked" external>
              LinkedIn <ExternalLink size={18} />
            </MagneticButton>
            <MagneticButton href="https://www.salesforce.com/trailblazer/piyushdhaked" external>
              Trailhead <Mountain size={18} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right — profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, type: "spring", stiffness: 80 }}
          className="flex-1 relative hidden md:block"
          style={{ x: imgX, y: imgY }}
        >
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Pulsing glow layers */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[70px] animate-pulse scale-110 pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-accent/15 blur-[90px] animate-pulse scale-125 pointer-events-none" style={{ animationDelay: "1.5s" }} />

            {/* Rotating conic gradient border */}
            <div
              className="absolute inset-[-3px] rounded-full animate-spin-slow z-0"
              style={{
                background: "conic-gradient(from 0deg, #00A1E0 0%, #7B5EA7 40%, #00D4FF 70%, #00A1E0 100%)",
                animationDuration: "5s",
              }}
            />
            <div className="absolute inset-0 rounded-full bg-background z-[1]" />

            {/* Dashed ring */}
            <div className="absolute inset-6 rounded-full border border-white/10 border-dashed animate-spin-slow z-[2]" style={{ animationDuration: "18s", animationDirection: "reverse" }} />

            {/* Floating image */}
            <div className="animate-float absolute inset-[3px] z-[3]">
              <img
                src={`${import.meta.env.BASE_URL}images/piyush.jpeg`}
                alt="Piyush Dhaked"
                className="w-full h-full object-cover rounded-full p-2"
              />
            </div>

            {/* Orbit dot — primary */}
            <div className="absolute inset-0 rounded-full animate-spin-slow z-[4]" style={{ animationDuration: "10s" }}>
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_14px_rgba(0,161,224,0.9)]" />
            </div>
            {/* Orbit dot — accent */}
            <div className="absolute inset-0 rounded-full animate-spin-slow z-[4]" style={{ animationDuration: "16s", animationDirection: "reverse" }}>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[10px] tracking-widest uppercase mb-3 text-muted-foreground/50">Scroll</span>
        <div className="relative">
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-primary" />
          </motion.div>
          <motion.div
            className="absolute inset-0 blur-sm bg-primary rounded-full"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
