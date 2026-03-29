import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-4">
            <span className="w-12 h-1 bg-primary rounded-full"></span>
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Professional Summary</h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
              <p>
                I am a passionate <strong className="text-foreground">Salesforce Developer & Project Lead</strong> with 4 years of experience architecting and implementing scalable B2B solutions. I specialize in complex Apex, Lightning Web Components (LWC), and Service Cloud implementations.
              </p>
              <p>
                My expertise lies in translating intricate business requirements into robust technical architectures. I have deep hands-on experience with managed packages like <strong>AvSight, AuthVia, and Accounting Seed</strong>.
              </p>
              <p>
                Beyond coding, I mentor development teams, conduct rigorous code reviews, and establish Salesforce best practices to ensure high-quality, maintainable deployments. I hold a <strong>Four Star Ranger</strong> rank on Trailhead, constantly learning and pushing the boundaries of the platform.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="/images/logo-lpu.png"
                  alt="Lovely Professional University"
                  className="w-14 h-14 object-contain rounded-xl bg-white p-1 shadow-sm flex-shrink-0"
                />
                <div>
                  <h4 className="text-xl font-bold mb-1">B.Tech in Computer Science</h4>
                  <p className="text-primary font-medium">Lovely Professional University</p>
                  <p className="text-sm text-muted-foreground mt-0.5">2019 – 2023 · 7.8 CGPA</p>
                </div>
              </div>
              <p className="text-foreground/70">Foundational knowledge in software engineering, algorithms, and object-oriented programming.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <img
                  src="/images/logo-tafs.png"
                  alt="The Air Force School"
                  className="w-14 h-14 object-contain rounded-xl bg-white p-1 shadow-sm flex-shrink-0"
                />
                <div>
                  <h4 className="text-xl font-bold mb-1">Senior Secondary (PCM)</h4>
                  <p className="text-primary font-medium">The Air Force School</p>
                  <p className="text-sm text-muted-foreground mt-0.5">2017 – 2019</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-lg">Location</h4>
                <p className="text-muted-foreground">Jaipur, Rajasthan, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
