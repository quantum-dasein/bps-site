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
          DEFAULT: "#080807",
          900: "#0A0A0A",
          800: "#0E0E0F",
          card: "#121211",
          line: "#1C1C1A",
        },
        gold: {
          50: "#FFF8E6",
          100: "#FFF2CD",
          200: "#F2E1A6",
          300: "#E4C97A",
          400: "#D4AF37",
          500: "#BE9A2E",
          deep: "#8C6E1C",
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
          "linear-gradient(135deg, #FFF2CD 0%, #D4AF37 48%, #8C6E1C 100%)",
        "gold-sheen":
          "linear-gradient(110deg, #8C6E1C 0%, #D4AF37 20%, #FFF2CD 48%, #D4AF37 76%, #8C6E1C 100%)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 40%, rgba(212,175,55,0.14), transparent 70%)",
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
