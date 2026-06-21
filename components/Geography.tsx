"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import { ArrowUpRight } from "lucide-react";

const regions = [
  {
    id: "cis",
    tag: "СНГ",
    title: "СНГ",
    text: "Поиск специалистов с глубоким пониманием локальных рынков и регуляторики.",
    image: "/images/cis-market.jpg",
  },
  {
    id: "uae",
    tag: "Ближний Восток",
    title: "ОАЭ",
    text: "Подбор кадров для динамично растущего ближневосточного хаба, знающих специфику ведения бизнеса в Эмиратах.",
    image: "/images/uae-office.png",
  },
  {
    id: "asia",
    tag: "Азия",
    title: "Китай и Индия",
    text: "Работа на крупнейших производственных и технологических рынках мира, где критически важен доступ к местным базам кандидатов и знание культурных особенностей.",
    image: "/images/asia-market.png",
  },
];

export default function Geography() {
  const [active, setActive] = useState(0);
  const current = regions[active];

  return (
    <section id="geography" className="section-pad relative">
      <div className="container-bps">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">02 — География</span>
          <span className="section-num hidden md:block">Cross-border</span>
        </div>

        <div className="max-w-3xl">
          <h2 className="t-h2 text-white">
            <AnimatedText
              text="Международная экспертиза в ключевых регионах"
              highlight="ключевых регионах"
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              BPS обладает широкой международной экспертизой и закрывает вакансии
              в ключевых развивающихся и деловых регионах.
            </p>
          </Reveal>
        </div>

        {/* Interactive desktop layout */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            {regions.map((r, i) => (
              <button
                key={r.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="hover"
                className="group border-b border-white/[0.08] py-7 text-left transition-colors last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-5">
                    <span
                      className={`font-mono text-xs transition-colors ${
                        active === i ? "text-gold-400" : "text-white/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-3xl font-bold tracking-tighter2 transition-all duration-300 md:text-4xl ${
                        active === i
                          ? "gold-text translate-x-2"
                          : "text-white/45 group-hover:text-white/70"
                      }`}
                    >
                      {r.title}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`transition-all duration-300 ${
                      active === i
                        ? "translate-x-0 text-gold-300 opacity-100"
                        : "-translate-x-2 text-white/30 opacity-0"
                    }`}
                    size={26}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pl-10 pt-3 text-sm leading-relaxed text-white/55"
                    >
                      {r.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/[0.08]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
            {/* radar scan beam */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-y-10 left-0 w-1/3 animate-[scan_4.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-gold-200/12 to-transparent" />
            </div>
            {/* corner framing markers */}
            <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-gold-300/50" />
            <span className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-gold-300/50" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-gold-300/50" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-gold-300/50" />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-8">
              <span className="inline-flex rounded-full border border-gold-400/30 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-200 backdrop-blur">
                {current.tag}
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-300" />
                Signal
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>
        </div>

        {/* Mobile / tablet cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
          {regions.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <article className="group relative h-[380px] overflow-hidden rounded-3xl border border-white/[0.08]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt={r.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="mb-3 inline-flex w-fit rounded-full border border-gold-400/30 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-200 backdrop-blur">
                    {r.tag}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {r.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
