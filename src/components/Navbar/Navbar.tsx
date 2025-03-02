"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

/* Varianta pro celý nav, který nejdřív sjede shora */
const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 2, // Například počkej 2.5s, pak začni animovat navbar
      ease: "easeOut",
      when: "beforeChildren", 
    },
  },
};

/* Kontejner pro vnitřní bloky s "staggerChildren" */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3, // Odstup mezi animací dětí
    },
  },
};

/* Varianta pro jednotlivé prvky – "přiletí" shora (y: -30 => 0) */
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
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className="px-4 md:px-6 py-3 bg-[#f7f1eb] text-black"
    >
      <motion.div className="flex justify-between items-center" variants={containerVariants}>
        {/* Levá část */}
        <motion.div className="flex items-center space-x-6" variants={containerVariants}>
          {/* Logo */}
          <motion.h1 className="text-xl font-bold tracking-tight select-none" variants={itemVariants}>
            mirastep.
          </motion.h1>

          {/* based in czech republic | local time */}
          <motion.div
            className="hidden md:flex items-center space-x-5 text-lg text-gray-500"
            variants={itemVariants}
          >
            <span>based in czech republic</span>
            <span>|</span>
            <span>local time {timeString}</span>
          </motion.div>
        </motion.div>

        {/* Pravá část */}
        <motion.div className="flex items-center space-x-10" variants={containerVariants}>
          {/* Duální tlačítko */}
          <motion.div variants={itemVariants}>
            <div className={styles.dualButton}>
              <button
                onClick={toggleLang}
                className={
                  lang === "CZ"
                    ? `${styles.dualButtonBtn} ${styles.dualButtonBtnActive}`
                    : styles.dualButtonBtn
                }
              >
                CZ
              </button>
              <button
                onClick={toggleLang}
                className={
                  lang === "EN"
                    ? `${styles.dualButtonBtn} ${styles.dualButtonBtnActive}`
                    : styles.dualButtonBtn
                }
              >
                EN
              </button>
            </div>
          </motion.div>

          {/* Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.hamburger}
            variants={itemVariants}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.hamburgerIcon}
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
