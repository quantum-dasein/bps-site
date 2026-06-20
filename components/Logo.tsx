/**
 * BPS mark — an open-corner gold triangle recreated as crisp SVG so it renders
 * perfectly on the dark theme (vector, theme-aware, no white background).
 * Swap for the client's exported asset by dropping it at /public/logo.svg and
 * replacing <LogoMark/> with an <img>.
 */
export function LogoMark({
  size = 30,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="bps-mark" x1="10" y1="86" x2="90" y2="8">
          <stop offset="0%" stopColor="#8C6E1C" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#FFF2CD" />
        </linearGradient>
      </defs>
      {/* open-corner triangle: apex -> bottom-right -> bottom-left (gap) -> up left edge */}
      <path
        d="M14 86 L92 86 L50 8 L11 80"
        stroke="url(#bps-mark)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={30} className="shrink-0" />
      {!compact && (
        <div className="leading-none">
          <span className="block font-display text-[13px] font-bold tracking-tighter2 text-white">
            BEST PRACTICE
          </span>
          <span className="mt-0.5 block font-mono text-[10px] tracking-[0.42em] gold-text">
            SOLUTION
          </span>
        </div>
      )}
    </div>
  );
}
