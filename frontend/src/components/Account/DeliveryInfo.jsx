import { FiMapPin } from "react-icons/fi";

export default function DeliveryInfo({ order }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-teal-600 mb-2 flex items-center gap-2">
        <FiMapPin /> Delivery Info
      </h2>
      <div className="text-gray-700 space-y-1">
        <p><span className="font-medium">Name:</span> {order.name}</p>
        <p><span className="font-medium">Address:</span> {order.address}</p>
        <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
        <p><span className="font-medium">Payment Status:</span> {order.paymentStatus}</p>
        {order.note && <p><span className="font-medium">Note:</span> {order.note}</p>}
      </div>
    </div>
  );
}
