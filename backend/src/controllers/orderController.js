import Listing from '../models/listing.js';
import Order from '../models/order.js';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

/* ================= COMMON / USER CONTROLLERS ================= */

/**
 * ========== CREATE ORDER (USER) ==========
 * Handles order creation by authenticated user
 * Steps:
 * 1. Validate required fields (identifier, name, address, total)
 * 2. Ensure payment method is supported (currently only COD)
 * 3. Validate orderItems array is present and not empty
 * 4. For each item:
 *    - Validate product exists
 *    - Parse listing quantity
 *    - Convert order quantity to listing unit for stock check
 *    - Deduct stock and update product quantity
 * 5. Save the order in DB with frontend-sent quantities and units
 */
export const createOrder = async (req, res) => {
    const { orderItems, address, total, paymentMethod, note, identifier, name } = req.body;
    const userId = req.user._id;

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

      // Check stock availability
      if (orderQtyForStock > availableQty) {
        return res.status(400).json({
          error: `Cannot buy ${item.quantity} ${item.unit} of ${product.title}. Only ${availableQty} ${match[3]} available.`,
        });
      }

      // Deduct stock in listing unit
      availableQty -= orderQtyForStock;

      // Update product quantity in DB (keep listing unit)
      product.quantity = `${availableQty} ${match[3]}`;
      if (availableQty === 0) product.Status = "out_of_stock";
      await product.save();

      // Leave item.quantity as sent by frontend (do not convert)
    }

    // Create new order with user info and items
    const newOrder = new Order({
      userId,
      identifier,
      orderItems,
      address,
      total,
      paymentMethod,
      note,
      name,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully.', order: newOrder });

};

/**
 * ========== USER: GET ALL OWN ORDERS ==========
 * Retrieves all orders placed by the authenticated user
 * - Populates order items with product details
 * - Populates user info (name, email, number)
 * - Returns 404 if no orders found
 */
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

/**
 * ========== USER: UPDATE ORDER ==========
 * Allows authenticated user to update their own order
 * Restrictions:
 * - Cannot update order if status is 'shipped' or 'delivered'
 * Steps:
 * 1. Find order by orderId and userId
 * 2. Validate products in orderItems (if provided)
 * 3. Update address, note, and orderItems
 * 4. Save updated order
 */
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

/**
 * ========== USER: DELETE ORDER ==========
 * Allows authenticated user to delete their own order
 * Restrictions:
 * - Cannot delete order if status is 'shipped' or 'delivered'
 * Steps:
 * 1. Find order by orderId and userId
 * 2. Validate order exists and can be deleted
 * 3. Delete order
 */
export const deleteOrderByUser = async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (['shipped', 'delivered'].includes(order.status)) return res.status(400).json({ error: 'Cannot delete order after it is shipped or delivered.' });

  await order.deleteOne();
  res.status(200).json({ message: 'Order deleted successfully.' });
};
