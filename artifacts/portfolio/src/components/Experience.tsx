import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, CalendarDays } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";


const EXPERIENCES = [
  {
    role: "Salesforce Developer L2 & Project Lead",
    company: "Metadologie",
    period: "Apr 2026 – Present",
    location: "Jaipur, Rajasthan",
    current: true,
    description: "Leading solution design and development teams on enterprise Salesforce implementations.",
    highlights: [
      "Work directly with stakeholders on requirement gathering, scope definition, and project kickoffs.",
      "Monitor development progress and review code across multiple concurrent projects.",
      "Own solution design and requirement analysis for new implementations.",
      "Guide junior developers through technical decisions and mentor the team during development.",
      "Act as the bridge between client requirements and the development team.",
    ],
    accentColor: "hsl(197 100% 44%)",
    accentRgb: "0,161,224",
  },
  {
    role: "Salesforce Developer & Project Lead",
    company: "Metadologie",
    period: "Dec 2024 – Apr 2026",
    location: "Jaipur, Rajasthan",
    current: false,
    description: "Led Salesforce implementations for enterprise clients in the aviation MRO sector.",
    highlights: [
      "Architected complex Apex classes, triggers, and batch jobs with strict bulkification.",
      "Developed custom UI components using LWC, incorporating Platform Events for real-time modals.",
      "Managed Service Cloud setups including Email-to-Case and Escalation Rules.",
      "Integrated and customized managed packages: AvSight, AuthVia, Accounting Seed.",
      "Mentored interns and established deployment strategies via QA/UAT environments.",
    ],
    accentColor: "hsl(197 100% 44%)",
    accentRgb: "0,161,224",
  },
  {
    role: "Salesforce Developer",
    company: "Myridius x Aethereus",
    period: "Jul 2023 – Dec 2024",
    location: "Pune, Maharashtra",
    current: false,
    description: "Built custom Salesforce applications utilizing advanced programming and declarative tools.",
    highlights: [
      "Leveraged Async Apex (Batch, Queueable, Future) for high-volume data processing.",
      "Integrated external systems via REST/SOAP APIs.",
      "Designed complex automation flows using Salesforce Flow and Process Builder.",
      "Participated in the full Software Development Life Cycle (SDLC).",
    ],
    accentColor: "hsl(258 55% 62%)",
    accentRgb: "139,92,246",
  },
  {
    role: "Salesforce Developer Intern",
    company: "Myridius x Aethereus",
    period: "Jul 2022 – Jul 2023",
    location: "Remote",
    current: false,
    description: "Established a strong foundation in Salesforce administration and programmatic development.",
    highlights: [
      "Configured Service Cloud implementations and case management.",
      "Performed data migrations and environment configurations.",
      "Developed basic Apex triggers and Visualforce pages.",
    ],
    accentColor: "hsl(215 20% 50%)",
    accentRgb: "100,116,139",
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-70px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-0 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-[17px] md:left-1/2 top-7 z-10 -translate-x-1/2">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 300 }}
          className="relative w-[14px] h-[14px] rounded-full flex items-center justify-center"
          style={{ background: exp.accentColor, boxShadow: `0 0 12px rgba(${exp.accentRgb},0.5)` }}
        >
          <div className="w-[5px] h-[5px] rounded-full bg-background" />
          {exp.current && (
            <motion.div
              className="absolute inset-[-3px] rounded-full"
              style={{ border: `1.5px solid rgba(${exp.accentRgb},0.7)` }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2" />

      {/* Content */}
      <div className="pl-10 md:pl-0 md:w-1/2 w-full">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`group relative glass-card rounded-2xl overflow-hidden ${
              isEven ? "md:mr-10" : "md:ml-10"
            }`}
          >
            {/* Accent left bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{
                background: `linear-gradient(to bottom, rgba(${exp.accentRgb},0.8), rgba(${exp.accentRgb},0.1))`,
              }}
            />

            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top left, rgba(${exp.accentRgb},0.05), transparent 70%)`,
              }}
            />

            {/* Top shimmer line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, rgba(${exp.accentRgb},0.5), rgba(${exp.accentRgb},0.1) 60%, transparent)`,
              }}
            />

            <div className="relative z-10 p-6 pl-8 md:p-7 md:pl-9">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  {exp.current && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2"
                      style={{
                        background: `rgba(${exp.accentRgb},0.12)`,
                        color: `rgba(${exp.accentRgb},1)`,
                        border: `1px solid rgba(${exp.accentRgb},0.25)`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: exp.accentColor }}
                      />
                      Current Role
                    </span>
                  )}
                  <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">{exp.role}</h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: `rgba(${exp.accentRgb},0.85)` }}
                  >
                    {exp.company}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/55 justify-end mb-1">
                    <CalendarDays size={11} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40 justify-end">
                    <MapPin size={11} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-foreground/55 leading-relaxed mb-4">{exp.description}</p>

              {/* Highlights */}
              <ul className="space-y-2">
                {exp.highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.32 }}
                    className="flex items-start gap-2.5 text-xs text-foreground/60"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: `rgba(${exp.accentRgb},0.65)` }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="py-28 relative z-20 section-alt overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full opacity-[0.025] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(258 55% 62%), transparent 65%)" }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <SplitText text="Experience" mode="chars" delay={0.05} stagger={0.04} />
          </h2>
          <p className="text-muted-foreground/55 max-w-xl mx-auto text-sm leading-relaxed">
            Professional journey building enterprise Salesforce solutions across industries and continents.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={lineRef}>
          {/* Base track — static faint line */}
          <div
            className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />

          {/* Scroll-drawn fill line */}
          <div className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                scaleY: lineScale,
                background:
                  "linear-gradient(to bottom, rgba(0,161,224,0.6), rgba(139,92,246,0.4), rgba(100,116,139,0.2))",
                transformOrigin: "top center",
              }}
            />
          </div>

          <div className="space-y-14">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
