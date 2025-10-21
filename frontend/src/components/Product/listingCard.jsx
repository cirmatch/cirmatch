// components/Product/listingCard.jsx

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "@/utils/motion";

/**
 * ListingCard Component
 * 
 * Displays individual product listing in a card format.
 * Includes image, title, description, price, quantity, and a detail button.
 * Animates on scroll using Framer Motion.
 * 
 * Props:
 * - listing: object containing listing details (title, description, price, quantity, images)
 * - index: number used for staggered animation
 */
const ListingCard = ({ listing, index, fullWidth }) => {
  // Extract quantity and unit from listing.quantity (e.g., "10 Kg" -> number=10, unit=Kg)
  const quan = listing?.quantity || ""; 
  const match = quan.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);

  const number = match ? match[1] : quan;  // Extracted numeric part
  const unit = match ? match[3].toUpperCase() : ""; // Extracted unit, default empty

  return (
    <motion.div
      key={listing._id} // Unique key for Framer Motion
      variants={fadeIn("up", index * 0.1)} // Staggered fade-in animation
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={fullWidth ? "w-full p-2" : "w-full sm:w-[45%] md:w-[30%] lg:w-[22%] p-2"}
    >
      <Link
        href={`/product/${listing._id}`}
        className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Product Image */}
        <div className="relative w-full h-48">
          <Image
            src={listing.images[0]?.path || "/default.jpg"} // Fallback image
            alt={listing.title}
            fill
            className="object-cover rounded-t-lg"
            priority={index === 0} // Prioritize first image for performance
          />
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <h4 className="text-lg font-semibold">{listing.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-1">{listing.description}</p>

          {/* Price */}
          <h5 className="text-md font-medium text-teal-600">
            Price: <span className="text-xl font-bold">৳</span> {listing.price} / {unit || "unit"}
          </h5>

          {/* Quantity */}
          <p className="text-sm text-gray-700">
            Quantity: {number} {unit}
          </p>

          {/* Detail Button */}
          <button className="w-full mt-2 py-2 border border-teal-500 text-teal-600 cursor-pointer hover:bg-teal-500 hover:text-white rounded transition">
            Show Details
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
