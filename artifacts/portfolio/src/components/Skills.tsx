import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Cloud, PlugZap, Package, PenTool, Braces } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
  {
    id: "dev",
    label: "Salesforce Dev",
    icon: Code2,
    skills: ["Apex (Classes, Triggers)", "Async Apex (Batch, Future)", "LWC", "Visualforce", "Aura Components", "SOQL & SOSL", "Platform Events", "Custom Metadata"]
  },
  {
    id: "admin",
    label: "Administration",
    icon: Cloud,
    skills: ["Service Cloud", "Sales Cloud", "Education Cloud", "Flows & Process Builder", "Approval Processes", "Permission Sets", "Reports & Dashboards"]
  },
  {
    id: "api",
    label: "Integrations",
    icon: PlugZap,
    skills: ["REST API", "SOAP API", "Salesforce Connect", "Named Credentials", "External Services", "Postman"]
  },
  {
    id: "packages",
    label: "Managed Packages",
    icon: Package,
    skills: ["AvSight (Aviation MRO)", "AuthVia", "Accounting Seed", "Avalara Tax"]
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: PenTool,
    skills: ["VS Code", "SFDX CLI", "Git & GitHub", "Data Loader", "Workbench", "Copado"]
  },
  {
    id: "other",
    label: "Other Tech",
    icon: Braces,
    skills: ["JavaScript (ES6+)", "HTML5", "CSS3 / Tailwind", "Java Basics", "React Basics"]
  }
];

export function Skills() {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);
  const [prevTab, setPrevTab] = useState<string | null>(null);

  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab)!;
  const prevIndex = SKILL_CATEGORIES.findIndex(c => c.id === prevTab);
  const currIndex = SKILL_CATEGORIES.findIndex(c => c.id === activeTab);
  const direction = prevIndex === -1 ? 1 : currIndex > prevIndex ? 1 : -1;

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(id);
  };

  return (
    <section id="skills" className="py-24 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive skill set across the Salesforce ecosystem and beyond.</p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Tabs */}
          <div className="md:col-span-4 flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
            {SKILL_CATEGORIES.map((category, i) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleTabChange(category.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-xl text-left whitespace-nowrap transition-all duration-300 min-w-max md:min-w-0 relative overflow-hidden",
                    isActive
                      ? "bg-primary/20 text-primary font-semibold shadow-[inset_0_0_20px_rgba(0,161,224,0.2),0_0_0_1px_rgba(0,161,224,0.3)]"
                      : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  <Icon size={20} className={isActive ? "drop-shadow-[0_0_6px_rgba(0,161,224,0.7)]" : ""} />
                  {category.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-primary shadow-[0_0_8px_rgba(0,161,224,0.8)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Skill cloud with 3D flip */}
          <div className="md:col-span-8" style={{ perspective: 1000 }}>
            <div className="glass-card rounded-3xl p-8 min-h-[300px] border-l-4 border-l-primary flex items-center overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  initial={{ opacity: 0, rotateY: direction * -35, x: direction * -40 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: direction * 35, x: direction * 40 }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="flex flex-wrap gap-4 w-full"
                >
                  {activeCategory.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.055, duration: 0.35, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.08,
                        y: -5,
                        boxShadow: "0 8px 24px rgba(0,161,224,0.2)",
                        borderColor: "rgba(0,161,224,0.5)",
                        transition: { type: "spring", stiffness: 400, damping: 15 },
                      }}
                      className="px-6 py-3 rounded-full bg-secondary/80 border border-white/5 text-foreground shadow-lg backdrop-blur-md flex items-center gap-2 hover:bg-secondary transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(139,92,246,0.7)]" />
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
