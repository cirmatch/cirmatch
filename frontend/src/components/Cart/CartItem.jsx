import React from "react";
import { FiTrash2 } from "react-icons/fi";
import NumberBox from "@/components/Quantity";

const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

export default function CartItem({ item, quantity, onQuantityChange, onRemove }) {
  const product = item.productId;

  const match = product?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
  const listingQty = match ? parseFloat(match[1]) : 0;
  const listingUnit = match ? match[3] : "Kg";

  const qtyInListingUnit = convertQuantity(quantity, item.unit, listingUnit);
  const totalPrice = (product?.price || 0) * qtyInListingUnit;
  const maxQtyInUserUnit = convertQuantity(listingQty, listingUnit, item.unit);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-4">
      {/* Left: Image + Info */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-2/3">
        <div className="flex-shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md">
          <img
            src={product?.images[0]?.path}
            alt={product?.title || "Product"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-teal-600 transition-colors">
            {product?.title}
          </h3>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Price: <span className="font-medium text-gray-900">৳{product?.price}</span> / {listingUnit}
          </p>

          <button
            onClick={() => onRemove(item._id)}
            className="w-35 mt-3 flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-medium transition-colors duration-300"
          >
            <FiTrash2 /> Remove
          </button>
        </div>
      </div>

      {/* Right: Quantity + Total */}
      <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-1/3">
        <NumberBox
          quantity={quantity}
          setQuantity={(newQty) => onQuantityChange(item._id, newQty)}
          unit={item.unit}
          setUnit={(newUnit) => onQuantityChange(item._id, quantity, newUnit)}
          unitFromListing={listingUnit}
          maxQuantity={maxQtyInUserUnit}
          disabled={false}
        />
        <p className="text-gray-900 font-bold text-lg sm:text-xl">
          Total: <span className="text-teal-500">৳{totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
