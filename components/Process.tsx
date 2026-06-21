"use client";

import dynamic from "next/dynamic";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";

const Radar3D = dynamic(() => import("./Radar3D"), { ssr: false });
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

export default function Process() {
  return (
    <section id="process" className="section-pad relative overflow-hidden">
      <div className="container-bps">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">04 — Методология</span>
          <span className="section-num hidden md:block">Precision Search</span>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
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

          {/* interactive 3D radar (falls back to image / SVG on mobile + reduced-motion) */}
          <Reveal delay={0.15}>
            <div className="relative aspect-square w-full lg:-my-10 lg:scale-110">
              <div className="glow-pool inset-[6%]" />
              <Radar3D className="relative h-full w-full" />
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
                  className="mt-auto pt-6 text-gold-400/70 transition-transform duration-300 group-hover:translate-x-1"
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
