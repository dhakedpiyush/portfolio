import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";

const CERTS = [
  {
    id: "7476968",
    name: "Salesforce Certified Platform Administrator",
    date: "Feb 22, 2026",
    image: "/images/cert-admin.png",
    color: "from-blue-600 to-cyan-400",
    glow: "rgba(0,161,224,0.3)",
  },
  {
    id: "4617729",
    name: "Salesforce Certified Platform Developer I",
    date: "Jun 22, 2024",
    image: "/images/cert-developer.png",
    color: "from-indigo-600 to-blue-400",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    id: "5632130",
    name: "Salesforce Certified Agentforce Specialist",
    date: "Jan 12, 2025",
    image: "/images/cert-agentforce.png",
    color: "from-purple-600 to-indigo-400",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    id: "5504441",
    name: "Salesforce Certified AI Associate",
    date: "Dec 22, 2024",
    image: "/images/cert-ai-associate.png",
    color: "from-cyan-500 to-sky-400",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    id: "2740409",
    name: "Salesforce Certified Platform Foundations",
    date: "Nov 2022",
    image: "/images/cert-foundations.png",
    color: "from-sky-500 to-blue-400",
    glow: "rgba(14,165,233,0.3)",
  },
];

function CertCard({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className={`relative w-full rounded-2xl bg-gradient-to-br ${cert.color} p-[1px] shadow-2xl cursor-pointer`}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
          style={{ background: cert.glow, transform: "scale(1.05)" }}
        />

        <div className="relative bg-background/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center gap-4">
          <div style={{ transform: "translateZ(40px)" }} className="w-full flex flex-col items-center gap-4">
            <img
              src={cert.image}
              alt={cert.name}
              className="w-28 h-28 object-contain drop-shadow-lg"
              draggable={false}
            />

            <div>
              <h3 className="text-base font-bold text-foreground leading-snug mb-2">{cert.name}</h3>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>Issued: {cert.date}</span>
                <span className="font-mono opacity-60">#{cert.id}</span>
              </div>
            </div>

            <a
              href="https://sforce.co/verifycerts"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${cert.color} text-white hover:opacity-90 transition-opacity`}
            >
              Verify <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative z-20 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
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
          <p className="text-muted-foreground mt-3 max-w-lg">
            Verified credentials across administration, development, AI, and emerging Salesforce technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            All credentials verified at
            <a
              href="https://sforce.co/verifycerts"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              sforce.co/verifycerts <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
