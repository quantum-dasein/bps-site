"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import { Building2, UserX, Target } from "lucide-react";

const points = [
  {
    icon: Building2,
    title: "Только B2B",
    text: "Бизнес для бизнеса. Наши клиенты — организации, которым нужно закрыть сложные и руководящие позиции.",
  },
  {
    icon: UserX,
    title: "Не «пристраивание»",
    text: "Мы не занимаемся трудоустройством частных лиц и не принимаем резюме ради устройства соискателей.",
  },
  {
    icon: Target,
    title: "Сложные позиции",
    text: "Фокус на дефицитных, узкопрофильных и руководящих ролях, где потоковый подбор бессилен.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-bps">
        <div className="mb-16 flex items-center justify-between">
          <span className="section-num">01 — О компании</span>
          <span className="section-num hidden md:block">B2B / Executive</span>
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tightest text-white md:text-[3.4rem]">
              <AnimatedText
                text="Агентство, которое работает с лучшими практиками"
                highlight="лучшими практиками"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-white/60">
                <span className="text-white">BEST PRACTICE SOLUTION (BPS)</span>{" "}
                — это агентство по подбору персонала (Executive Search &amp;
                Recruitment), которое специализируется на поиске и привлечении
                высококвалифицированных кадров. Компания работает строго в
                сегменте B2B: она не занимается трудоустройством частных лиц и не
                принимает резюме от соискателей ради их «пристраивания». Ее
                клиенты — это организации, которым нужно закрыть сложные,
                дефицитные или руководящие позиции.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                data-cursor="hover"
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 transition-colors duration-300 hover:border-gold-400/30 md:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-300 transition-transform duration-300 group-hover:-translate-y-1">
                  <p.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {p.text}
                </p>
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
