import Preloader from "@/components/Preloader";
import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <>
      <Preloader />
      <LenisProvider />
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Work />
        <About />
        <Capabilities />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
