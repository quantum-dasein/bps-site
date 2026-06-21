"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import { Clock, MapPinned, Lock, UserSearch, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Экономия времени менеджмента",
    text: "Агентство берет на себя весь цикл — от глубинного анализа рынка и первичных собеседований до проверки рекомендаций. Заказчик получает финальный шорт-лист из 2–3 идеальных кандидатов.",
  },
  {
    icon: MapPinned,
    title: "Экспертиза в сложных регионах",
    text: "Найти сильного специалиста в Китае или ОАЭ, не зная специфики местного рынка труда — задача почти невыполнимая для внутреннего HR. BPS решает эту проблему за счет отлаженных каналов поиска.",
  },
  {
    icon: Lock,
    title: "Конфиденциальность",
    text: "Часто замена топ-менеджера или открытие нового направления должны оставаться в тайне от рынка и конкурентов. BPS проводит поиск строго конфиденциально.",
  },
  {
    icon: UserSearch,
    title: "Работа с пассивными кандидатами",
    text: "Мы выходим на сильных специалистов, которые не размещают резюме и не откликаются на вакансии — но рассматривают точечные предложения.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="section-pad relative">
      <div className="container-bps">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">05 — Почему мы</span>
          <span className="section-num hidden md:block">Стратегический партнер</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="t-h2 text-white">
              <AnimatedText
                text="Почему компании обращаются в BPS?"
                highlight="BPS?"
              />
            </h2>

            <Reveal delay={0.15}>
              <div className="mt-10 rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-400/[0.08] to-transparent p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-300">
                  Главный итог
                </p>
                <p className="mt-3 text-base leading-relaxed text-white/80">
                  BEST PRACTICE SOLUTION выступает как стратегический партнер для
                  бизнеса, который усиливает команды своих клиентов сильными
                  кадрами в ключевых точках роста по всему миру.
                </p>
                <a
                  href="#contact"
                  data-cursor="hover"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-200 transition-colors hover:text-gold-100"
                >
                  Стать партнером
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-px overflow-hidden rounded-3xl border border-white/[0.08]">
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.08}>
                  <div
                    data-cursor="hover"
                    className="group flex items-start gap-6 bg-white/[0.012] p-7 transition-colors duration-300 hover:bg-white/[0.04] md:p-9"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-black transition-transform duration-300 group-hover:scale-105">
                      <r.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55 md:text-base">
                        {r.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
