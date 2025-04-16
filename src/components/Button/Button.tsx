"use client";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function Button() {
  const openInstagram = () => {
    window.open("https://instagram.com/mirasstep", "_blank");
  };

  return (
    <motion.div
      className={styles.button}
      onClick={openInstagram}
      // Stavy animace: "rest" = výchozí, "hover" = při najetí myší
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Overlay vrstva: v klidu pod tlačítkem, užší (60%) a posunutá dolů (top: 110%). */}
      <motion.div
        className={styles.overlay}
        variants={{
          rest: { top: "110%", width: "60%" },
          hover: { top: "0%", width: "100%" },
        }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Vrstva s textem */}
      <motion.div className={styles.slider}>
        <div className={styles.el}>
          <PerspectiveText label="CONTACT ME." />
        </div>
      </motion.div>
    </motion.div>
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
