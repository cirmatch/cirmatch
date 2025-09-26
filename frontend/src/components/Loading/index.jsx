import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-100">
      <motion.span
        role="img"
        aria-label="loading"
        className="text-6xl text-teal-500"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
        }}
      >
        ♻️
      </motion.span>
    </div>
  );
};

export default Loading;
