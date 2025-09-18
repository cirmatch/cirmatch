import Order from '../../models/order.js';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

/* ================= ADMIN CONTROLLERS ================= */

// ========== GET ALL ORDERS ==========
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('orderItems.productId')
    .populate('userId', 'name email');
  res.status(200).json(orders);
};

// ========== GET ORDER DETAIL ==========
export const getOrderDetail = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId)
    .populate("orderItems.productId")
    .populate("userId", "name email number");
  res.status(200).json(order);
};

// ========== UPDATE ORDER STATUS ==========
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!ALLOWED_STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid order status value.' });

  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  res.status(200).json({ message: 'Order status updated.', order });
};
