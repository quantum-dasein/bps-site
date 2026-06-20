"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom gold cursor: a small solid dot + a trailing ring that eases toward
 * the pointer. The ring expands and the dot hides when hovering interactive
 * elements (anything [data-cursor] or a/button). Disabled on touch / coarse
 * pointers and when prefers-reduced-motion is set.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
      const t = e.target as HTMLElement;
      setHovering(
        !!t.closest('a, button, [data-cursor="hover"], input, [role="button"]')
      );
    };

    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dot}
        className={`absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-200 transition-opacity duration-200 ${
          hovering ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={ring}
        className={`absolute rounded-full border border-gold-400/70 transition-[width,height,margin,background-color] duration-300 ease-out ${
          hovering
            ? "-ml-6 -mt-6 h-12 w-12 bg-gold-400/10"
            : "-ml-3.5 -mt-3.5 h-7 w-7 bg-transparent"
        }`}
      />
    </div>
  );
}
