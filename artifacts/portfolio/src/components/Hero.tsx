import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Globe, MapPin, Mountain } from "lucide-react";

const FULL_NAME = "Piyush Dhaked";
const TYPE_SPEED = 45;
const START_DELAY = 400;

export function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [heroMinH, setHeroMinH] = useState<string>("100svh");

  useEffect(() => {
    setHeroMinH(`${window.innerHeight}px`);
  }, []);

  useEffect(() => {
    let index = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const type = () => {
        index++;
        setDisplayed(FULL_NAME.slice(0, index));
        if (index < FULL_NAME.length) {
          typingTimer = setTimeout(type, TYPE_SPEED);
        } else {
          setDone(true);
          setTimeout(() => setCursorVisible(false), 1200);
        }
      };
      type();
    }, START_DELAY);
    return () => { clearTimeout(startTimer); clearTimeout(typingTimer); };
  }, []);

  useEffect(() => {
    if (done) return;
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <section
      id="home"
      style={{ minHeight: heroMinH }}
      className="relative flex items-center justify-center pt-24 pb-12 md:pt-20 md:pb-0 overflow-hidden bg-aurora"
    >
      <div className="absolute inset-0 bg-background/60 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[80px] md:blur-[120px] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/8 rounded-full blur-[90px] md:blur-[140px] z-0"></div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

          {/* Mobile Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="md:hidden mb-6"
          >
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 shadow-lg shadow-primary/20"></div>
              <img
                src={`${import.meta.env.BASE_URL}images/piyush.jpeg`}
                alt="Piyush Dhaked"
                className="w-full h-full object-cover rounded-full p-1"
              />
            </div>
          </motion.div>

          {/* Group 1: Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-4 md:mb-5"
          >
            <span className="block text-base md:text-xl text-foreground/50 font-medium mb-1 tracking-widest uppercase font-mono">Hi, I'm</span>
            <h1 className="text-gradient text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight inline-flex items-end">
              {displayed}
              <span
                style={{
                  display: "inline-block",
                  width: "0.6em",
                  height: "3px",
                  marginLeft: "3px",
                  marginBottom: "0.12em",
                  borderRadius: "2px",
                  background: "hsl(var(--primary))",
                  opacity: cursorVisible ? 1 : 0,
                  transition: done ? "opacity 0.4s ease" : "none",
                  flexShrink: 0,
                }}
              />
            </h1>
          </motion.div>

          {/* Group 2: Role & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-5 md:mb-6"
          >
            <h2 className="text-lg md:text-3xl font-display text-muted-foreground mb-2">
              Salesforce Developer{" "}
              <span className="text-primary">@ Metadologie Inc</span>
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm">
              <a
                href="https://maps.app.goo.gl/xRoTsfy1VsHqmem68"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin size={12} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                Jaipur, India
              </a>
              <span className="text-border shrink-0">·</span>
              <a
                href="https://www.metadologie.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted-foreground hover:text-primary transition-colors group"
              >
                <Globe size={12} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                metadologie.com
              </a>
            </div>
          </motion.div>

          {/* Group 3: Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm md:text-lg text-foreground/70 max-w-xl mb-6 md:mb-10 leading-relaxed px-2 md:px-0"
          >
            5x Certified Salesforce Developer with 4 years of experience specializing in Apex, LWC, and Service Cloud. Based in Jaipur, building enterprise-scale solutions.
          </motion.p>

          {/* Group 4: Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4"
          >
            <a href="#projects" className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-primary-foreground text-sm md:text-base font-semibold flex items-center gap-2 hover:bg-primary/90 hover:shadow-lg transition-all hover:-translate-y-0.5">
              View My Work <ArrowDown size={16} />
            </a>
            <a href="https://linkedin.com/in/piyushdhaked" target="_blank" rel="noopener noreferrer" className="px-5 py-3 md:px-8 md:py-4 rounded-full glass text-sm md:text-base font-semibold flex items-center gap-2 hover:bg-white/10 transition-all hover:-translate-y-0.5 text-foreground">
              LinkedIn <ExternalLink size={15} />
            </a>
            <a href="https://www.salesforce.com/trailblazer/piyushdhaked" target="_blank" rel="noopener noreferrer" className="px-5 py-3 md:px-8 md:py-4 rounded-full glass text-sm md:text-base font-semibold flex items-center gap-2 hover:bg-white/10 transition-all hover:-translate-y-0.5 text-foreground">
              Trailhead <Mountain size={15} />
            </a>
          </motion.div>
        </div>

        {/* Desktop Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="flex-1 relative hidden md:block"
        >
          <div className="relative w-full max-w-md mx-auto aspect-square rounded-full">
            <div className="absolute inset-0 rounded-full border border-primary/20 shadow-lg"></div>
            <div className="absolute inset-4 rounded-full border border-border/30 border-dashed animate-spin-slow"></div>
            <img
              src={`${import.meta.env.BASE_URL}images/piyush.jpeg`}
              alt="Piyush Dhaked"
              className="absolute inset-0 w-full h-full object-cover rounded-full p-2"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground animate-bounce hidden md:flex"
      >
        <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
