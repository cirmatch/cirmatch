import Listing from '../models/listing.js';
import Order from '../models/order.js';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

/* ================= COMMON / USER CONTROLLERS ================= */

// ========== CREATE ORDER (USER) ==========
export const createOrder = async (req, res) => {
  try {
    const { orderItems, address, total, paymentMethod, note, identifier, name } = req.body;
    const userId = req.user._id;

    // Basic validations
    if (!identifier || !name || !address || !total) {
      return res.status(400).json({ error: "Identifier, name, address, and total are required." });
    }

    if (paymentMethod !== 'cash_on_delivery') {
      return res.status(400).json({ error: 'Only Cash on Delivery is supported at the moment.' });
    }

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: 'Order must include at least one item.' });
    }

    // Validate products and check stock
    for (const item of orderItems) {
      const product = await Listing.findById(item.productId);
      if (!product) return res.status(404).json({ error: `Product not found: ${item.productId}` });

      // Parse listing quantity (string format: "5 Mt" or "1000 Kg")
      const match = product.quantity.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
      if (!match) {
        return res.status(500).json({ error: `Invalid product quantity format for ${product.title}` });
      }

      let availableQty = parseFloat(match[1]);
      const listingUnit = match[3].toLowerCase(); // "kg" or "mt"

      let orderQtyForStock = item.quantity;
      const orderUnit = item.unit?.toLowerCase() || "mt";

      // Convert order quantity to listing unit for stock comparison if units differ
      if (orderUnit !== listingUnit) {
        if (listingUnit === "kg") orderQtyForStock = orderQtyForStock * 1000; // Mt -> Kg
        if (listingUnit === "mt") orderQtyForStock = orderQtyForStock / 1000; // Kg -> Mt
      }

      // Check stock
      if (orderQtyForStock > availableQty) {
        return res.status(400).json({
          error: `Cannot buy ${item.quantity} ${item.unit} of ${product.title}. Only ${availableQty} ${match[3]} available.`,
        });
      }

      // Deduct stock in listing unit
      availableQty -= orderQtyForStock;

      // Save back in the same format as listing (do not change listing unit)
      product.quantity = `${availableQty} ${match[3]}`;
      if (availableQty === 0) product.Status = "out_of_stock";
      await product.save();

      // Leave item.quantity as sent by frontend, do not convert
    }

    // Create the order
    const newOrder = new Order({
      userId,
      identifier,
      orderItems, // store quantity and unit as sent by frontend
      address,
      total,
      paymentMethod,
      note,
      name,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully.', order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};


// ========== USER: GET ALL OWN ORDERS ==========
export const getUserOrders = async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ userId })
    .populate("orderItems.productId")
    .populate("userId", "name email number");

  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found for this user." });
  }

  res.status(200).json({ orders });
};

// ========== USER: UPDATE ORDER ==========
export const updateOrderByUser = async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;
  const { orderItems, address, note } = req.body;

  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (['shipped', 'delivered'].includes(order.status)) return res.status(400).json({ error: 'Cannot edit order after it is shipped or delivered.' });

  if (orderItems && Array.isArray(orderItems) && orderItems.length > 0) {
    for (const item of orderItems) {
      const product = await Listing.findById(item.productId);
      if (!product) return res.status(404).json({ error: `Product not found: ${item.productId}` });
    }
    order.orderItems = orderItems;
  }

  if (address) order.address = address;
  if (note !== undefined) order.note = note;

  await order.save();
  res.status(200).json({ message: 'Order updated successfully.', order });
};

// ========== USER: DELETE ORDER ==========
export const deleteOrderByUser = async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (['shipped', 'delivered'].includes(order.status)) return res.status(400).json({ error: 'Cannot delete order after it is shipped or delivered.' });

  await order.deleteOne();
  res.status(200).json({ message: 'Order deleted successfully.' });
};
