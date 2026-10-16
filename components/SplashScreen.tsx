'use client';

import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-teal-950 via-teal-900 to-amber-950 text-white"
    >
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 15, -15, 0],
          filter: [
            'drop-shadow(0 0 15px rgba(45,212,191,0.5))',
            'drop-shadow(0 0 35px rgba(245,158,11,0.8))',
            'drop-shadow(0 0 15px rgba(45,212,191,0.5))'
          ]
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-8xl select-none mb-4 cursor-pointer"
        onClick={onComplete}
      >
        💎
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-6xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-white to-amber-200"
      >
        HIDDEN GEMS
      </motion.h1>

      <motion.p
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 0.85 }}
        transition={{ delay: 0.4 }}
        className="text-sm sm:text-base mt-2 tracking-wide font-light text-teal-100"
      >
        Explore Beyond the Ordinary
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-teal-950 font-bold rounded-full shadow-lg shadow-amber-500/20 transition cursor-pointer"
      >
        Start Exploring →
      </motion.button>
    </motion.div>
  );
}