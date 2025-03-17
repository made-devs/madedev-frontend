'use client';

import { motion } from 'framer-motion';

export default function AnimatedContent({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
