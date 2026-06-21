"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import Tilt from "./Tilt";
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
    <section id="about" className="section-pad relative">
      <div className="container-bps">
        <div className="mb-16 flex items-center justify-between">
          <span className="section-num">01 — О компании</span>
          <span className="section-num hidden md:block">B2B / Executive</span>
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h2 text-white">
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
              <Tilt className="h-full">
                <div
                  data-cursor="hover"
                  className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-white/[0.015] p-7 transition-colors duration-300 hover:border-gold-400/30 md:p-8"
                  style={{
                    backgroundImage:
                      "radial-gradient(220px circle at var(--mx,50%) var(--my,0%), rgba(201,166,70,0.10), transparent 60%)",
                  }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-300 transition-transform duration-300 group-hover:-translate-y-1">
                    <p.icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {p.text}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
