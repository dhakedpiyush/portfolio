import type { Variants, Transition } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

const base: Transition = { duration: 0.6, ease: EASE };
const fast: Transition = { duration: 0.45, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: fast },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show:   { opacity: 1, scale: 1, y: 0, transition: base },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: base },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: base },
};

export const stagger = (delay = 0.09): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, originX: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Standard viewport options for whileInView */
export const vp = { once: true, margin: "-80px 0px" } as const;
