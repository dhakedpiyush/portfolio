import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Linkedin, Mountain } from "lucide-react";
import confetti from "canvas-confetti";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A1E0', '#8B5CF6', '#00D4FF']
      });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative z-20 section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's build something <span className="text-gradient">extraordinary.</span></h2>
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
              
              <div className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors">
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
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full bg-background/60 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full bg-background/60 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  className="w-full bg-background/60 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Hello Piyush..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,161,224,0.3)] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : isSuccess ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message 
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
