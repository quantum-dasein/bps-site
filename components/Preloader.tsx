"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // lock scroll while loading
    document.documentElement.classList.add("lenis-stopped");

    const start = performance.now();
    const duration = 1900;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) {
      document.documentElement.classList.remove("lenis-stopped");
      window.scrollTo(0, 0);
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

          <motion.svg
            width="58"
            height="58"
            viewBox="0 0 100 100"
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <defs>
              <linearGradient id="pl-tri" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#FFF2CD" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8C6E1C" />
              </linearGradient>
            </defs>
            <motion.path
              d="M50 10 L90 84 L10 84 Z"
              fill="none"
              stroke="url(#pl-tri)"
              strokeWidth="4"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </motion.svg>

          <div className="relative flex items-baseline gap-3">
            <span className="font-display text-5xl font-extrabold tracking-tightest gold-text md:text-6xl">
              {count}
            </span>
            <span className="font-mono text-sm text-white/40">%</span>
          </div>

          <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">
            Best Practice Solution
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
