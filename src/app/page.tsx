"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";
import Button from "@/components/Button/Button"; // <-- import

/* Komponenta pro animovaný text písmeno po písmenu */
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

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="text-black min-h-screen font-['General_Sans'] flex flex-col">
      {/* 1) Navbar nahoře */}
      <Navbar />

      {/* 2) Sekce zabírá zbytek místa: justify-between, aby se spodek „přilepil“ dolů */}
      <section className="flex flex-col flex-grow justify-between px-6 md:px-16 lg:px-24 pt-0 pb-[7vh]">
        
        {/* Prostřední blok – vycentrovaný vertikálně i horizontálně */}
        <div className="flex flex-col items-center justify-center flex-grow">
          {/* Nadpis (zůstává levá+pravá align uvnitř, ale celý blok je horizontálně vycentrovaný) */}
          <div className="relative text-[14vw] tracking-tight font-black text-stone-900 leading-[0.7] uppercase w-full select-none">
            <div className="text-left alpino">
              <AnimatedText text="Miroslav" />
            </div>
            <div className="text-right alpino">
              <AnimatedText text="Stepanek" />
            </div>
          </div>

          {/* Linka + role (edge-to-edge) */}
          <div className="relative -mx-6 md:-mx-16 lg:-mx-24 mt-4 flex items-center py-4 w-full">
            <motion.div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-gray-400 z-0"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
            />
            <motion.div
              className="relative flex justify-around items-center w-full text-lg font-medium text-gray-600 general-sans z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {["Creative", "Web Developer", "Designer", "Freelancer"].map(
                (role, index) => (
                  <motion.span
                    key={index}
                    className="px-4 bg-[#f7f1eb]"
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

        {/* 3) Spodní blok (zarovnaný dolů, s mezerou pb-16) */}
        <div className="flex justify-between items-end w-full">
          <div className="text-left w-1/2">
            <motion.p
              className="text-3xl text-gray-700 max-w-xl plus-jakarta font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Helping brands and startups{" "}
              <span className="font-bold">level up</span> their websites to
              ensure they win.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Button />
            </motion.div>
          </div>

          <motion.div
            className="px-6 py-3 border border-gray-500 rounded-lg text-lg text-center font-normal general-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Available for work <br />
            <span className="text-gray-500">June 2025</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
