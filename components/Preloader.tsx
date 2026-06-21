"use client";

import { useEffect, useState } from "react";

type Phase = "loading" | "exiting" | "gone";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // lock scrolling during load (native overflow + Lenis stop)
    html.classList.add("lenis-stopped");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    let retries = 0;
    const stopLenis = () => {
      const lenis = (window as unknown as { __lenis?: { stop: () => void } })
        .__lenis;
      if (lenis) lenis.stop();
      else if (retries++ < 40) setTimeout(stopLenis, 50);
    };
    stopLenis();

    const unlock = () => {
      html.classList.remove("lenis-stopped");
      html.style.overflow = "";
      body.style.overflow = "";
      (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
      window.scrollTo(0, 0);
    };

    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("exiting");
          unlock();
          setTimeout(() => setPhase("gone"), 850);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "exiting" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-faint-grid opacity-30" />

      <svg width="58" height="58" viewBox="0 0 100 100" className="relative mb-8">
        <defs>
          <linearGradient id="pl-tri" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#FFF2CD" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6E1C" />
          </linearGradient>
        </defs>
        <path
          d="M50 10 L90 84 L10 84 Z"
          fill="none"
          stroke="url(#pl-tri)"
          strokeWidth="4"
          strokeLinejoin="round"
          className="animate-[dash_1.6s_ease-in-out_forwards]"
          style={{ strokeDasharray: 260, strokeDashoffset: 260 }}
        />
      </svg>

      <div className="relative flex items-baseline gap-3">
        <span className="font-display text-5xl font-extrabold tracking-tightest gold-text md:text-6xl">
          {count}
        </span>
        <span className="font-mono text-sm text-white/40">%</span>
      </div>

      <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">
        Best Practice Solution
      </p>
    </div>
  );
}
