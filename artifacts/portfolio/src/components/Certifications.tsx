import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const CERTS: FocusRailItem[] = [
  {
    id: "7476968",
    title: "Salesforce Certified Platform Administrator",
    description: "Issued: Feb 22, 2026 · ID #7476968",
    imageSrc: "/images/cert-admin.png",
    href: "https://sforce.co/verifycerts",
    meta: "Administration",
  },
  {
    id: "4617729",
    title: "Salesforce Certified Platform Developer I",
    description: "Issued: Jun 22, 2024 · ID #4617729",
    imageSrc: "/images/cert-developer.png",
    href: "https://sforce.co/verifycerts",
    meta: "Development",
  },
  {
    id: "5632130",
    title: "Salesforce Certified Agentforce Specialist",
    description: "Issued: Jan 12, 2025 · ID #5632130",
    imageSrc: "/images/cert-agentforce.png",
    href: "https://sforce.co/verifycerts",
    meta: "AI & Agents",
  },
  {
    id: "5504441",
    title: "Salesforce Certified AI Associate",
    description: "Issued: Dec 22, 2024 · ID #5504441",
    imageSrc: "/images/cert-ai-associate.png",
    href: "https://sforce.co/verifycerts",
    meta: "Artificial Intelligence",
  },
  {
    id: "2740409",
    title: "Salesforce Certified Platform Foundations",
    description: "Issued: Nov 2022 · ID #2740409",
    imageSrc: "/images/cert-foundations.png",
    href: "https://sforce.co/verifycerts",
    meta: "Foundations",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ShieldCheck size={16} /> 5x Certified
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Salesforce Credentials</h2>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm">
            Verified credentials across administration, development, AI, and emerging Salesforce technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <FocusRail
            items={CERTS}
            autoPlay={true}
            interval={4000}
            loop={true}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-xs flex items-center justify-center gap-1.5 mt-6"
        >
          All credentials can be verified at
          <a
            href="https://sforce.co/verifycerts"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5"
          >
            sforce.co/verifycerts <ExternalLink size={10} />
          </a>
        </motion.p>
      </div>
    </section>
  );
}
