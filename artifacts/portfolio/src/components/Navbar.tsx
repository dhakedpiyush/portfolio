import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const RESUME_URL =
  "https://drive.google.com/file/d/1I8H3fRnsYoxrhxeJnS0hVBYdee_wejaz/view?usp=sharing";

const LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let rafPending = false;
    let lastScrolled = false;
    let lastActive = "home";

    const sectionIds = LINKS.map((l) => l.name.toLowerCase());

    const apply = () => {
      rafPending = false;
      const y = window.scrollY;

      const scrolled = y > 50;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }

      // Walk sections bottom-up and find the first one whose top is above the
      // current scroll position. Use getBoundingClientRect so we don't depend
      // on offsetTop (which forces layout on each section individually).
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + y;
        if (y >= top - 200) {
          if (lastActive !== sectionIds[i]) {
            lastActive = sectionIds[i];
            setActiveSection(sectionIds[i]);
          }
          return;
        }
      }
    };

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {/* Full-width border-bottom layer — fades in when scrolled */}
      <div
        className="absolute inset-0 border-b border-border/20 shadow-sm pointer-events-none"
        style={{
          opacity: isScrolled ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: "hsl(222 47% 7% / 0.96)",
          backdropFilter: "blur(20px)",
        }}
      />

      <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Single pill/bar that morphs via plain CSS transitions — avoids per-frame layout */}
          <div
            className="flex items-center justify-between relative"
            style={{
              borderRadius: isScrolled ? 0 : 9999,
              paddingLeft: isScrolled ? 0 : 24,
              paddingRight: isScrolled ? 0 : 24,
              paddingTop: isScrolled ? 0 : 12,
              paddingBottom: isScrolled ? 0 : 12,
              background: isScrolled ? "rgba(0,0,0,0)" : "rgba(15, 23, 42, 0.75)",
              backdropFilter: isScrolled ? undefined : "blur(20px)",
              border: isScrolled ? "1px solid rgba(0,0,0,0)" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: isScrolled ? "0 4px 32px rgba(0,0,0,0)" : "0 4px 32px rgba(0,0,0,0.3)",
              transition:
                "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, border-radius 0.5s ease, padding 0.5s ease",
            }}
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-display font-bold text-foreground flex items-center gap-1 relative h-8 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {!isScrolled ? (
                  <motion.span
                    key="symbol"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <span className="text-primary">&lt;</span>
                    <span className="text-foreground mx-0.5">/</span>
                    <span className="text-accent">&gt;</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="name"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <span className="text-foreground">Piyush Dhaked</span>
                    <span className="text-primary">.</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Desktop Nav - absolutely positioned to prevent shift */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative group py-2",
                    activeSection === link.name.toLowerCase()
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.name}
                  {activeSection === link.name.toLowerCase() && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 group"
              >
                <FileText
                  size={15}
                  className="group-hover:scale-110 transition-transform"
                />
                View Resume
              </a>

              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden flex flex-col justify-center items-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 99999,
              background: "hsl(222 47% 6%)",
            }}
          >
            <button
              className="absolute top-6 right-6 p-3 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center gap-6 text-2xl font-display font-semibold">
              {LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "py-2 transition-colors",
                    activeSection === link.name.toLowerCase()
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: LINKS.length * 0.08, duration: 0.3 }}
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary text-lg mt-4 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FileText size={18} />
                View Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
