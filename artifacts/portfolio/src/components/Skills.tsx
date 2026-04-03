import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cloud,
  Package,
  GitBranch,
  Sparkles,
  ShieldCheck,
  Link,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SkillCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  skills: string[];
  color?: "primary" | "amber";
  accentColor: string;
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "development",
    label: "Development",
    icon: Code2,
    color: "primary",
    accentColor: "#00A1E0",
    skills: [
      "Apex (Classes, Triggers)",
      "Async Apex (Batch, Future)",
      "LWC",
      "Visualforce",
      "Aura Components",
      "SOQL & SOSL",
      "Platform Events",
    ],
  },
  {
    id: "admin",
    label: "Salesforce Admin",
    icon: ShieldCheck,
    color: "primary",
    accentColor: "#00A1E0",
    skills: [
      "Data Security",
      "Approval Process",
      "Flows",
      "Reports and Dashboards",
    ],
  },
  {
    id: "clouds",
    label: "Salesforce Clouds",
    icon: Cloud,
    color: "primary",
    accentColor: "#00A1E0",
    skills: [
      "Service Cloud",
      "Sales Cloud",
      "CPQ Cloud",
      "Education Cloud",
      "Manufacturing Cloud",
    ],
  },
  {
    id: "packages",
    label: "Managed Packages",
    icon: Package,
    color: "primary",
    accentColor: "#00A1E0",
    skills: [
      "AvSight (Aviation MRO)",
      "AuthVia",
      "Accounting Seed",
      "Avalara Tax",
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Link,
    color: "primary",
    accentColor: "#00A1E0",
    skills: [
      "REST API",
      "SOAP API",
      "Named Credentials",
      "Connected App",
      "Postman",
      "Razorpay",
      "AuthVia Payments",
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: GitBranch,
    color: "primary",
    accentColor: "#00A1E0",
    skills: [
      "Git",
      "Copado",
    ],
  },
  {
    id: "beyond",
    label: "Beyond Development",
    icon: Sparkles,
    color: "amber",
    accentColor: "#F59E0B",
    skills: [
      "Team Leadership",
      "Mentoring Interns",
      "Code Reviews",
      "Apex Best Practices",
      "Client Communication",
      "Requirements Analysis",
      "Sprint Planning",
      "Technical Documentation",
    ],
  },
];

const ITEM_HEIGHT = 56;
const AUTO_PLAY_INTERVAL = 3500;
const BEYOND_DEV_INTERVAL = 5000; // 5 seconds for Beyond Development

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function Skills() {
  const [step, setStep] = useState(0);

  const currentIndex =
    ((step % SKILL_CATEGORIES.length) + SKILL_CATEGORIES.length) %
    SKILL_CATEGORIES.length;

  const activeCategory = SKILL_CATEGORIES[currentIndex];
  const isBeyondDev = activeCategory.id === "beyond";

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff =
      (index - currentIndex + SKILL_CATEGORIES.length) % SKILL_CATEGORIES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    const interval = setInterval(
      nextStep,
      isBeyondDev ? BEYOND_DEV_INTERVAL : AUTO_PLAY_INTERVAL
    );
    return () => clearInterval(interval);
  }, [nextStep, isBeyondDev]);

  return (
    <section id="skills" className="py-24 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-4">
            <span className="w-12 h-1 bg-primary rounded-full"></span>
            Technical Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive skill set across the Salesforce ecosystem and beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            {/* Left Panel - Carousel */}
            <div className="w-full lg:w-[300px] relative z-30 flex flex-col items-start justify-center overflow-hidden px-6 py-10 lg:py-12 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Gradient fades */}
              <div className="absolute inset-x-0 top-0 h-16 z-40 pointer-events-none bg-gradient-to-b from-background/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 z-40 pointer-events-none bg-gradient-to-t from-background/80 to-transparent" />

              {/* Mobile Navigation Arrows */}
              <div className="lg:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-50 pointer-events-none">
                <button
                  onClick={prevStep}
                  className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/40 transition-all pointer-events-auto"
                  aria-label="Previous category"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextStep}
                  className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/40 transition-all pointer-events-auto"
                  aria-label="Next category"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
                {SKILL_CATEGORIES.map((skill, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;
                  const wrappedDistance = wrap(
                    -(SKILL_CATEGORIES.length / 2),
                    SKILL_CATEGORIES.length / 2,
                    distance
                  );

                  // Only show 5 items: -2, -1, 0, 1, 2
                  const isVisible = Math.abs(wrappedDistance) <= 2;
                  const Icon = skill.icon;
                  const itemIsAmber = skill.color === "amber";

                  return (
                    <motion.div
                      key={skill.id}
                      style={{
                        height: ITEM_HEIGHT,
                        width: "fit-content",
                      }}
                      animate={{
                        y: wrappedDistance * ITEM_HEIGHT,
                        opacity: isVisible ? 1 - Math.abs(wrappedDistance) * 0.3 : 0,
                        scale: isVisible ? 1 : 0.8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        mass: 0.8,
                      }}
                      className="absolute flex items-center justify-start"
                    >
                      <button
                        onClick={() => handleChipClick(index)}
                        className={cn(
                          "relative flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-500 text-left group border backdrop-blur-sm",
                          isActive
                            ? "bg-white/10 border-white/30 z-10 shadow-lg"
                            : itemIsAmber
                              ? "bg-transparent border-amber-500/40 hover:border-amber-400/60"
                              : "bg-transparent border-white/10 hover:border-white/30"
                        )}
                        style={
                          isActive
                            ? {
                                boxShadow: `0 0 20px ${skill.accentColor}30`,
                                borderColor: `${skill.accentColor}50`,
                              }
                            : undefined
                        }
                      >
                        <Icon
                          size={16}
                          className={cn(
                            "transition-colors duration-500 shrink-0",
                            isActive
                              ? ""
                              : itemIsAmber
                                ? "text-amber-400/70"
                                : "text-white/50"
                          )}
                          style={isActive ? { color: skill.accentColor } : undefined}
                        />
                        <span
                          className={cn(
                            "font-medium text-sm tracking-tight whitespace-nowrap transition-colors duration-500",
                            isActive
                              ? "text-foreground"
                              : itemIsAmber
                                ? "text-amber-400/80"
                                : "text-white/70"
                          )}
                        >
                          {skill.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel - Skills Display */}
            <div className="flex-1 p-8 lg:p-10 relative overflow-hidden flex items-start min-h-[400px]">
              {/* Gradient background */}
              <div
                className="absolute inset-0 opacity-30 transition-none"
                style={{
                  background: `radial-gradient(ellipse at top right, ${activeCategory.accentColor}20, transparent 60%)`,
                }}
              />

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, position: "absolute" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative z-10 w-full"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${activeCategory.accentColor}20`,
                        color: activeCategory.accentColor,
                      }}
                    >
                      {(() => {
                        const Icon = activeCategory.icon;
                        return <Icon size={24} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {activeCategory.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {activeCategory.skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-3 items-start content-start">
                    {activeCategory.skills.map((skill, index) => (
                      <motion.div
                        layout
                        key={`${activeCategory.id}-${skill}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                          delay: index * 0.02,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2.5 rounded-full border text-sm font-medium cursor-default"
                        style={{
                          background: `${activeCategory.accentColor}10`,
                          borderColor: `${activeCategory.accentColor}25`,
                          color: "var(--foreground)",
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: activeCategory.accentColor }}
                          />
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
