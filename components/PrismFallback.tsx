"use client";

/**
 * Lightweight, dependency-free hero visual used on mobile / low-power devices
 * and when prefers-reduced-motion is set. Renders a metallic gold triangular
 * prism in SVG with a soft glow and gentle float — no WebGL, no main-thread cost.
 */
export default function PrismFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vw] w-[55vw] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-fade blur-2xl" />
      <svg
        viewBox="0 0 200 200"
        className="relative h-[60vw] max-h-[360px] w-[60vw] max-w-[360px] animate-floaty"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pf-face-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2E6C2" />
            <stop offset="55%" stopColor="#C9A646" />
            <stop offset="100%" stopColor="#7D6525" />
          </linearGradient>
          <linearGradient id="pf-face-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7D6525" />
            <stop offset="60%" stopColor="#A98B38" />
            <stop offset="100%" stopColor="#E4C96A" />
          </linearGradient>
          <filter id="pf-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#pf-glow)">
          {/* left face */}
          <path d="M100 28 L100 165 L34 150 Z" fill="url(#pf-face-a)" />
          {/* right face */}
          <path d="M100 28 L100 165 L166 150 Z" fill="url(#pf-face-b)" opacity="0.92" />
          {/* bright edge */}
          <path d="M100 28 L100 165" stroke="#FFF6DC" strokeWidth="1.5" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
