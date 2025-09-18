export default function OrderInfo({ order, totalItems }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Order Info</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Number/Email:</strong> {order.identifier}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Quantity:</strong> {totalItems}</p>
      <p><strong>Total Amount:</strong> {order.total}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
    </section>
  );
}
