"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import AutoImage from "./AutoImage";
import {
  ScanSearch,
  Crosshair,
  ClipboardCheck,
  ListChecks,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ScanSearch,
    title: "Анализ рынка",
    text: "Изучаем рынок труда, картируем компании-лидеры и определяем, где находятся сильные кандидаты под задачу.",
  },
  {
    n: "02",
    icon: Crosshair,
    title: "Целевой поиск",
    text: "Выстраиваем прямой выход на пассивных кандидатов — тех, кто сейчас не ищет работу, но готов к уникальному предложению.",
  },
  {
    n: "03",
    icon: ClipboardCheck,
    title: "Глубокая оценка",
    text: "Проверяем опыт, реальные бизнес-кейсы, репутацию на рынке и соответствие корпоративной культуре заказчика.",
  },
  {
    n: "04",
    icon: ListChecks,
    title: "Шорт-лист 2–3",
    text: "Выводим заказчика на короткий список идеальных кандидатов с проверенными рекомендациями.",
  },
];

/** SVG radar used until /images/methodology-radar.png is provided. */
function RadarFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="rad-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2CD" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6E1C" />
          </radialGradient>
        </defs>
        <g
          transform="translate(200 150)"
          stroke="rgba(201,166,70,0.35)"
          fill="none"
        >
          {[40, 75, 110, 130].map((r) => (
            <ellipse key={r} rx={r * 1.25} ry={r * 0.6} strokeWidth="1" />
          ))}
          {/* connecting spokes */}
          <line x1="-200" y1="0" x2="200" y2="0" strokeWidth="0.6" />
          <line x1="0" y1="-95" x2="0" y2="95" strokeWidth="0.6" />
        </g>
        {/* candidate nodes */}
        {[
          [120, 70],
          [285, 120],
          [250, 215],
          [110, 205],
          [320, 60],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#E4C96A">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={x} cy={y} r="9" fill="none" stroke="rgba(201,166,70,0.3)" />
          </g>
        ))}
        {/* center */}
        <circle cx="200" cy="150" r="11" fill="url(#rad-core)" />
        <circle cx="200" cy="150" r="20" fill="none" stroke="rgba(201,166,70,0.4)">
          <animate
            attributeName="r"
            values="14;40"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="section-pad relative overflow-hidden">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-bps">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">04 — Методология</span>
          <span className="section-num hidden md:block">Precision Search</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          {/* heading + copy */}
          <div>
            <h2 className="t-h2 text-white">
              <AnimatedText
                text="Целевой поиск вместо потока резюме"
                highlight="потока резюме"
              />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl t-lead text-[var(--muted)]">
                Мы не работаем с потоком резюме. Мы выстраиваем целевой поиск,
                анализируем рынок и выводим заказчика на короткий список
                кандидатов, соответствующих задачам бизнеса.
              </p>
            </Reveal>
          </div>

          {/* radar visual (image slot with graceful fallback) */}
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] w-full">
              <div className="glow-pool inset-[10%]" />
              <AutoImage
                src="/images/methodology-radar.png"
                alt="Целевой поиск кандидатов"
                className="relative h-full w-full object-contain"
                fallback={<RadarFallback />}
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white/[0.025] p-7 transition-colors duration-300 hover:border-gold-400/35">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-black shadow-[0_8px_24px_-8px_rgba(201,166,70,0.6)] transition-transform duration-300 group-hover:-translate-y-1">
                    <s.icon size={22} />
                  </div>
                  <span className="font-mono text-2xl text-white/15">{s.n}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {s.text}
                </p>
                <ArrowRight
                  size={18}
                  className="mt-5 text-gold-400/70 transition-transform duration-300 group-hover:translate-x-1"
                />
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex justify-center">
            <span className="chip-line">
              <ShieldCheck size={14} />
              Строгая конфиденциальность на каждом этапе
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
