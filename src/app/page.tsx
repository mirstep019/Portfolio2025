'use client';

import { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import { useScroll } from 'framer-motion';

import Section1 from '@/components/Sections/Section1';
import Section2 from '@/components/Sections/Section2';
import Navbar   from '@/components/Navbar/Navbar';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blackRef     = useRef<HTMLDivElement>(null);

  // Framer‑motion scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Lenis smooth‑scroll init
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={containerRef} className="relative">
      <Navbar />                                             {/* už žádné theme */}
      <Section1 scrollYProgress={scrollYProgress} />         {/* bez navbarTheme */}
      <div ref={blackRef}>
        <Section2 scrollYProgress={scrollYProgress} />
      </div>
    </main>
  );
}
