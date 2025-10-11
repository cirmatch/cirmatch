import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCart, removeFromCart, clearCart } from "@/config/redux/action/cartAction";
import { motion, AnimatePresence } from "framer-motion";

import UserLayout from "@/layout/clienLayout/UserLayout";
import Loading from "@/components/Loading";

import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

// Helper function to convert quantities between units
const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

export default function CartProduct() {
  const dispatch = useDispatch();
  const { cart, isLoading, isError } = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(userCart());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.items?.length) {
      const initialQuantities = cart.items.reduce((acc, item) => {
        acc[item._id] = item.quantity && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 0;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleRemove = (cartId) => dispatch(removeFromCart({ cartId }));
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
    }
  };

  const handleQuantityChange = (itemId, newQty, newUnit) => {
    setQuantities((prev) => ({ ...prev, [itemId]: newQty }));
    if (newUnit) {
      // Update unit if changed
      const item = cart.items.find(i => i._id === itemId);
      if (item) item.unit = newUnit;
    }
  };

  const calculateSubtotal = () => {
    return cart?.items?.reduce((sum, item) => {
      const product = item.productId;
      const qty = quantities[item._id] || 0;
      const sanitizedQty = qty && !isNaN(Number(qty)) ? Number(qty) : 0;

      // Parse listing quantity unit
      const match = product?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
      const listingUnit = match ? match[3] : "Kg";

      // Convert user quantity to listing unit for price calculation
      const qtyInListingUnit = convertQuantity(sanitizedQty, item.unit, listingUnit);

      return sum + (product?.price || 0) * qtyInListingUnit;
    }, 0) || 0;
  };

  if (isLoading) return <UserLayout><Loading /></UserLayout>;

  if (isError || !cart || cart.items?.length === 0) {
    return (
      <UserLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.p
            className="text-center text-lg font-medium text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            No items in your cart.
          </motion.p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <motion.div
        className="max-w-6xl mx-auto px-4 py-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CartHeader onClearCart={handleClearCart} />
        <hr />

        <AnimatePresence>
          {cart.items.map((item, index) => (
            <CartItem
              key={item._id}
              item={item}
              quantity={quantities[item._id] || 0}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              animationDelay={index * 0.05}
            />
          ))}
        </AnimatePresence>

        <CartSummary subtotal={calculateSubtotal()} shippingCost={0} quantities={quantities}/>
      </motion.div>
    </UserLayout>
  );
}
