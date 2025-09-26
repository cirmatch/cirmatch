import React from "react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import NumberBox from "@/components/Quantity";

const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

export default function CartItem({ item, quantity, onQuantityChange, onRemove, animationDelay }) {
  const product = item.productId;

  // Parse listing quantity and unit
  const match = product?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
  const listingQty = match ? parseFloat(match[1]) : 0;
  const listingUnit = match ? match[3] : "Kg";

  // Convert quantity to listing unit for total price calculation
  const qtyInListingUnit = convertQuantity(quantity, item.unit, listingUnit);
  const totalPrice = (product?.price || 0) * qtyInListingUnit;

  // Max allowed quantity in user unit
  const maxQtyInUserUnit = convertQuantity(listingQty, listingUnit, item.unit);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: animationDelay }}
      className="border-b py-6 flex flex-nowrap overflow-x-auto items-center gap-4 md:grid md:grid-cols-12"
    >
      {/* Product Info */}
      <div className="flex items-center gap-4 min-w-[220px] md:col-span-6">
        <img
          src={product?.images[0]?.path}
          alt={product?.title || "Product Image"}
          className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
        />
        <div className="text-gray-800">
          <h3 className="text-lg font-semibold">{product?.title}</h3>
          <p className="text-sm mt-2 font-medium">Price: ৳{product?.price} / {listingUnit}</p>
          <button
            onClick={() => onRemove(item._id)}
            className="mt-1 text-teal-600 hover:text-red-600 flex items-center gap-1 font-medium"
          >
            <FiTrash2 className="text-lg" /> Remove
          </button>
        </div>
      </div>

      {/* Quantity */}
      <div className="min-w-[100px] text-center md:col-span-2">
        <NumberBox
          quantity={quantity}
          setQuantity={(newQty) => onQuantityChange(item._id, newQty)}
          unit={item.unit}
          setUnit={(newUnit) => onQuantityChange(item._id, quantity, newUnit)}
          unitFromListing={listingUnit}
          maxQuantity={maxQtyInUserUnit}
        />
        <span className="text-xs text-gray-400 md:hidden block mt-1">Quantity</span>
      </div>

      {/* Total */}
      <div className="min-w-[80px] text-right font-semibold text-gray-800 md:col-span-2">
        ৳{totalPrice.toFixed(2)}
        <span className="block md:hidden text-xs text-gray-400 mt-1">Total</span>
      </div>
    </motion.div>
  );
}
