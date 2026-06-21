"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

/**
 * Scroll-linked section transition: the wrapped section eases up and fades in
 * as it enters the viewport (tied to scroll position, not a one-shot), giving
 * a smooth cinematic hand-off between sections. No-op for reduced-motion.
 */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  if (reduce) return <div>{children}</div>;

  return (
    <motion.div ref={ref} style={{ opacity, y, willChange: "transform, opacity" }}>
      {children}
    </motion.div>
  );
}
