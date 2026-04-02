import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [...LINKS].map((l) => l.name.toLowerCase());
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Full-width border-bottom layer — fades in when scrolled */}
      <div
        className="absolute inset-0 border-b border-border/20 shadow-sm pointer-events-none"
        style={{
          opacity: isScrolled ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: isDark
            ? "hsl(222 47% 7% / 0.96)"
            : "rgba(248, 250, 253, 0.96)",
          backdropFilter: "blur(20px)",
        }}
      />

      <div
        style={{
          paddingTop: isScrolled ? "10px" : "20px",
          paddingBottom: isScrolled ? "10px" : "20px",
          transition: "padding 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Single pill/bar that morphs via Framer Motion */}
          <motion.div
            animate={
              isScrolled
                ? {
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }
                : {
                    borderRadius: 9999,
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 12,
                    paddingBottom: 12,
                  }
            }
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center justify-between relative"
            style={{
              background: isScrolled
                ? "rgba(0,0,0,0)"
                : isDark
                  ? "rgba(15, 23, 42, 0.75)"
                  : "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(20px)",
              border: isScrolled
                ? "1px solid rgba(0,0,0,0)"
                : isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.07)",
              boxShadow: isScrolled
                ? "0 4px 32px rgba(0,0,0,0)"
                : isDark
                  ? "0 4px 32px rgba(0,0,0,0.3)"
                  : "0 4px 24px rgba(0,0,0,0.06)",
              transition:
                "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
            }}
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-display font-bold text-foreground flex items-center gap-2"
            >
              <span className="text-primary">&lt;</span>
              Piyush
              <span className="text-accent">/&gt;</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
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
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-8 right-8 p-2 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-2xl font-display font-semibold">
              {LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    activeSection === link.name.toLowerCase()
                      ? "text-primary text-glow"
                      : "text-foreground",
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: LINKS.length * 0.1 }}
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary text-lg mt-2"
              >
                <FileText size={18} />
                View Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
