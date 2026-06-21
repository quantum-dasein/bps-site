import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Geography from "@/components/Geography";
import Expertise from "@/components/Expertise";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <Marquee />
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Stats />
      </ScrollReveal>
      <ScrollReveal>
        <Geography />
      </ScrollReveal>
      <ScrollReveal>
        <Expertise />
      </ScrollReveal>
      <ScrollReveal>
        <Process />
      </ScrollReveal>
      <ScrollReveal>
        <WhyUs />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
