import Cart from '../models/cart.js';
import Listing from '../models/listing.js'; // For product info populate
import mongoose from 'mongoose';

/**
 * Helper function to convert quantities between units (Kg <-> Mt)
 * Ensures stock calculations are consistent regardless of unit differences
 */
const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty; // fallback: no conversion
};

/**
 * Add a product to user's cart
 * - Validates productId, quantity, and unit
 * - Checks stock availability based on Listing quantity
 * - Updates cart if product exists, otherwise creates a new cart
 * - Returns updated cart with populated product info and total price
 */
export const addToCart = async (req, res) => {
  const userId = req.user.id; // Authenticated user
  const { quantity, productId, unit } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(400).json({ message: "Invalid productId" });

  if (!quantity || quantity <= 0)
    return res.status(400).json({ message: "Quantity must be greater than zero" });

  if (!unit || !["Kg", "Mt"].includes(unit))
    return res.status(400).json({ message: 'Unit must be either "Kg" or "Mt"' });

  const product = await Listing.findByIdAndUpdate(
  productId,
  { $inc: { wishlistCount: 1 } }, // increment wishlistCount by 1
  { new: true }                   // return updated document
);
  if (!product) return res.status(404).json({ message: "Product not found" });
console.log(product)
  const match = product.quantity.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/);
  if (!match) return res.status(500).json({ message: "Invalid product quantity format" });

  const availableQtyListing = parseFloat(match[1]);
  const listingUnit = match[3]; // 'Kg' or 'Mt'

  const qtyInListingUnit = convertQuantity(quantity, unit, listingUnit);

  if (qtyInListingUnit > availableQtyListing)
    return res.status(400).json({ message: "Cannot add more than available stock" });

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity, unit }],
    });
  } else {
const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

if (itemIndex > -1) {
  let cartItem = cart.items[itemIndex];

  // 1 Convert existing cart quantity to listing unit for stock check
  const existingQtyInListing = convertQuantity(cartItem.quantity, cartItem.unit, listingUnit);

  // 2 Convert new quantity to listing unit
  const newQtyInListing = convertQuantity(quantity, unit, listingUnit);

  // 3 Check if total exceeds available stock
  if (existingQtyInListing + newQtyInListing > availableQtyListing)
    return res.status(400).json({ message: "Cannot add more than available stock" });

  // 4 Convert new quantity to **cart item's unit** and add it
  const newQtyInCartUnit = convertQuantity(quantity, unit, cartItem.unit);
  cartItem.quantity += newQtyInCartUnit;
} else {
  // product not in cart, just add
  cart.items.push({ productId, quantity, unit });
}
  }

  await cart.save();
  await cart.populate("items.productId");

  const cartWithPrice = cart.toObject();
  cartWithPrice.items = cartWithPrice.items.map(item => {
    const listingQty = convertQuantity(item.quantity, item.unit, listingUnit);
    const price = listingQty * product.price;
    return { ...item, totalPrice: parseFloat(price.toFixed(2)) };
  });

  return res.status(200).json({ message: "Cart updated", cart: cartWithPrice });
};

/**
 * Remove a product (or specific unit) from user's cart
 * - If unit query is provided, only that unit is removed
 * - Otherwise, removes all entries of the product
 */
export const removeFromCart = async (req, res) => {
    const userId = req.user._id;           
    const cartItemId = req.params.cartId; 

    // Validate cart item _id
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({ message: 'Invalid cart item ID' });
    }

    const cartItemObjectId = new mongoose.Types.ObjectId(cartItemId);

    // 1️⃣ Fetch cart BEFORE removal
    const cartBefore = await Cart.findOne({ userId });
    if (!cartBefore) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // 2️⃣ Remove item using $pull on _id
    const result = await Cart.updateOne(
      { userId },
      { $pull: { items: { _id: cartItemObjectId } } }
    );


    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Cart item not found in cart' });
    }

    // 3️⃣ Fetch cart AFTER removal and populate product details
    const cartAfter = await Cart.findOne({ userId }).populate('items.productId');
    console.log('Cart after removal:', cartAfter.items);

    // 4️⃣ Return updated cart
    return res.status(200).json({
      message: 'Cart item removed successfully',
      cart: cartAfter
    });
};

/**
 * Get current user's cart with populated product information
 */
export const getCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId }).populate('items.productId');

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  return res.status(200).json({ cart });
};

/**
 * Clear all items from user's cart
 */
export const clearCart = async (req, res) => {
  const userId = req.user.id;

  const result = await Cart.findOneAndDelete({ userId });

  if (!result) return res.status(404).json({ message: 'Cart not found' });

  return res.status(200).json({ message: 'Cart deleted successfully' });
};

/**
 * Update quantities and units for items in user's cart
 * - Accepts an array of items with productId, quantity, and unit
 * - Updates only valid items
 */
export const updateCartQuantities = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  for (const { productId: cartItemId, quantity, unit } of items) {
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) continue;

    const item = cart.items.id(cartItemId);

    if (item) {
      if (quantity && quantity > 0) item.quantity = quantity;
      if (unit && ['kg', 'mt'].includes(unit)) item.unit = unit;
    }
  }

  await cart.save();
  await cart.populate("items.productId");

  return res.status(200).json({ message: "Cart quantities updated", cart });
};
