'use client';

import { motion, useTransform } from 'framer-motion';

export default function Section2({ scrollYProgress }: { scrollYProgress: any }) {
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      style={{ scale}}
      className="relative h-[200vh] bg-[#1c1919] text-white
        flex items-center justify-center
        rounded-xl lg:rounded-[30px] 
        overflow-hidden"
    >
      <h1 className="text-6xl font-bold text-center">N*GGA CHAIN LAYER 2</h1>
    </motion.div>
  );
}
