import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateCartQuantities } from "@/config/redux/action/cartAction"; // Your async thunk

export default function CartSummary({
  quantities,
  subtotal,
  shippingCost,
  showCheckoutBtn = true,
}) {
  const total = subtotal + shippingCost;
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    const updatedItems = Object.entries(quantities).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    // Dispatch to update quantities in backend
    await dispatch(updateCartQuantities({ items: updatedItems })).unwrap();

    // Save subtotal, shippingCost, and total to localStorage
    const checkoutSummary = {
      subtotal,
      shippingCost,
      total,
    };
    localStorage.setItem("checkoutSummary", JSON.stringify(checkoutSummary));

    // Navigate to checkout page
    if (pathname !== "/checkout") {
      router.push("/checkout");
    }
  };

  // Helper to format numbers up to 4 decimals
  const formatAmount = (amount) => Number(amount.toFixed(4));

  return (
    <div className="mt-10 max-w-md ml-auto">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4 text-gray-800">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Subtotal</span>
          <span>৳{formatAmount(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Shipping</span>
          <span>৳{formatAmount(shippingCost)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4 font-semibold text-lg">
          <span>Total</span>
          <span>৳{formatAmount(total)}</span>
        </div>

        {/* Checkout Button */}
        {showCheckoutBtn && pathname !== "/checkout" && (
          <button
            onClick={handleCheckout}
            className="w-full mt-4 border border-dashed border-teal-500 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}
