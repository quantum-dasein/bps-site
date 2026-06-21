"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import { Crosshair, Globe2, SearchCheck } from "lucide-react";

const services = [
  {
    n: "01",
    icon: Crosshair,
    title: "Executive Search",
    sub: "Хедхантинг",
    text: "Целевой поиск и привлечение топ-менеджеров, директоров и редких узкопрофильных специалистов, которые сейчас не ищут работу, но готовы рассмотреть уникальное предложение.",
  },
  {
    n: "02",
    icon: Globe2,
    title: "Международный рекрутинг",
    sub: "Cross-border Recruitment",
    text: "Подбор команд и ключевых специалистов для рынков СНГ, ОАЭ, Китая, Индии и других регионов роста — когда бизнесу нужно открыть офис или наладить закупки за рубежом.",
  },
  {
    n: "03",
    icon: SearchCheck,
    title: "Глубокий скрининг и оценка",
    sub: "Screening & Assessment",
    text: "Оцениваем кандидатов не только по резюме, но и по реальному опыту, бизнес-кейсам, репутации на рынке и соответствию корпоративной культуре заказчика.",
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section-pad relative">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-bps">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">03 — Направления</span>
          <span className="section-num hidden md:block">Best Practice</span>
        </div>

        <div className="max-w-3xl">
          <h2 className="t-h2 text-white">
            <AnimatedText
              text="Подход, отличный от потокового подбора"
              highlight="потокового подбора"
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              Поскольку компания фокусируется на «лучших практиках» (Best
              Practice), ее подход к рекрутингу отличается от стандартных агентств
              потокового подбора.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col border-t border-white/[0.08]">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div
                data-cursor="hover"
                className={`group relative grid grid-cols-1 items-start gap-5 py-10 transition-colors duration-500 md:grid-cols-[auto_1fr_2fr] md:gap-12 md:py-12 ${
                  i < services.length - 1 ? "border-b border-white/[0.08]" : ""
                }`}
              >
                <span className="font-mono text-sm text-gold-400/70">{s.n}</span>

                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-300 transition-transform duration-500 group-hover:-translate-y-1">
                    <s.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight text-white transition-colors group-hover:text-gold-100 md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400/60">
                      {s.sub}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-white/55 md:text-base">
                  {s.text}
                </p>

                {/* hover sweep */}
                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
