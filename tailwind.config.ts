import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#040403",
          900: "#070706",
          800: "#0B0B09",
          card: "#100F0D",
          line: "#1A1916",
        },
        gold: {
          50: "#F7EFD6",
          100: "#EBD9A0",
          200: "#E4C96A",
          300: "#D6B658",
          400: "#C9A646",
          500: "#A98B38",
          deep: "#7D6525",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.03em",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #EBD9A0 0%, #C9A646 50%, #7D6525 100%)",
        "gold-sheen":
          "linear-gradient(110deg, #7D6525 0%, #C9A646 22%, #F2E6C2 50%, #C9A646 78%, #7D6525 100%)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 40%, rgba(201,166,70,0.12), transparent 70%)",
      },
      keyframes: {
        sheen: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        spinslow: {
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        sheen: "sheen 7s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        spinslow: "spinslow 26s linear infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
