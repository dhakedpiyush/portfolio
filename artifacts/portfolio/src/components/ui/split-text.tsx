import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  mode?: "chars" | "words";
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: "120%", rotateX: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: {
      duration: 0.55,
      delay: i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.65,
      delay: i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  stagger = 0.03,
  mode = "words",
}: SplitTextProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  if (mode === "chars") {
    const chars = text.split("");
    return (
      <span
        ref={ref}
        className={`inline-flex flex-wrap ${className}`}
        style={{ overflow: "hidden", perspective: "600px" }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={delay + i * stagger}
            variants={charVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`inline-block ${charClassName}`}
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    );
  }

  // Word mode
  const words = text.split(" ");
  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            custom={delay + i * stagger}
            variants={wordVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
