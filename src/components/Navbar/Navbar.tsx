"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

/* Animace nav (přílet shora) */
const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
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

/* Kontejner s "staggerChildren" */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

/* Přiletí shora */
const itemVariants = {
  hidden: { y: -30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* Definice typu pro theme prop */
type NavbarProps = {
  theme?: "light" | "dark";
};

export default function Navbar({ theme = "light" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Přepínač jazyka
  const [lang, setLang] = useState<"CZ" | "EN">("EN");

  // Lokální čas
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

  // Barvy pro brand/hamburger dle theme
  const brandColor = theme === "dark" ? "#f7f1eb" : "#1c1919";
  const hamburgerColor = theme === "dark" ? "#f7f1eb" : "#1c1919";
  const hamburgerLines = theme === "dark" ? "#1c1919" : "#f7f1eb";

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className="
        px-4 md:px-6 py-3 
        // Původní background (#f7f1eb) nahrazen za 'transparent',
        // abychom při dark sekci neměli světlý pruh.
        bg-transparent
        text-black
      "
    >
      {/* 1) Hlavní řádek (jen pro layout) – brand/hamb tu neviditelné */}
      <motion.div
        className="flex justify-between items-center"
        variants={containerVariants}
      >
        {/* Levá část (brand invis + based in...) */}
        <motion.div
          className="flex items-center space-x-6"
          variants={containerVariants}
        >
          <motion.h1
            className="text-xl font-bold tracking-tight select-none invisible"
            variants={itemVariants}
          >
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

        {/* Pravá část (CZ/EN + hamburger invis) */}
        <motion.div
          className="flex items-center space-x-10"
          variants={containerVariants}
        >
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

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`${styles.hamburger} invisible`}
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

      {/* 2) Vrstva FIXNÍ: brand + hamburger (viditelné) */}
      <motion.div
        className="
          pointer-events-none
          fixed top-0 left-0 w-full 
          px-4 md:px-6 py-3
          flex justify-between items-center
          z-50
        "
        variants={containerVariants}
      >
        <motion.h1
          className="
            text-xl font-bold tracking-tight select-none
            pointer-events-auto
          "
          variants={itemVariants}
          style={{ color: brandColor }}
        >
          mirastep.
        </motion.h1>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            pointer-events-auto
            ${styles.hamburger}
          `}
          variants={itemVariants}
          // Nastavíme barvu kruhu hamburgeru
          style={{ backgroundColor: hamburgerColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.hamburgerIcon}
            viewBox="0 0 24 24"
            // Linky hamburgeru
            style={{ stroke: hamburgerLines }}
          >
            <line x1="3" y1="8" x2="21" y2="8" />
            <line x1="3" y1="16" x2="21" y2="16" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}
