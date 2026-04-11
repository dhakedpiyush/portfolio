import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Linkedin, Mountain, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";
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

const contactLinks = [
  {
    href: "mailto:dhakedpiyush9291@gmail.com",
    icon: Mail,
    label: "Email",
    value: "dhakedpiyush9291@gmail.com",
    external: false,
  },
  {
    href: "https://linkedin.com/in/piyushdhaked",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/piyushdhaked",
    external: true,
  },
  {
    href: "https://www.salesforce.com/trailblazer/piyushdhaked",
    icon: Mountain,
    label: "Trailhead",
    value: "trailblazer/piyushdhaked",
    external: true,
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#00A1E0", "#8B5CF6", "#00D4FF"],
      });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 1800);
  };

  const inputClass = (field: string) =>
    `w-full bg-background/40 border rounded-xl px-4 py-3.5 text-foreground text-sm outline-none transition-all duration-300 resize-none ${
      focusedField === field
        ? "border-primary/50 shadow-[0_0_0_3px_rgba(0,161,224,0.08)]"
        : "border-border/40 hover:border-border/60"
    }`;

  return (
    <section id="contact" className="py-28 relative z-20 section-alt overflow-hidden">
      {/* Hidden iframe */}
      <iframe name="sf-case-frame" title="sf-case-frame" style={{ display: "none" }} />


      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full opacity-[0.04] pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(197 100% 44%), transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-5 leading-tight">
              <SplitText text="Let's build something" mode="words" delay={0.1} stagger={0.1} />
              {" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(197 100% 60%), hsl(197 100% 38%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                extraordinary.
              </span>
            </h2>
            <p className="text-sm text-muted-foreground/65 mb-12 max-w-sm leading-relaxed">
              My team is growing. If you're looking for a new challenge or want to collaborate, I'm always open — reach out below.
            </p>

            {/* Location */}
            <div className="flex items-center gap-3 text-muted-foreground/55 text-sm mb-10">
              <MapPin size={14} className="text-primary/50" />
              <span>Jaipur, Rajasthan, India</span>
            </div>

            {/* Contact links */}
            <div className="space-y-4">
              {contactLinks.map(({ href, icon: Icon, label, value, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 w-fit"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-primary/70 group-hover:text-primary transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(0,161,224,0.08)",
                      border: "1px solid rgba(0,161,224,0.15)",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.15em] mb-0.5">{label}</p>
                    <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
                      {value}
                      {external && <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" />}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <form
              ref={formRef}
              action={SF_ENDPOINT}
              method="POST"
              target="sf-case-frame"
              onSubmit={handleSubmit}
              className="relative"
            >
              {/* Salesforce hidden fields */}
              <input type="hidden" name="orgid" value={SF_ORG_ID} />
              <input type="hidden" name="retURL" value="https://piyushdhaked.com" />
              <input type="hidden" name="external" value="1" />
              <input type="hidden" name="subject" ref={subjectRef} />

              {/* Form card */}
              <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                {/* Subtle inner glow */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "rgba(0,161,224,0.06)" }}
                />

                <div className="space-y-5 relative z-10">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.12em] mb-2">
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
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass("name")}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.12em] mb-2">
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
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass("email")}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="description" className="block text-xs font-semibold text-muted-foreground/55 uppercase tracking-[0.12em] mb-2">
                      Message
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass("message")}
                      placeholder="Hello Piyush..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                    style={{
                      background: isSuccess
                        ? "rgba(16,185,129,0.15)"
                        : "hsl(197 100% 44%)",
                      color: isSuccess ? "#10B981" : "white",
                      border: isSuccess ? "1px solid rgba(16,185,129,0.3)" : "none",
                      boxShadow: isSuccess ? "none" : "0 4px 20px rgba(0,161,224,0.2)",
                    }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isSuccess ? (
                      "Message Sent ✓"
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={15}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* Footer badge */}
                <div className="mt-5 pt-4 border-t border-border/15 flex items-center gap-2 flex-wrap justify-center">
                  <span className="text-[11px] text-muted-foreground/40">Built with</span>
                  <img src="/images/brevo-logo.png" alt="Brevo" className="h-3.5 w-auto object-contain opacity-50" />
                  <span className="text-muted-foreground/30 text-xs">&</span>
                  <img src="/images/sflogo.png" alt="Salesforce" className="w-5 h-5 object-contain opacity-50" />
                  <span className="text-[11px] text-muted-foreground/35 w-full text-center">
                    — 'cause Salesforce gives only 15 emails/day on Dev orgs 🥲
                  </span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
