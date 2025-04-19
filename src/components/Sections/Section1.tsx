"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Button from "@/components/Button/Button";

function AnimatedText({ text }: { text: string }) {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letter} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

type Section1Props = {
  scrollYProgress: MotionValue<number>;
};

export default function Section1({ scrollYProgress }: Section1Props) {
  // scale + opacity při scrollu
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <>
      <motion.div
        style={{ scale, opacity }}
        className="h-screen sticky top-0 flex flex-col text-black font-['General_Sans']"
      >
        <section className="flex flex-col flex-grow justify-between pt-[72px] pb-[10vh] px-6 md:px-16 lg:px-24 max-[578px]:px-2 max-[578px]:pb-[17vh]">
          {/* Prostřední blok */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="relative text-[14vw] tracking-tight font-black text-stone-900 leading-[0.7] uppercase w-full select-none">
              <div className="alpino mx-auto text-center md:text-left max-[900px]:text-center max-[900px]:mx-auto max-[900px]:text-[16vw] max-[400px]:text-[18vw] ">
                <AnimatedText text="Miroslav" />
              </div>
              <div className="alpino mx-auto text-center md:text-right max-[900px]:text-center max-[900px]:mx-auto max-[900px]:text-[16vw] max-[400px]:text-[18vw]">
                <AnimatedText text="Stepanek" /> 
              </div>
            </div>

            {/* Linka + role */}
            <div className="relative -mx-6 md:-mx-16 lg:-mx-24 mt-4 flex items-center py-4 w-full">
              <motion.div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-gray-400 z-0 max-[900px]:hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
              />
              <motion.div
                className="relative flex justify-around lg:justify-around w-full max-[900px]:justify-center max-[578px]:justify-between  gap-x-0 lg:gap-x-4 md:gap-x-4 sm:gap-x-0  md:text-lg  font-medium text-gray-600 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {["Creative", "Web Developer", "Designer", "Freelancer"].map(
                  (role, index) => (
                    <motion.span
                      key={index}
                      className="px-4 max-[580px]:px-0 max-[580px]:text-xs max-[358px]:text-[10px] max-[578px]:w-full max-[578px]:text-center bg-[#f7f1eb]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + index * 0.2,
                      }}
                    >
                      {role}
                    </motion.span>
                  )
                )}
              </motion.div>
            </div>
          </div>

          {/* Spodní blok */}
          <div
            className="
    flex w-full justify-between items-end
    max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6
  max-[578px]:items-stretch"
          >
            {/* Text + Button */}
            <div
              className="
      text-left
      max-[900px]:w-full max-[900px]:text-center
    "
            >
              <motion.p
                className="
         text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl
    text-gray-700 max-w-md plus-jakarta font-medium
    mx-auto
      "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Helping brands and startups{" "}
                <span className="font-bold">level up</span> their websites to
                ensure they win.
              </motion.p>

              <motion.div
                className="mt-8 max-[900px]:mt-20 max-[500px]:mt-15"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <Button />
              </motion.div>
            </div>

            {/* Available for work */}
            <motion.div
              className="
      px-6 py-3 border border-gray-500 rounded-lg text-lg text-center font-normal
      general-sans
      max-[900px]:mx-auto max-[500px]:mt-7
    "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Available for work <br />
              <span className="text-gray-500">June 2025</span>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
