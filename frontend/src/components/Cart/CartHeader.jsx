import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartHeader({ onClearCart }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Your Cart
      </h2>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
        <Link href="/product" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm md:text-base font-semibold px-5 py-2 rounded-xl shadow-sm transition-all duration-200"
          >
            Continue Shopping
          </motion.a>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearCart}
          className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-semibold px-5 py-2 rounded-xl shadow-sm transition-all duration-200"
        >
          Clear Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
