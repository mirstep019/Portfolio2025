"use client";
import "./globals.css";
import { useEffect } from "react";
import Lenis from "lenis";
import Grain from "@/components/GrainTexture/Grain";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 1) Vytvoříme instance lenisu
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 2) Update loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3) Pouklízíme
    return () => {
      // Lenis bohužel nemá default off/kill, 
      // v praxi byste mohli odebrat event listener, 
      // ale tady nevadí.
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <Grain/>
        {children}
      </body>
    </html>
  );
}
