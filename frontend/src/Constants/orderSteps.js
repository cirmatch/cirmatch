import { FiPackage, FiCheckCircle, FiMapPin, FiClock, FiTruck } from "react-icons/fi";

export const ORDER_STEPS = [
  { label: "pending", icon: FiClock },
  { label: "confirmed", icon: FiTruck },
  { label: "shipped", icon: FiPackage },
  { label: "delivered", icon: FiCheckCircle },
  { label: "cancelled", icon: FiClock },
];
