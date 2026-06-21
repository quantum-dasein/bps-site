"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import { ScanSearch, Crosshair, ClipboardCheck, ListChecks } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ScanSearch,
    title: "Анализ рынка",
    text: "Изучаем рынок труда, картируем компании-доноры и определяем, где находятся сильные кандидаты под задачу.",
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
    <section id="process" className="section-pad relative">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-bps">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">04 — Методология</span>
          <span className="section-num hidden md:block">Precision Search</span>
        </div>

        <div className="max-w-3xl">
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

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 top-[3.25rem] hidden h-px w-full bg-gradient-to-r from-transparent via-gold-400/30 to-transparent lg:block" />

          <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--border)] lg:grid-cols-4 lg:gap-0 lg:rounded-none lg:border-0">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group relative h-full bg-white/[0.012] p-8 lg:bg-transparent lg:px-5 lg:py-0">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-gold)] bg-ink text-gold-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold-400/60">
                      <s.icon size={24} />
                    </div>
                    <span className="font-mono text-xs text-gold-400/60">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
