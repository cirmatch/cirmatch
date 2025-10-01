import React from "react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import NumberBox from "@/components/Quantity";

// Converts quantity between units
const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

export default function CartItem({ item, quantity, onQuantityChange, onRemove, animationDelay }) {
  const product = item.productId;

  const match = product?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
  const listingQty = match ? parseFloat(match[1]) : 0;
  const listingUnit = match ? match[3] : "Kg";

  const qtyInListingUnit = convertQuantity(quantity, item.unit, listingUnit);
  const totalPrice = (product?.price || 0) * qtyInListingUnit;
  const maxQtyInUserUnit = convertQuantity(listingQty, listingUnit, item.unit);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: animationDelay }}
      className="border-b py-6 flex flex-row items-start justify-between gap-4"
    >
      {/* Left: Image + Info */}
      <div className="flex items-center gap-4 w-2/3">
        <img
          src={product?.images[0]?.path}
          alt={product?.title || "Product Image"}
          className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{product?.title}</h3>
          <p className="text-sm mt-1 font-medium">
            Price: ৳{product?.price} / {listingUnit}
          </p>
          <button
            onClick={() => onRemove(item._id)}
            className="mt-1 text-teal-600 hover:text-red-600 flex items-center gap-1 font-medium"
          >
            <FiTrash2 className="text-lg" /> Remove
          </button>
        </div>
      </div>

      {/* Right: Quantity + Total */}
      <div className="flex flex-col items-end justify-start w-1/3">
        <NumberBox
          quantity={quantity}
          setQuantity={(newQty) => onQuantityChange(item._id, newQty)}
          unit={item.unit}
          setUnit={(newUnit) => onQuantityChange(item._id, quantity, newUnit)}
          unitFromListing={listingUnit}
          maxQuantity={maxQtyInUserUnit}
          disabled={false}
        />
        <pre className="text-right font-semibold text-xl text-gray-800 mt-2">
          Total: ৳{totalPrice.toFixed(3)}
        </pre>
      </div>
    </motion.div>
  );
}
