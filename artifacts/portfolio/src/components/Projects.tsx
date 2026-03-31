import { motion } from "framer-motion";
import {
  Landmark, Cpu, GraduationCap, Wrench, Plane, Globe, ShieldCheck,
} from "lucide-react";

const PROJECTS = [
  {
    id: "florida-aircraft",
    title: "Florida-Based Aircraft Parts Manufacturer",
    category: "Service Cloud · Aviation MRO",
    type: "Product Enhancement & Service Cloud Implementation",
    period: "Mar 2025 – Present",
    current: true,
    icon: Plane,
    gradient: "from-[#00A1E0]/30 via-[#7B5EA7]/20 to-[#00A1E0]/10",
    accentColor: "#00A1E0",
    colSpan: "md:col-span-2",
    cloudLogo: "/images/service-cloud.png",
    cloudLogoAlt: "Service Cloud",
    cloudLogoSize: 620,
    cloudLogoDisplaySize: 36,
    bullets: [
      "Integrated AuthVia payments for managing payments on quotations and orders.",
      "Implemented Service Cloud end-to-end for customer support operations.",
      "Integrated Salesforce web forms with legacy systems.",
    ],
    tech: ["Service Cloud", "AuthVia", "Apex", "Web Forms", "LWC"],
  },
  {
    id: "seattle-aircraft",
    title: "Seattle-Based Aircraft Parts Manufacturer",
    category: "Product Enhancement · Aviation MRO",
    type: "Product Enhancement",
    period: "Dec 2024 – Mar 2025",
    current: false,
    icon: Plane,
    gradient: "from-sky-500/20 via-blue-400/15 to-transparent",
    accentColor: "#0EA5E9",
    colSpan: "md:col-span-1",
    cloudLogo: "/images/sf-cloud.png",
    cloudLogoAlt: "Salesforce",
    bullets: [
      "Enhanced Experience Sites with AI-driven search bars.",
      "Optimized Storefront functionality and test class coverage.",
      "Facilitated bi-weekly feature demos and smooth deployments.",
    ],
    tech: ["Experience Sites", "LWC", "Apex", "AI Search"],
  },
  {
    id: "mauritius-bank",
    title: "Mauritius-Based Bank",
    category: "Service Cloud · Banking",
    type: "Service Cloud Implementation",
    period: "Nov 2022 – Dec 2022",
    current: false,
    icon: Landmark,
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    accentColor: "#10B981",
    colSpan: "md:col-span-1",
    cloudLogo: "/images/service-cloud.png",
    cloudLogoAlt: "Service Cloud",
    cloudLogoSize: 620,
    cloudLogoDisplaySize: 36,
    bullets: [
      "Banking Service Console with Email-to-Case & Web-to-Case.",
      "Apex Triggers, Classes, Flows, and Approval Processes.",
      "Deployed and tested in production for robust integration.",
    ],
    tech: ["Service Cloud", "Apex", "Flows", "Email-to-Case"],
  },
  {
    id: "semiconductor",
    title: "U.S-Based Semiconductor Manufacturer",
    category: "Product Enhancement · Manufacturing",
    type: "Product Enhancement",
    period: "Jan 2023 – Mar 2023",
    current: false,
    icon: Cpu,
    gradient: "from-indigo-500/20 via-blue-400/10 to-transparent",
    accentColor: "#6366F1",
    colSpan: "md:col-span-1",
    cloudLogo: "/images/manufacturing-cloud.png",
    cloudLogoAlt: "Manufacturing Cloud",
    cloudLogoDisplaySize: 30,
    bullets: [
      "Optimized existing functionality within tight deadlines.",
      "Improved test class coverage for production readiness.",
      "Bi-weekly feature demos for client requirement gathering.",
    ],
    tech: ["Apex", "Test Classes", "Flows", "Deployment"],
  },
  {
    id: "business-school",
    title: "India-Based Business School",
    category: "Education Cloud · EdTech",
    type: "Education Cloud Implementation",
    period: "Feb 2023 – Oct 2023",
    current: false,
    icon: GraduationCap,
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
    accentColor: "#8B5CF6",
    colSpan: "md:col-span-1",
    cloudLogo: "/images/education-cloud.png",
    cloudLogoAlt: "Education Cloud",
    cloudLogoRounded: true,
    cloudLogoDisplaySize: 30,
    bullets: [
      "Application Form Module with OmniStudio & LWC.",
      "Apex Triggers & LWCs for Deferral Form and Fees Payment.",
      "Razorpay payment integration with Salesforce.",
    ],
    tech: ["Education Cloud", "OmniStudio", "LWC", "Razorpay", "GIT"],
  },
  {
    id: "travel-brand",
    title: "Middle East-Based Travel Brand",
    category: "Product Enhancement · Travel",
    type: "Salesforce Enhancement",
    period: "Mar 2024 – Dec 2024",
    current: false,
    icon: Globe,
    gradient: "from-cyan-500/20 via-teal-400/10 to-transparent",
    accentColor: "#06B6D4",
    colSpan: "md:col-span-2",
    cloudLogo: "/images/service-cloud.png",
    cloudLogoAlt: "Service Cloud",
    cloudLogoSize: 620,
    cloudLogoDisplaySize: 36,
    bullets: [
      "Optimized existing functionality, delivered new requirements within tight deadlines, and improved test class coverage for production.",
      "Facilitated client communication for requirement gathering, conducted bi-weekly feature demonstrations and ensured smooth production deployments.",
      "Implemented Service Cloud features including case management and support workflows to streamline customer service operations.",
      "Worked on Copado-installed package for deployments.",
    ],
    tech: ["Service Cloud", "Apex", "Copado", "Flows", "Deployment"],
  },
  {
    id: "cpq-manufacturer",
    title: "U.S-Based Corrosion Prevention Manufacturer",
    category: "CPQ Migration · Manufacturing",
    type: "CPQ Implementation and Migrations",
    period: "Nov 2023 – Mar 2024",
    current: false,
    icon: Wrench,
    gradient: "from-amber-500/20 via-orange-400/10 to-transparent",
    accentColor: "#F59E0B",
    colSpan: "md:col-span-1",
    cloudLogo: "/images/manufacturing-cloud.png",
    cloudLogoAlt: "Manufacturing Cloud",
    cloudLogoDisplaySize: 30,
    bullets: [
      "Migrated standard Quote to CPQ — formula fields, flows, templates.",
      "Configured products and ensured smooth CPQ environment functionality.",
    ],
    tech: ["CPQ", "Apex", "Flows", "Product Catalog", "Templates"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function Projects() {
  return (
    <section id="projects" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-4">
            <span className="w-12 h-1 bg-accent rounded-full"></span>
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Enterprise Salesforce solutions delivered across 7+ global clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className={`group relative overflow-hidden rounded-3xl glass-card ${project.colSpan} flex flex-col`}
                style={{ minHeight: project.colSpan === "md:col-span-2" ? 260 : 240 }}
              >
                {/* Gradient background layer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
                />

                {/* Current project pulsing ring */}
                {project.current && (
                  <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Live
                  </span>
                )}

                <div className="relative z-10 p-6 flex flex-col h-full gap-4">
                  {/* Header row */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${project.accentColor}22`, color: project.accentColor }}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full"
                          style={{
                            background: `${project.accentColor}18`,
                            color: project.accentColor,
                            border: `1px solid ${project.accentColor}30`,
                          }}
                        >
                          {project.category.split(" · ")[0]}
                        </span>
                        <img
                          src={project.cloudLogo}
                          alt={project.cloudLogoAlt}
                          className={`object-contain flex-shrink-0 ${
                            (project as any).cloudLogoRounded ? "rounded-md" : ""
                          }`}
                          style={{ width: `${(project as any).cloudLogoDisplaySize ?? 22}px`, height: `${(project as any).cloudLogoDisplaySize ?? 22}px` }}
                        />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 italic">{project.type}</p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-1.5 flex-1">
                    {project.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-foreground/70 leading-snug">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: project.accentColor }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: `${project.accentColor}14`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}25`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
