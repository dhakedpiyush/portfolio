import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "CRS Jet Spares MRO Implementation",
    category: "Aviation & Service Cloud",
    description: "Comprehensive Salesforce implementation for an ISO 9001:2015 certified aviation parts company. Includes custom Case Management, Email-to-Case with domain filtering, and Rotabull ERP integration.",
    image: "crs-project.png",
    tech: ["Service Cloud", "AvSight", "Apex", "LWC"],
    featured: true
  },
  {
    title: "AI-Assisted Email Workflow",
    category: "Automation & AI",
    description: "Intelligent system generating acknowledgment replies when recipients are on leave, utilizing structured reviewer notes for managers.",
    image: "ai-workflow.png",
    tech: ["Apex", "Email Services", "Custom Objects"],
    featured: false
  },
  {
    title: "Dynamic Formula Generator",
    category: "Data Architecture",
    description: "Complex formula fields generating dynamic hyperlinks to related records (Sales Orders, POs, RMAs) using MOD logic for clean UI formatting.",
    image: "formula.png",
    tech: ["Formula Fields", "SOQL", "Schema"],
    featured: false
  },
  {
    title: "Event-Driven Modal System",
    category: "Real-time UI",
    description: "Real-time notification system for Sales Order changes triggering LWC modals instantly via Platform Events architecture.",
    image: "event-modal.png",
    tech: ["LWC", "Platform Events", "Apex"],
    featured: true
  }
];

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
          <p className="text-muted-foreground text-lg">Showcase of enterprise solutions and complex integrations.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl glass-card ${
                project.featured && i === 0 ? "md:col-span-2 md:row-span-2" : 
                project.featured && i === 3 ? "md:col-span-3" : "md:col-span-1"
              }`}
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors z-10"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}images/${project.image}`} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-background via-background/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">{project.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-white/70 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">{project.description}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs backdrop-blur-md border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform hover:shadow-[0_0_15px_rgba(0,161,224,0.6)]">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
