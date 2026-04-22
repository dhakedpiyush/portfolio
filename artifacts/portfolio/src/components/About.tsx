import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { MapPin, Code2, Layers, Users } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";
import { useIsMobile } from "@/hooks/use-mobile";

const expertise = [
  { icon: Code2, label: "Apex & LWC" },
  { icon: Layers, label: "Service Cloud" },
  { icon: Users, label: "Team Leadership" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const EASE = [0.215, 0.61, 0.355, 1] as [number, number, number, number];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax layers — disabled on mobile to keep scroll jank-free.
  const leftY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -20]);

  return (
    <section id="about" ref={sectionRef} className="py-28 relative z-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(197 100% 44%), transparent 65%)" }}
      />



      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <SplitText text="About Me" mode="chars" delay={0.05} stagger={0.04} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — Professional Summary */}
          <motion.div
            style={{ y: leftY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <motion.div variants={itemVariants} className="relative p-px rounded-2xl overflow-hidden group">
              {/* Gradient border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,161,224,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 100%)",
                }}
              />
              <div className="relative glass-card p-8 rounded-2xl">
                <h3 className="text-base font-bold mb-5 text-primary/80 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-primary/50 rounded-full" />
                  Professional Summary
                </h3>
                <div className="space-y-3.5 text-foreground/70 leading-relaxed text-sm">
                  <p>
                    I'm a <strong className="text-foreground/95 font-semibold">Salesforce Developer L2 & Project Lead at Metadologie</strong> with 4 years of experience building and delivering scalable B2B solutions. I work across Apex, LWC, and Service Cloud — from writing complex business logic to architecting full implementations.
                  </p>
                  <p>
                    I have a strong track record of translating complex or ambiguous requirements into clean, maintainable technical solutions. I've worked hands-on with managed packages like <strong className="text-foreground/85">AvSight, AuthVia, and Accounting Seed</strong> across multiple client engagements.
                  </p>
                  <p>
                    In my L2 role, I lead solution design, drive requirement gathering with stakeholders, run code reviews, and mentor junior developers on the team — making sure we're following Salesforce best practices across every project. I'm a <strong className="text-foreground/85">Four Star Ranger</strong> on Trailhead and keep up with what's new on the platform — <strong className="text-foreground/85">Agentforce</strong> being the most recent one I've gone deep on.
                  </p>
                </div>

                {/* Expertise tags */}
                <div className="mt-6 pt-5 border-t border-border/20 flex flex-wrap gap-2">
                  {expertise.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                      style={{
                        background: "rgba(0,161,224,0.07)",
                        borderColor: "rgba(0,161,224,0.18)",
                        color: "hsl(197 100% 58%)",
                      }}
                    >
                      <Icon size={11} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Education & Location */}
          <motion.div
            style={{ y: rightY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* LPU */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="glass-card rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent" />
                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(0,161,224,0.04), transparent)" }}
                />
                <div className="p-6 pl-8">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0 border border-white/[0.07]">
                      <img src="/images/logo-lpu.png" alt="LPU" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-0.5">B.Tech in Computer Science</h4>
                      <p className="text-primary/75 text-xs font-semibold">Lovely Professional University</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-muted-foreground/50">2019 – 2023</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-border" />
                        <span className="text-[11px] font-bold text-foreground/50">7.8 CGPA</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    Foundational knowledge in software engineering, algorithms, and object-oriented programming.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* TAFS */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="glass-card rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent/60 via-accent/25 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.04), transparent)" }}
                />
                <div className="p-6 pl-8">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0 border border-white/[0.07]">
                      <img src="/images/logo-tafs.png" alt="TAFS" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-0.5">Senior Secondary (PCM)</h4>
                      <p className="text-primary/75 text-xs font-semibold">The Air Force School</p>
                      <span className="text-[11px] text-muted-foreground/50 mt-1 block">2017 – 2019</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/50 leading-relaxed mt-3">
                    Built early programming fundamentals in C++ and Java.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants}>
              <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,161,224,0.09)", color: "hsl(197 100% 55%)" }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.18em] mb-0.5">Based in</p>
                  <p className="text-sm font-semibold text-foreground/80">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
