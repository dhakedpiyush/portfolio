import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 4, suffix: "", label: "Years Experience", description: "in Salesforce ecosystem" },
  { value: 5, suffix: "x", label: "Salesforce Certified", description: "across multiple clouds" },
  { value: 9, suffix: "+", label: "Projects Delivered", description: "across 4 continents" },
  { value: 5, suffix: "+", label: "Salesforce Clouds", description: "deployed & customized" },
];

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative z-20 overflow-hidden stats-section">


      {/* Animated top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,161,224,0.45) 25%, rgba(0,161,224,0.45) 75%, transparent 100%)",
          transformOrigin: "left center",
        }}
      />

      {/* Animated bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,161,224,0.45) 25%, rgba(0,161,224,0.45) 75%, transparent 100%)",
          transformOrigin: "right center",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative flex flex-col items-center text-center py-11 px-6 group"
            >
              {/* Vertical separator */}
              {i < stats.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.55 + i * 0.09 }}
                  className="absolute right-0 top-[18%] bottom-[18%] w-px hidden md:block"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 35%, rgba(255,255,255,0.07) 65%, transparent)",
                    transformOrigin: "top center",
                  }}
                />
              )}

              {/* Hover ambient glow */}
              <div className="absolute inset-2 rounded-2xl bg-primary/0 group-hover:bg-primary/[0.035] transition-all duration-500 border border-transparent group-hover:border-primary/[0.12]" />

              {/* Stat value */}
              <div className="relative z-10 mb-3 tabular-nums leading-none">
                <span
                  className="text-5xl md:text-6xl font-display font-bold"
                  style={{
                    background:
                      "linear-gradient(155deg, hsl(197 100% 78%) 0%, hsl(197 100% 44%) 55%, hsl(197 80% 35%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {inView ? <CountUp end={stat.value} duration={2.3} /> : "0"}
                </span>
                <span
                  className="text-4xl md:text-5xl font-display font-bold"
                  style={{
                    background:
                      "linear-gradient(155deg, hsl(197 100% 78%) 0%, hsl(197 100% 44%) 55%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="relative z-10 text-xs md:text-[0.7rem] font-bold text-foreground/75 uppercase tracking-[0.18em] mb-1.5">
                {stat.label}
              </p>

              {/* Description */}
              <p className="relative z-10 text-[0.68rem] text-muted-foreground/45 tracking-wide">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
