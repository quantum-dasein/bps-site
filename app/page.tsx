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

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Geography />
      <Expertise />
      <Process />
      <WhyUs />
      <Footer />
    </main>
  );
}
