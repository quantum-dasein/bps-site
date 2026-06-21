"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./Magnetic";

const links = [
  { href: "#about", label: "О компании", num: "01" },
  { href: "#geography", label: "География", num: "02" },
  { href: "#expertise", label: "Направления", num: "03" },
  { href: "#process", label: "Как мы работаем", num: "04" },
  { href: "#why", label: "Почему мы", num: "05" },
  { href: "#contact", label: "Контакты", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* top scrim — masks content peeking through the floating-header gap */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-[7900] h-24 bg-gradient-to-b from-ink via-ink/80 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 2.4 }}
        className="fixed inset-x-0 top-0 z-[8000] px-3 pt-3"
      >
      <div
        className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 md:px-7 ${
          scrolled
            ? "border border-white/[0.07] bg-black/55 backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#hero" aria-label="BPS — на главную" data-cursor="hover">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="group relative flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <span className="font-mono text-[9px] text-gold-400/60">
                {l.num}
              </span>
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Magnetic strength={0.5} className="hidden xl:block">
          <a href="#contact" data-cursor="hover" className="btn-gold !py-2.5">
            Обсудить задачу
            <ArrowRight size={15} />
          </a>
        </Magnetic>

        <button
          aria-label="Меню"
          className="text-white xl:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-[1280px] overflow-hidden rounded-2xl border border-white/[0.07] bg-black/90 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-col p-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span className="font-mono text-[10px] text-gold-400/60">
                    {l.num}
                  </span>
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gold-gradient px-4 py-3.5 text-center text-base font-semibold text-black"
              >
                Обсудить задачу
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>
    </>
  );
}
