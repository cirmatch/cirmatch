import React from "react";
import Link from "next/link";

export default function CartHeader({ onClearCart }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-md">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Your Cart
      </h2>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
        <Link href="/product" passHref legacyBehavior>
          <a className="bg-teal-500 hover:bg-teal-600 text-white text-sm md:text-base font-semibold px-5 py-2 rounded-xl shadow-sm transition-all duration-200">
            Continue Shopping
          </a>
        </Link>

        <button
          onClick={onClearCart}
          className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-semibold px-5 py-2 rounded-xl shadow-sm transition-all duration-200"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
