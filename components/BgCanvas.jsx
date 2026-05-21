'use client';

import Navbar        from '@/components/Navbar';
import Hero          from '@/components/sections/Hero';
import Stats         from '@/components/sections/Stats';
import Skills        from '@/components/sections/Skills';
import Projects      from '@/components/sections/Projects';
import Education     from '@/components/sections/Education';
import Contact       from '@/components/sections/Contact';
import Footer        from '@/components/Footer';
import ThreeCanvas   from '@/components/ThreeCanvas';
import BgCanvas      from '@/components/BgCanvas';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop     from '@/components/ui/BackToTop';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      {/* Layered background system */}
      <BgCanvas />
      <div className="bg-dots" />
      <ThreeCanvas />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}