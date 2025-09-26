import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import StatusSteps from "./StatusSteps";
import OrderItems from "./OrderItems";
import DeliveryInfo from "./DeliveryInfo";
import { ORDER_STEPS } from "@/Constants/orderSteps";


export default function OrderCard({ order, index }) {
  const subtotal = order.orderItems.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    const quantity = item.quantity || 0;
    return sum + price * quantity;
  }, 0);
  const total = subtotal;
  const currentStep = ORDER_STEPS.findIndex((step) => step.label === order.status) || 0;

  return (
    <motion.div
      className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <motion.div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-600 flex items-center gap-2">
          <FiPackage className="text-4xl" /> Order #{order._id.slice(-6)}
        </h1>
        <p className="text-gray-600 mt-1">Placed on {new Date(order.createdAt).toDateString()}</p>
      </motion.div>

      <StatusSteps steps={ORDER_STEPS} currentStep={currentStep} />
      <DeliveryInfo order={order} />
      <OrderItems orderItems={order.orderItems} />

      <div className="border-t pt-4 space-y-2 text-gray-800">
        <div className="flex justify-between font-bold text-lg border-t pt-3 text-teal-700">
          <span>Total</span>
          <span>৳{total}</span>
        </div>
      </div>
    </motion.div>
  );
}
