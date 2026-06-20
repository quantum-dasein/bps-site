import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bestpracticesolution.uz"),
  title: "BEST PRACTICE SOLUTION — Executive Search & Recruitment",
  description:
    "BPS — элитное агентство Executive Search & Recruitment. Подбор топ-менеджеров и редких специалистов для B2B в СНГ, ОАЭ, Китае и Индии. Строго конфиденциально.",
  keywords: [
    "Executive Search",
    "Recruitment",
    "Хедхантинг",
    "Подбор персонала",
    "B2B",
    "BPS",
    "BEST PRACTICE SOLUTION",
  ],
  openGraph: {
    title: "BEST PRACTICE SOLUTION",
    description:
      "Элитное агентство Executive Search & Recruitment. Сильные кадры в ключевых точках роста по всему миру.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body className="bg-ink font-sans text-white antialiased">
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
