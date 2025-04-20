"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Section2() {
  const ref = useRef<HTMLElement>(null);

  /* progress jen pro tuto sekci (0 → 1) */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ── 1. FÁZE: pomalejší fade‑in řádků ────────────────────────── */
  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  /* ── 2. FÁZE: růst čáry (0 vh → 100 vh) až do konce sekce ───── */
  const barHeight   = useTransform(scrollYProgress, [0.35, 1], ["0vh", "100vh"]);

  /* ── 3. FÁZE: odjezd textu nahoru – zůstane fixně, pak zmizí ── */
  const translateY  = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    ["-50%", "-50%", "-250%"]
  );

  return (
    <section
      ref={ref}
      className="
        relative h-[350vh]            /* prostor pro celý průběh */
        bg-[#1c1919] text-white
        rounded-xl lg:rounded-[30px]
        overflow-hidden
      "
    >
      {/* ------------ TEXT + ČÁRA (fixní vrstva) -------------- */}
      <motion.div
        style={{ translateY }}
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2
          flex flex-col items-center text-center
          pointer-events-none
        "
      >
        {/* ✨ Tři řádky ✨ */}
        <div className="flex flex-col leading-none space-y-3 z-10">
          <motion.h2
            style={{ opacity: line1Opacity }}
            className="text-[9vw] sm:text-[6vw] font-[700] alpino uppercase"
          >
            MAKING
          </motion.h2>

          <motion.h2
            style={{ opacity: line2Opacity }}
            className="text-[9vw] sm:text-[7.5vw] alex-brush italic"
          >
            websites
          </motion.h2>

          <motion.h2
            style={{ opacity: line3Opacity }}
            className="text-[9vw] sm:text-[6.5vw] general-sans font-semibold"
          >
            Outstanding<span>.</span>
          </motion.h2>
        </div>

        {/* ↓ Rostoucí čára ↓ */}
        <motion.span
          style={{ height: barHeight }}
          className="
            absolute top-full mt-6
            left-1/2 -translate-x-1/2
            w-[7px] bg-white origin-top
            rounded-b-full
          "
        />
      </motion.div>
    </section>
  );
}
