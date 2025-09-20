// components/Product/ProductInfo.jsx

import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import NumberBox from "../Quantity";

/**
 * ProductInfo Component
 * 
 * Displays detailed information about a single product listing.
 * Includes title, price, availability, description, specifications, quantity selection, and action buttons.
 * Uses Framer Motion for smooth animations.
 * 
 * Props:
 * - listing: object containing all product details
 * - quantity: current quantity selected
 * - setQuantity: setter function to update quantity
 * - unit: current unit selected
 * - setUnit: setter function to update unit
 * - onBuyNow: callback function when "Buy Now" is clicked
 * - onAddToCart: callback function when "Add to Cart" is clicked
 */
export function ProductInfo({
  listing,
  quantity,
  setQuantity,
  unit,
  setUnit,
  onBuyNow,
  onAddToCart,
}) {
  // Extract numeric quantity and unit from listing.quantity (e.g., "10 Kg")
  const quan = listing?.quantity;
  const match = quan?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
  let unitFromListing = "";
  let number = "";

  if (match) {
    unitFromListing = match[3];
    number = match[1];
  }

  return (
    <motion.div
      variants={fadeIn("left", 0.7)}
      className="md:w-1/2 flex flex-col justify-between text-gray-700"
    >
      {/* Product Title */}
      <motion.h2
        variants={textVariant(0.8)}
        className="text-4xl font-extrabold mb-4 tracking-wide"
      >
        {listing?.title
          ? listing.title.charAt(0).toUpperCase() + listing.title.slice(1)
          : ""}
      </motion.h2>

      {/* Price */}
      <div className="text-3xl font-semibold text-teal-600 mb-3">
        &#2547;{listing.price}{" "}
        <span className="text-base font-normal">/ {unitFromListing}</span>
      </div>

      {/* Availability */}
      <p className="text-lg mb-5">
        Availability:{" "}
        {listing.Status === "confirmed" ? (
          <span className="text-green-600 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-600 font-semibold">{listing.Status}</span>
        )}
      </p>

      {/* Product Description */}
      <p className="text-lg leading-relaxed mb-6">{listing.description}</p>

      <hr className="my-6 border-gray-300" />

      {/* Product Specifications */}
      <div className="space-y-2 text-lg mb-6">
        <p>
          <span className="font-semibold">Plastic Type:</span> {listing.plastictype}
        </p>
        <p>
          <span className="font-semibold">Material Type:</span> {listing.metarialtype}
        </p>
        <p>
          <span className="font-semibold">Quantity:</span> {listing.quantity}
        </p>
        {listing.sourcingCondition && (
          <p>
            <span className="font-semibold">Sourcing Condition:</span> {listing.sourcingCondition}
          </p>
        )}
        {listing.washingProcess && (
          <p>
            <span className="font-semibold">Washing Process:</span> {listing.washingProcess}
          </p>
        )}
        <p>
          <span className="font-semibold">Location:</span> {listing.location}
        </p>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4 mb-8">
        <span className="text-lg font-semibold">Quantity:</span>
        <NumberBox
          quantity={quantity}
          setQuantity={setQuantity}
          unit={unit}
          unitFromListing={unitFromListing}
          setUnit={setUnit}
          maxQuantity={parseFloat(number)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-5">
        <button
          onClick={onBuyNow}
          className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg font-semibold tracking-wide hover:bg-teal-700 transition duration-300 cursor-pointer"
        >
          Buy Now
        </button>

        <button
          onClick={onAddToCart}
          className="flex items-center gap-3 border border-teal-600 text-teal-600 px-8 py-4 rounded-md text-lg cursor-pointer font-semibold tracking-wide hover:bg-teal-600 hover:text-white transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
