"use client";

import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import Logo, { LogoMark } from "./Logo";
import dynamic from "next/dynamic";
import ContactForm from "./ContactForm";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* left: heading + contact cards + interactive 3D globe */}
          <div className="relative">
            <div className="glow-pool bottom-0 left-1/2 hidden h-[24rem] w-[24rem] -translate-x-1/2 translate-y-[24%] lg:block" />
            {/* interactive 3D globe — sits low, behind the cards, so it never
                covers the heading text */}
            <Globe3D className="pointer-events-none absolute bottom-0 left-1/2 hidden aspect-square w-[86%] max-w-[420px] -translate-x-1/2 translate-y-[28%] lg:block" />

            <h2 className="t-h2 relative text-white">
              <AnimatedText
                text="Давайте усилим вашу команду"
                highlight="команду"
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="relative mt-7 max-w-md t-lead text-[var(--muted)]">
                Опишите задачу — мы подберем сильных кандидатов в ключевых точках
                роста по всему миру. Строго конфиденциально.
              </p>
            </Reveal>

            <div className="relative mt-10 grid gap-3">
              <Reveal delay={0.2}>
                <a
                  href="mailto:info@bestpracticesolution.uz"
                  data-cursor="hover"
                  className="glass-card group flex items-center justify-between p-5 transition-colors hover:border-gold-400/30"
                >
                  <div className="flex items-center gap-4">
                    <Mail className="text-gold-300" size={20} />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                        Email
                      </p>
                      <p className="mt-1 text-[15px] text-white">
                        info@bestpracticesolution.uz
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300"
                    size={18}
                  />
                </a>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="glass-card flex items-center gap-4 p-5">
                  <Phone className="text-gold-300" size={20} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                      Телефон
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                      <a
                        href="tel:+998335011530"
                        data-cursor="hover"
                        className="text-[15px] text-white transition-colors hover:text-gold-200"
                      >
                        +998 33 501 15 30
                      </a>
                      <a
                        href="tel:+998200032017"
                        data-cursor="hover"
                        className="text-[15px] text-white transition-colors hover:text-gold-200"
                      >
                        +998 20 003 20 17
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="glass-card flex items-center gap-4 p-5">
                  <MapPin className="text-gold-300" size={20} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                      Адрес
                    </p>
                    <p className="mt-1 text-[15px] text-white">
                      Ташкент, Узбекистан
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* right: working contact form */}
          <Reveal delay={0.15} className="self-center">
            <ContactForm />
          </Reveal>
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
