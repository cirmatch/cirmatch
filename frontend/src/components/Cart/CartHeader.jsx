import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartHeader({ onClearCart }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
      <div className="flex flex-wrap gap-3">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/product"
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
          >
            Continue Shopping
          </Link>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onClearCart}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
        >
          Clear Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
