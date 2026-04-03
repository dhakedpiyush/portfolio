import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Linkedin, Mountain } from "lucide-react";
import confetti from "canvas-confetti";

const SF_ORG_ID = "00D5i000003MHvH";
const SF_ENDPOINT = `https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=${SF_ORG_ID}`;

function getOrdinal(n: number): string {
  if (n > 3 && n < 21) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function buildSubject(fullName: string): string {
  const firstName = fullName.trim().split(" ")[0];
  const now = new Date();
  const day = getOrdinal(now.getDate());
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  return `${firstName} ${day} ${month} ${year}`;
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    if (subjectRef.current) {
      subjectRef.current.value = buildSubject(name);
    }

    setIsSubmitting(true);

    if (formRef.current) {
      formRef.current.submit();
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00A1E0", "#8B5CF6", "#00D4FF"],
      });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 relative z-20 section-alt">
      {/* Hidden iframe absorbs the Salesforce redirect so the user never leaves */}
      <iframe name="sf-case-frame" title="sf-case-frame" style={{ display: "none" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let's build something <span className="text-gradient">extraordinary.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              My team is growing. If anyone is looking for a new challenge, I'm available for referrals!
            </p>

            <div className="space-y-6">
              <a
                href="mailto:dhakedpiyush9291@gmail.com"
                className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors w-fit group"
              >
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <span className="font-medium text-lg">dhakedpiyush9291@gmail.com</span>
              </a>

              <div className="flex items-center gap-4 text-foreground/80">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <span className="font-medium text-lg">Jaipur, Rajasthan, India</span>
              </div>

              <a
                href="https://linkedin.com/in/piyushdhaked"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors w-fit group"
              >
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </div>
                <span className="font-medium text-lg">linkedin.com/in/piyushdhaked</span>
              </a>

              <a
                href="https://www.salesforce.com/trailblazer/piyushdhaked"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors w-fit group"
              >
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mountain size={20} />
                </div>
                <span className="font-medium text-lg">trailblazer/piyushdhaked</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              ref={formRef}
              action={SF_ENDPOINT}
              method="POST"
              target="sf-case-frame"
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-3xl space-y-6 relative overflow-hidden"
            >
              {/* Salesforce hidden fields */}
              <input type="hidden" name="orgid" value={SF_ORG_ID} />
              <input type="hidden" name="retURL" value="https://piyushdhaked.com" />
              <input type="hidden" name="external" value="1" />
              <input type="hidden" name="subject" ref={subjectRef} />

              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background/60 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={80}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background/60 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-background/60 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Hello Piyush..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-[0_4px_16px_rgba(0,161,224,0.25)] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSuccess ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Brevo + Salesforce badge */}
              <div className="pt-1 border-t border-border/20 flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  <span className="text-xs text-muted-foreground/60">Built with</span>
                  <img src="/images/brevo-logo.png" alt="Brevo" className="h-4 w-auto object-contain" />
                  <span className="text-muted-foreground/50 text-xs">&</span>
                  <img src="/images/sflogo.png" alt="Salesforce" className="w-6 h-6 object-contain" />
                </div>
                <span className="text-xs text-muted-foreground/50 text-center leading-relaxed">
                  - 'cause Salesforce gives only 15 emails/day on Dev orgs 🥲
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
