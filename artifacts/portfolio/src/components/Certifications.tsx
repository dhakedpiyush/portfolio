import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";

const CERTS = [
  { id: "7476968", name: "Salesforce Certified Platform Administrator", date: "Feb 22, 2026", color: "from-blue-500 to-cyan-400" },
  { id: "5632130", name: "Salesforce Certified Agentforce Specialist", date: "Jan 12, 2025", color: "from-purple-500 to-indigo-400" },
  { id: "5504441", name: "Salesforce Certified AI Associate", date: "Dec 22, 2024", color: "from-emerald-400 to-teal-500" },
  { id: "4617729", name: "Salesforce Certified Platform Developer I", date: "Jun 22, 2024", color: "from-orange-400 to-red-500" },
  { id: "2740409", name: "Salesforce Certified Associate", date: "Nov 2022", color: "from-slate-400 to-gray-500" },
];

function CertCard({ cert, index }: { cert: typeof CERTS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br ${cert.color} p-1 shadow-2xl cursor-pointer`}
      >
        <div 
          className="absolute inset-0 bg-background/90 backdrop-blur-xl rounded-xl m-[1px]" 
          style={{ transform: "translateZ(0px)" }}
        />
        
        <div className="relative h-full p-6 flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${cert.color} bg-opacity-20`}>
              <ShieldCheck className="text-white" size={28} />
            </div>
            <a 
              href="https://sforce.co/verifycerts" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{cert.name}</h3>
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Issued: {cert.date}</span>
              <span className="font-mono">ID: {cert.id}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative z-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ShieldCheck size={16} /> 5x Certified
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Salesforce Credentials</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            All credentials can be verified at 
            <a href="https://sforce.co/verifycerts" target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
              sforce.co/verifycerts <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
