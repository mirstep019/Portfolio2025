"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ACCENT = "#124e44";
const SILHOUETTE_OPACITY = 0.18;

/* ───────── komponenta pro jediný řádek ───────── */
function AnimatedLine({
  text,
  start,
  end,
  progress,
  className,
}: {
  text: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  className: string;
}) {
  const letters = text.split("");
  const total = letters.length;

  return (
    <span className={`${className} relative block`}>
      <span
        className="absolute inset-0 select-none"
        style={{ color: ACCENT, opacity: SILHOUETTE_OPACITY }}
      >
        {text}
      </span>

      {letters.map((char, i) => {
        const letterStart = start + (i / total) * (end - start);
        const letterEnd = start + ((i + 1) / total) * (end - start);
        const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);

        return (
          <motion.span key={i} style={{ opacity, color: ACCENT }}>
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

export default function Section2() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.58, 0.92], ["-50%", "-50%", "-320%"]);

  return (
    <section
      ref={ref}
      id="section2"
      data-scroll-section
      className="relative h-[550vh] bg-[#1c1919] rounded-xl lg:rounded-[30px] overflow-hidden"
    >
      {/* fixní vrstva – text + čára */}
      <motion.div
        data-scroll
        data-scroll-sticky
        data-scroll-target="#section2"
        data-scroll-css-progress
        style={{ translateY, opacity: containerOpacity }}
        className="
           fixed top-1/2 left-1/2 -translate-x-1/2
          flex flex-col items-center text-center pointer-events-none 
        "
      >
        <AnimatedLine
          text="MAKING"
          start={0.06}
          end={0.26}
          progress={scrollYProgress}
          className="text-[9vw] sm:text-[6vw] font-[700] alpino uppercase leading-none"
        />

        <AnimatedLine
          text="websites"
          start={0.26}
          end={0.46}
          progress={scrollYProgress}
          className="text-[9vw] sm:text-[7.5vw] alex-brush italic leading-none"
        />

        <AnimatedLine
          text="Outstanding."
          start={0.46}
          end={0.58}
          progress={scrollYProgress}
          className="text-[9vw] sm:text-[6.5vw] general-sans font-semibold leading-none"
        />

        {/* čára řízená pomocí --progress */}
        <span
          className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-[7px] origin-top rounded-b-full bg-[#124e44]"
          style={{
            height: "calc(var(--progress, 0) * 100vh)",
          }}
        />
      </motion.div>
    </section>
  );
}
