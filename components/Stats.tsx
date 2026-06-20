"use client";

import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { value: 4, suffix: "", label: "ключевых рынка", sub: "СНГ · ОАЭ · Китай · Индия" },
  { value: 3, suffix: "", label: "региона-хаба", sub: "международная экспертиза" },
  { value: 3, suffix: "", label: "кандидата в шорт-листе", sub: "финальная выборка 2–3" },
  { value: 100, suffix: "%", label: "конфиденциальность", sub: "поиск в тайне от рынка" },
];

export default function Stats() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-bps">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 rounded-3xl border border-white/[0.07] bg-white/[0.012] p-10 md:grid-cols-4 md:p-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center md:text-left">
                <div className="flex items-baseline justify-center font-display text-5xl font-extrabold tracking-tightest md:justify-start md:text-6xl">
                  <span className="gold-text">
                    <Counter value={s.value} />
                  </span>
                  <span className="gold-text">{s.suffix}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-white/80">
                  {s.label}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
                  {s.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
