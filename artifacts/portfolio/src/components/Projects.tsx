import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Landmark, Cpu, GraduationCap, Wrench, Plane, Globe,
} from "lucide-react";
import { ProjectGlobe } from "@/components/ui/project-globe";
import { SplitText } from "@/components/ui/split-text";

const PROJECTS = [
  {
    id: "florida-aircraft",
    title: "Florida-Based Aircraft Parts Manufacturer",
    category: "Service Cloud · Aviation MRO",
    type: "Product Enhancement & Service Cloud Implementation",
    period: "Mar 2025 – Present",
    current: true,
    icon: Plane,
    gradient: "from-[#00A1E0]/25 via-[#7B5EA7]/15 to-[#00A1E0]/8",
    accentColor: "#00A1E0",
    accentRgb: "0,161,224",
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
    gradient: "from-sky-500/20 via-blue-400/10 to-transparent",
    accentColor: "#0EA5E9",
    accentRgb: "14,165,233",
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
    gradient: "from-emerald-500/18 via-teal-400/8 to-transparent",
    accentColor: "#10B981",
    accentRgb: "16,185,129",
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
    gradient: "from-indigo-500/18 via-blue-400/8 to-transparent",
    accentColor: "#6366F1",
    accentRgb: "99,102,241",
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
    gradient: "from-violet-500/18 via-purple-400/8 to-transparent",
    accentColor: "#8B5CF6",
    accentRgb: "139,92,246",
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
    gradient: "from-cyan-500/18 via-teal-400/8 to-transparent",
    accentColor: "#06B6D4",
    accentRgb: "6,182,212",
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
    gradient: "from-amber-500/18 via-orange-400/8 to-transparent",
    accentColor: "#F59E0B",
    accentRgb: "245,158,11",
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

function TiltCard({
  children,
  className,
  style,
  accentRgb,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accentRgb: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018,1.018,1.018)`;

    // Move shimmer
    if (shimmerRef.current) {
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(${accentRgb},0.08) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (shimmerRef.current) {
      shimmerRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ ...style, willChange: "transform", transition: "transform 0.18s ease-out" }}
    >
      {/* Mouse-follow shimmer */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-all duration-150"
      />
      {children}
    </div>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function Projects() {
  return (
    <section id="projects" className="py-28 relative z-20 overflow-hidden">
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-32 opacity-[0.04] pointer-events-none blur-3xl"
        style={{ background: "linear-gradient(to bottom, hsl(197 100% 44%), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              <SplitText text="Featured Projects" mode="chars" delay={0.05} stagger={0.035} />
            </h2>
            <p className="text-muted-foreground/65 text-sm">
              Enterprise Salesforce solutions delivered across 7+ global clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="hidden md:block"
          >
            <ProjectGlobe className="w-36 h-36 lg:w-44 lg:h-44" />
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ perspective: 1400 }}>
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className={`${project.colSpan}`}
              >
                <TiltCard
                  accentRgb={project.accentRgb}
                  className="group relative overflow-hidden rounded-3xl glass-card h-full flex flex-col"
                  style={{ minHeight: project.colSpan === "md:col-span-2" ? 260 : 245 }}
                >
                  {/* Gradient background layer */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-90 transition-opacity duration-500`}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, ${project.accentColor} 0%, rgba(${project.accentRgb},0.3) 60%, transparent 100%)`,
                    }}
                  />

                  {/* Current badge */}
                  {project.current && (
                    <span
                      className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
                      style={{
                        background: `rgba(${project.accentRgb},0.14)`,
                        color: project.accentColor,
                        border: `1px solid rgba(${project.accentRgb},0.28)`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: project.accentColor }}
                      />
                      Live
                    </span>
                  )}

                  <div className="relative z-10 p-6 flex flex-col h-full gap-4">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `rgba(${project.accentRgb},0.13)`,
                          color: project.accentColor,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                            style={{
                              background: `rgba(${project.accentRgb},0.12)`,
                              color: project.accentColor,
                              border: `1px solid rgba(${project.accentRgb},0.22)`,
                            }}
                          >
                            {project.category.split(" · ")[0]}
                          </span>
                          <img
                            src={project.cloudLogo}
                            alt={project.cloudLogoAlt}
                            className={`object-contain shrink-0 ${
                              (project as any).cloudLogoRounded ? "rounded-md" : ""
                            }`}
                            style={{
                              width: `${(project as any).cloudLogoDisplaySize ?? 22}px`,
                              height: `${(project as any).cloudLogoDisplaySize ?? 22}px`,
                            }}
                          />
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-foreground/95 leading-snug">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[11px] text-muted-foreground/50 italic">{project.type}</p>
                          <span className="text-border/40">·</span>
                          <span className="text-[10px] text-muted-foreground/40 whitespace-nowrap">{project.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px w-full"
                      style={{
                        background: `linear-gradient(90deg, rgba(${project.accentRgb},0.2), transparent)`,
                      }}
                    />

                    {/* Bullets */}
                    <ul className="space-y-1.5 flex-1">
                      {project.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-[0.8rem] text-foreground/65 leading-snug">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-70"
                            style={{ background: project.accentColor }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                          style={{
                            background: `rgba(${project.accentRgb},0.09)`,
                            color: project.accentColor,
                            border: `1px solid rgba(${project.accentRgb},0.2)`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
