import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { fadeUp, slideLeft, slideRight, scaleUp, stagger, lineGrow, vp } from "@/lib/animations";

const EXPERIENCES = [
  {
    role: "Salesforce Developer & Project Lead",
    company: "Metadologie",
    period: "Dec 2024 – Present",
    location: "Jaipur, Rajasthan",
    description: "Leading Salesforce implementations for enterprise clients, specifically in the aviation MRO sector.",
    highlights: [
      "Architected complex Apex classes, triggers, and batch jobs with strict bulkification.",
      "Developed custom UI components using LWC, incorporating Platform Events for real-time modals.",
      "Managed Service Cloud setups including Email-to-Case and Escalation Rules.",
      "Integrated and customized managed packages: AvSight, AuthVia, Accounting Seed.",
      "Mentored interns and established deployment strategies via QA/UAT environments."
    ]
  },
  {
    role: "Salesforce Developer",
    company: "Myridius x Aethereus",
    period: "Jul 2023 – Dec 2024",
    location: "Pune, Maharashtra",
    description: "Built custom Salesforce applications utilizing advanced programming and declarative tools.",
    highlights: [
      "Leveraged Async Apex (Batch, Queueable, Future) for high-volume data processing.",
      "Integrated external systems via REST/SOAP APIs.",
      "Designed complex automation flows using Salesforce Flow and Process Builder.",
      "Participated in the full Software Development Life Cycle (SDLC)."
    ]
  },
  {
    role: "Salesforce Developer Intern",
    company: "Myridius x Aethereus",
    period: "Jul 2022 – Jul 2023",
    location: "Remote",
    description: "Established a strong foundation in Salesforce administration and programmatic development.",
    highlights: [
      "Configured Service Cloud implementations and case management.",
      "Performed data migrations and environment configurations.",
      "Developed basic Apex triggers and Visualforce pages."
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative z-20 section-alt">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger(0.1)} className="mb-16 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display font-bold mb-4">Experience</motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto">My professional journey building enterprise Salesforce solutions.</motion.p>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-1/2 opacity-30"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              const slideVariant = isEven ? slideRight : slideLeft;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={stagger(0.08)}
                  className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    variants={scaleUp}
                    className="absolute left-[20px] md:left-1/2 top-6 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,161,224,0.8)] -translate-x-[7px] md:-translate-x-1/2 z-10 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </motion.div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <motion.div variants={slideVariant} className="pl-12 md:pl-0 md:w-1/2 w-full">
                    <div className={`glass-card p-6 md:p-8 rounded-2xl hover:-translate-y-1.5 transition-transform duration-300 ${isEven ? "md:mr-12" : "md:ml-12"}`}>
                      <div className="flex items-center gap-3 mb-2 text-primary font-semibold">
                        <Briefcase size={18} />
                        <span>{exp.period}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                      <h4 className="text-lg text-muted-foreground mb-4">{exp.company} • {exp.location}</h4>
                      <p className="text-foreground/80 mb-4">{exp.description}</p>
                      <motion.ul
                        variants={stagger(0.06)}
                        className="space-y-2"
                      >
                        {exp.highlights.map((item, i) => (
                          <motion.li key={i} variants={fadeUp} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
