"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Word-by-word reveal. Each word rises and unblurs with a stagger.
 * `as` lets you render it as an h1/h2/etc. while keeping the animation.
 */
export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  once = true,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  /** word(s) to render with the gold gradient */
  highlight?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const isGold = highlightWords.includes(word.replace(/[?.,]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${isGold ? "gold-text" : ""}`}
              initial={{ y: "115%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: delay + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
