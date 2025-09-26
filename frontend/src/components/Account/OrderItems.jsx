export default function OrderItems({ orderItems }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-teal-600 mb-2">Order Items</h2>
      <div className="space-y-3">
        {orderItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-teal-50 p-3 rounded-lg">
            <div>
              <p className="text-gray-800 font-medium">{item.productId?.title || "Unknown Product"}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-500">Price: ৳{item.productId?.price || 0}</p>
            </div>
            <p className="text-teal-700 font-semibold">
              ৳{(item.productId?.price || 0) * item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
