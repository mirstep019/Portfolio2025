"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Section2() {
  /* 1️⃣ DOM ref */
  const ref = useRef<HTMLElement | null>(null);

  /* 2️⃣ Scroll 0 → 1  (sekce končí 25 % nad spodkem viewportu) */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end -25%"],
  });

  /* 3️⃣ Fade‑in jednotlivých řádků */
  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  /* 4️⃣ Fade‑out CELÉHO bloku – musí se stihnout v černé sekci */
  //  0.45 → 0.6  (viditelné na desktopu i mobilu v rámci sekce)
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.45, 0.6],
    [0, 1, 1, 0]
  );

  /* 5️⃣ Vertikální pohyb – po dokončení fade‑outu blesk pryč */
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.6, 0.7, 1],
    ["-50%", "-50%", "-50%", "-350%"]
  );

  return (
    <>
      {/* Černá sekce – jen 150 vh */}
      <section
        ref={ref}
        className="relative h-[300vh] bg-[#1c1919] text-white rounded-xl lg:rounded-[30px] overflow-hidden"
      >
        {/* Pevný textový blok */}
        <motion.div
          style={{ translateY, opacity: containerOpacity }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none"
        >
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
        </motion.div>
      </section>

      {/* Extra scroll – ¼ viewport pro plynulý odchod */}
      <div aria-hidden className="h-[25vh]"></div>
    </>
  );
}
