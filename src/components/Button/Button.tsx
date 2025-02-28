"use client"; // pokud jsi v Next.js 13 App Router

import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function Button() {
  // Kliknutím otevřeme Instagram
  const openInstagram = () => {
    window.open("https://instagram.com/mirasstep", "_blank");
  };

  return (
    <div className={styles.button} onClick={openInstagram}>
      <motion.div
        className={styles.slider}
        // Pokud nechceš žádnou vertikální animaci, klidně smaž initial/animate/transition:
        initial={{ top: 0 }}
        animate={{ top: 0 }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Jedna vrstva (el) s textem */}
        <div className={styles.el} >
          <PerspectiveText label="CONTACT ME." />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}
