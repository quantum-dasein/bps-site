"use client";

import { motion } from "framer-motion";

const words = [
  "Executive Search",
  "Хедхантинг",
  "Cross-border Recruitment",
  "B2B",
  "Конфиденциальность",
  "Топ-менеджмент",
  "Best Practice",
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.012] py-6">
      <div className="mask-fade-x">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {row.map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tighter2 text-white/20 md:text-3xl"
            >
              {w}
              <span className="text-gold-400/80">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
