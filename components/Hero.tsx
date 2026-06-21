"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Magnetic from "./Magnetic";
import PrismFallback from "./PrismFallback";
import AutoImage from "./AutoImage";

const PyramidScene = dynamic(() => import("./PyramidScene"), { ssr: false });

const LINE_DELAY = 2.45; // start after the preloader has exited

const lineVariant = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.95,
      delay: LINE_DELAY + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: LINE_DELAY + 0.4 + i * 0.1 },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Use full WebGL only on capable, motion-friendly desktops; otherwise the
  // lightweight SVG fallback keeps mobile fast and respects reduced-motion.
  const [use3D, setUse3D] = useState(false);
  // mouse parallax for the hero visual (desktop only)
  const px = useSpring(0, { stiffness: 60, damping: 18, mass: 0.4 });
  const py = useSpring(0, { stiffness: 60, damping: 18, mass: 0.4 });
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const big = window.matchMedia("(min-width: 768px)").matches;
    setUse3D(big && !reduce);
    if (reduce || !big) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 36);
      py.set((e.clientY / window.innerHeight - 0.5) * 28);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-faint-grid mask-fade-b opacity-40" />
      <div className="pointer-events-none absolute left-[42%] top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 animate-pulseGlow rounded-full bg-radial-fade blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />

      {/* 3D prism (WebGL on capable desktops, SVG fallback otherwise) */}
      <motion.div
        style={{ y: sceneY, opacity: fadeOut }}
        className="absolute inset-0 z-10 md:left-[38%]"
      >
        <motion.div style={{ x: px, y: py }} className="h-full w-full scale-110">
          <AutoImage
            src="/images/hero-pyramid.png"
            alt="Золотая призма BPS"
            className="h-full w-full object-cover object-center"
            fallback={use3D ? <PyramidScene /> : <PrismFallback />}
          />
        </motion.div>
      </motion.div>

      {/* legibility scrim over the scene on small screens (keeps the headline
          readable while the gold pyramid glows behind the lower half) */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-ink via-ink/55 to-ink/85 md:hidden" />

      <motion.div
        style={{ y: textY }}
        className="container-bps relative z-20 grid items-center gap-10 pb-20 pt-32 md:grid-cols-[1.1fr_0.9fr] md:pb-0 md:pt-36"
      >
        <div>
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gold-gradient" />
            <span className="eyebrow">Executive Search &amp; Recruitment</span>
          </motion.div>

          <h1 className="t-display text-white">
            {["Сильные кадры", "для точек роста"].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                custom={2}
                variants={lineVariant}
                initial="hidden"
                animate="show"
                className="block gold-text-anim"
              >
                вашего бизнеса
              </motion.span>
            </span>
          </h1>

          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-[34rem] t-lead text-[var(--muted)]"
          >
            Executive Search &amp; Recruitment для B2B-компаний, которым нужно
            закрыть сложные, конфиденциальные и руководящие позиции в ключевых
            регионах роста.
          </motion.p>

          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.4}>
              <a href="#contact" data-cursor="hover" className="btn-gold group">
                Обсудить задачу
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <a href="#about" data-cursor="hover" className="btn-ghost">
              О компании
            </a>
          </motion.div>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40"
          >
            <ShieldCheck size={15} className="text-gold-300" />
            Строгая конфиденциальность поиска
          </motion.div>
        </div>

        <div className="hidden md:block" />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 md:block"
      >
        <div className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
          Scroll
          <span className="h-9 w-px animate-pulse bg-gradient-to-b from-gold-300 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
