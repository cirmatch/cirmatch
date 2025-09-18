import UserLayout from '@/layout/clienLayout/UserLayout';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant, staggerContainer } from '@/utils/motion'; 

export default function About() {
  return (
    <UserLayout>
      <motion.div
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <motion.h1
          variants={textVariant(0.1)}
          className="text-4xl font-bold text-teal-600 mb-6 text-center"
        >
          About Us
        </motion.h1>

        <motion.p
          variants={fadeIn('up', 0.2)}
          className="text-lg text-gray-700 leading-relaxed"
        >
          <Link
            href="https://cirmatch.com/"
            className="text-teal-600 hover:underline font-medium"
            target="_blank"
          >
            Cirmatch.com
          </Link>{' '}
          is a <strong>B2B circular economy marketplace</strong> that connects buyers and sellers of recycled plastic and the waste management industry. It simplifies their trading by helping find the right sourcing and providing efficient logistics services.
        </motion.p>

        <motion.p
          variants={fadeIn('up', 0.4)}
          className="text-lg text-gray-700 mt-6 leading-relaxed"
        >
          Cirmatch is also committed to building a <strong>data-driven formal infrastructure</strong> for the waste management and recycling industry. Our goal is to enable a circular economy and contribute to a more <span className="text-teal-600 font-semibold">sustainable planet</span>.
        </motion.p>
      </motion.div>
    </UserLayout>
  );
}
