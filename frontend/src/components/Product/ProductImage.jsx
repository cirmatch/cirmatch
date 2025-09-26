// components/Product/ProductImages.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * ProductImages Component
 * 
 * Displays a product's images with a main image and clickable thumbnails.
 * Supports up to 5 images. Clicking a thumbnail updates the main image.
 * Includes smooth fade-in animation for main image transitions.
 * 
 * Props:
 * - images: Array of image objects ({ path: string })
 * - title: String for alt text purposes
 */
export function ProductImages({ images = [], title }) {
  const imgs = images.slice(0, 5); // Limit to maximum 5 images
  const [mainIndex, setMainIndex] = useState(0); // Current main image index

  // Handle case when no images are available
  if (imgs.length === 0) {
    return <div className="text-center text-gray-500">No images available</div>;
  }

  return (
    <motion.div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
      {/* Thumbnails */}
      <div
        className="
          flex md:flex-col flex-row 
          md:w-auto w-full 
          gap-4 
          overflow-x-auto md:overflow-visible
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          flex-shrink-0
        "
      >
        {imgs.map((img, idx) => (
          <div
            key={img.path}
            onClick={() => setMainIndex(idx)} // Update main image on click
            className={`relative cursor-pointer rounded-md border-2 transition-all
              ${idx === mainIndex
                ? "border-teal-600 scale-110 shadow-lg" // Highlight selected thumbnail
                : "border-transparent hover:opacity-75"}
              w-20 h-24 md:w-20 md:h-20 flex-shrink-0`}
          >
            <Image
              src={img.path}
              alt={`${title} thumbnail ${idx + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Main Big Image */}
      <div className="relative flex-grow w-full h-[400px] md:h-[600px] min-w-0">
        <motion.div
          key={imgs[mainIndex].path} // Animate when main image changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Image
            src={imgs[mainIndex].path}
            alt={`${title} image ${mainIndex + 1}`}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
