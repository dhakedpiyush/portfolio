import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "x", label: "Salesforce Certified" },
  { value: 1273, suffix: "+", label: "LinkedIn Followers" },
  { value: 500, suffix: "+", label: "Connections" },
];

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <section className="py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-2">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
