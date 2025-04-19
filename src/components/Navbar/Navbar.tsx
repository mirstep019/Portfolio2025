"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

const navbarVariants = {
  hidden: { y: 0, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 2,
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: -30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"CZ" | "EN">("EN");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      const hh = String(hours).padStart(2, "0");
      const mm = String(minutes).padStart(2, "0");
      setTimeString(`${hh}:${mm} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === "CZ" ? "EN" : "CZ"));
  };

  return (
    /* ── 1. vrstva navu – přes celou šířku ───────────────────────────── */
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className="
        absolute inset-x-0 top-0        /* full‑width, mimo flow */
        h-[75px]
        px-8 md:px-12 lg:px-10
        flex items-center               /* vertikální centrování */
        bg-transparent text-black
        z-50
      "
    >
      {/* ── 2. kontejner: levá | pravá strana ───────────────────────── */}
      <motion.div
        className="flex w-full justify-between items-center"
        variants={containerVariants}
      >
        {/* ▼ LEVÁ STRANA  */}
        <motion.div className="flex items-center space-x-6" variants={containerVariants}>
          <motion.h1 className="text-xl font-bold tracking-tight select-none" variants={itemVariants}>
            mirastep.
          </motion.h1>

          <motion.div className="hidden lg:flex items-center space-x-5 text-xl text-gray-500" variants={itemVariants}>
          <span>based in czech republic</span>
            <span>|</span>
            <span>local time {timeString}</span>
          </motion.div>
        </motion.div>

        {/* ▼ PRAVÁ STRANA  */}
        <motion.div className="flex items-center space-x-10" variants={containerVariants}>
          {/* Linky */}
          <motion.div
            className="hidden lg:flex items-center space-x-2 text-xl text-gray-700 font-medium tracking-wide"
            variants={containerVariants}
              >
            {["About", "Services", "Contact"].map((link, index) => (
              <div key={index} className="flex items-center">
                <motion.div className="relative overflow-hidden group cursor-pointer" variants={itemVariants}>
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                    {link}
                  </span>
                  <span className="absolute left-0 top-full block group-hover:top-0 transition-all duration-300">
                    {link}
                  </span>
                </motion.div>
                {index !== 2 && <span className="mx-0 text-gray-500 select-none">,</span>}
              </div>
            ))}
          </motion.div>

           {/* Duální tlačítko */}
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}