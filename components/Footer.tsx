"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import Logo, { LogoMark } from "./Logo";
import Magnetic from "./Magnetic";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[44vw] w-[80vw] -translate-x-1/2 rounded-full bg-radial-fade blur-3xl" />

      <div className="container-bps relative">
        <div className="mb-14 flex items-center justify-between">
          <span className="section-num">06 — Контакты</span>
          <span className="section-num hidden md:block">Ташкент, UZ</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-h2 text-white">
              <AnimatedText
                text="Давайте усилим вашу команду"
                highlight="команду"
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-white/60">
                Опишите задачу — мы подберем сильных кандидатов в ключевых точках
                роста по всему миру. Строго конфиденциально.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Magnetic strength={0.35} className="mt-9 inline-block">
                <a
                  href="mailto:info@bestpracticesolution.uz"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold text-black"
                >
                  Написать нам
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <div className="grid gap-4 self-end">
            <Reveal delay={0.1}>
              <a
                href="mailto:info@bestpracticesolution.uz"
                data-cursor="hover"
                className="glass-card group flex items-center justify-between p-6 transition-colors hover:border-gold-400/30"
              >
                <div className="flex items-center gap-4">
                  <Mail className="text-gold-300" size={22} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Email
                    </p>
                    <p className="mt-1 text-base text-white">
                      info@bestpracticesolution.uz
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300"
                  size={20}
                />
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="glass-card flex items-center gap-4 p-6">
                <Phone className="text-gold-300" size={22} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Телефон
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                    <a
                      href="tel:+998335011530"
                      data-cursor="hover"
                      className="text-base text-white transition-colors hover:text-gold-200"
                    >
                      +998 33 501 15 30
                    </a>
                    <a
                      href="tel:+998200032017"
                      data-cursor="hover"
                      className="text-base text-white transition-colors hover:text-gold-200"
                    >
                      +998 20 003 20 17
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="glass-card flex items-center gap-4 p-6">
                <MapPin className="text-gold-300" size={22} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Адрес
                  </p>
                  <p className="mt-1 text-base text-white">
                    Ташкент, Узбекистан
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="relative mt-24 select-none">
          <div className="flex items-center justify-center gap-6 opacity-[0.9]">
            <LogoMark size={48} className="hidden sm:block" />
            <span className="font-display text-[18vw] font-extrabold leading-none tracking-tightest text-stroke-gold md:text-[13rem]">
              BPS
            </span>
          </div>
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <Logo />
          <p className="font-mono text-[11px] text-white/40">
            © {year} BEST PRACTICE SOLUTION — Executive Search &amp; Recruitment
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
            B2B · Конфиденциально
          </p>
        </div>
      </div>
    </footer>
  );
}
