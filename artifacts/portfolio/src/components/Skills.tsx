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

  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab)!;

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
          <div className="md:col-span-4 flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {SKILL_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-xl text-left whitespace-nowrap transition-all duration-300 min-w-max md:min-w-0 relative overflow-hidden",
                    isActive 
                      ? "bg-primary/20 text-primary font-semibold shadow-[inset_0_0_20px_rgba(0,161,224,0.2)]" 
                      : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  <Icon size={20} className={isActive ? "animate-pulse" : ""} />
                  {category.label}
                  {isActive && (
                    <motion.div 
                      layoutId="active-tab-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Skill Cloud */}
          <div className="md:col-span-8">
            <div className="glass-card rounded-3xl p-8 min-h-[300px] border-l-4 border-l-primary flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  {activeCategory.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="px-6 py-3 rounded-full bg-secondary/80 border border-white/5 text-foreground shadow-lg backdrop-blur-md flex items-center gap-2 hover:border-primary/50 hover:bg-secondary transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
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
