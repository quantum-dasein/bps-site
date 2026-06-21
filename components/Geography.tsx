"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import AutoImage from "./AutoImage";

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
    text: "Крупнейшие производственные и технологические рынки мира — доступ к местным базам кандидатов и знание культурных особенностей.",
    image: "/images/asia-market.png",
  },
  {
    id: "pakistan",
    tag: "Южная Азия",
    title: "Пакистан",
    text: "Растущий рынок труда — поиск технических, производственных и инженерных специалистов.",
    image: "/images/pakistan.png",
  },
];

export default function Geography() {
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
            <p className="mt-6 max-w-xl t-lead text-[var(--muted)]">
              BPS закрывает вакансии в ключевых развивающихся и деловых регионах
              мира.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08} className="h-full">
              <article
                data-cursor="hover"
                className="group relative h-[420px] overflow-hidden rounded-3xl border border-[var(--border)]"
              >
                <AutoImage
                  src={r.image}
                  alt={r.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  fallback={
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-deep/30 via-ink to-ink" />
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gold-400/70">
                      0{i + 1}
                    </span>
                    <span className="inline-flex rounded-full border border-gold-400/30 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
                      {r.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {r.text}
                    </p>
                    <div className="mt-4 h-px w-10 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
