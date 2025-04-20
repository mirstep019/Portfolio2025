/* ------------------------------------------------------------------
   Navbar – plynulé zleva‑doprava načítání všech prvků (Framer Motion)
   ------------------------------------------------------------------ */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

/* ---------- variants ---------- */
const navbarVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 2,
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 }, // pořadí: brand → based‑in → odkazy → dualBtn
  },
};

const itemVariants = {
  hidden: { y: -40, opacity: 0 }, // slide‑in zleva
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ---------- component ---------- */
export default function Navbar() {
  const [lang, setLang] = useState<"CZ" | "EN">("EN");
  const [timeString, setTime] = useState("");

  /* local time updater ------------------------------------------------ */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h12 = now.getHours() % 12 || 12;
      const hh = String(h12).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "pm" : "am";
      setTime(`${hh}:${mm} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "CZ" ? "EN" : "CZ"));

  /* ------------------------------------------------------------------ */
  return (
    <motion.div /* 1. vrstva přes celou šířku */
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className="
           absolute inset-x-0 top-0 h-[75px]
           px-8 md:px-12 lg:px-10
           flex items-center bg-transparent text-black z-50
         "
    >
      {/* jediný kontejner se staggerem */}
      <motion.div
        className="flex w-full justify-between items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ----------------- LEVÁ STRANA ----------------- */}
        <div className="flex items-center space-x-6">
          <motion.h1
            variants={itemVariants}
            className="text-xl font-bold tracking-tight select-none"
          >
            mirastep.
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center space-x-5 text-xl text-gray-500"
          >
            <span>based in czech republic</span>
            <span>|</span>
            <span>local time {timeString}</span>
          </motion.div>
        </div>

        {/* ----------------- PRAVÁ STRANA ----------------- */}
        <div className="flex items-center space-x-10">
          {/* ► odkazy + čárky */}
          <div className="hidden lg:flex items-center space-x-2 text-xl text-gray-700 font-medium tracking-wide">
            {["About", "Services", "Contact"].map((link, i) => (
              <div key={link} className="flex items-center">
                <motion.div
                  variants={itemVariants}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                    {link}
                  </span>
                  <span className="absolute left-0 top-full block group-hover:top-0 transition-all duration-300">
                    {link}
                  </span>
                </motion.div>

                {i !== 2 && (
                  <motion.span
                    variants={itemVariants}
                    className="mx-0 text-gray-500 select-none"
                  >
                    ,
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* ► CZ / EN dual button */}
          <motion.div variants={itemVariants}>
            <div className={styles.dualButton}>
              <motion.div
                className={styles.highlight}
                animate={{ left: lang === "CZ" ? "0%" : "50%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <button
                onClick={toggleLang}
                className={styles.dualButtonBtn}
                style={{
                  color: lang === "CZ" ? "#000" : "#fff",
                  fontWeight: lang === "CZ" ? "600" : "500",
                }}
              >
                CZ
              </button>
              <button
                onClick={toggleLang}
                className={styles.dualButtonBtn}
                style={{
                  color: lang === "EN" ? "#000" : "#fff",
                  fontWeight: lang === "EN" ? "600" : "500",
                }}
              >
                EN
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
