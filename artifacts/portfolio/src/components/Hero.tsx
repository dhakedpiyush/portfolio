import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, MapPin } from "lucide-react";

const FULL_NAME = "Piyush Dhaked";
const TYPE_SPEED = 90;
const START_DELAY = 600;

export function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

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

    return () => {
      clearTimeout(startTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (done) return;
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-aurora">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/8 rounded-full blur-[140px] animate-pulse z-0" style={{ animationDelay: "2s" }}></div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-extrabold mb-4"
          >
            <span className="block text-3xl md:text-4xl text-foreground/70 font-medium mb-1">Hi, I'm</span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-1 mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-display text-muted-foreground">
              Salesforce Developer{" "}
              <a
                href="https://www.metadologie.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                @ Metadologie Inc
              </a>
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://maps.app.goo.gl/xRoTsfy1VsHqmem68"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin size={14} className="text-primary group-hover:scale-110 transition-transform" />
                Jaipur, Rajasthan, India
              </a>
              <span className="text-border">·</span>
              <a
                href="https://www.metadologie.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={12} />
                metadologie.com
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-foreground/70 max-w-xl mb-10 leading-relaxed"
          >
            5x Certified Salesforce Developer with 4 years of experience specializing in Apex, LWC, and Service Cloud. Based in Jaipur, building enterprise-scale solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 hover:shadow-lg transition-all hover:-translate-y-0.5">
              View My Work <ArrowDown size={18} />
            </a>
            <a href="https://linkedin.com/in/piyushdhaked" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full glass font-semibold flex items-center gap-2 hover:bg-white/10 transition-all hover:-translate-y-0.5 text-foreground">
              LinkedIn <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>

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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
