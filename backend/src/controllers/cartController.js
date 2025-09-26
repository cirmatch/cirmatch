import Cart from '../models/cart.js';
import Listing from '../models/listing.js'; // For product info populate
import mongoose from 'mongoose';

// Helper function to convert quantities between units
const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quantity, productId, unit } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).json({ message: "Invalid productId" });

    if (!quantity || quantity <= 0)
      return res.status(400).json({ message: "Quantity must be greater than zero" });

    if (!unit || !["Kg", "Mt"].includes(unit))
      return res.status(400).json({ message: 'Unit must be either "Kg" or "Mt"' });

    const product = await Listing.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Parse listing quantity (e.g., "10 Mt" or "500 Kg")
    const match = product.quantity.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/);
    if (!match) return res.status(500).json({ message: "Invalid product quantity format" });

    const availableQtyListing = parseFloat(match[1]);
    const listingUnit = match[3]; // 'Kg' or 'Mt'

    // Convert frontend quantity to listing unit for stock check
    const qtyInListingUnit = convertQuantity(quantity, unit, listingUnit);

    if (qtyInListingUnit > availableQtyListing)
      return res.status(400).json({ message: "Cannot add more than available stock" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // New cart, save quantity and unit as frontend selected
      cart = new Cart({
        userId,
        items: [{ productId, quantity, unit }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        let cartItem = cart.items[itemIndex];

        // Convert existing cart quantity to listing unit for stock check
        const existingQtyInListing = convertQuantity(cartItem.quantity, cartItem.unit, listingUnit);
        const newTotalInListing = existingQtyInListing + qtyInListingUnit;

        if (newTotalInListing > availableQtyListing)
          return res.status(400).json({ message: "Cannot add more than available stock" });

        // Update cart quantity in frontend unit
        cartItem.quantity += quantity;
        cartItem.unit = unit;
      } else {
        // Add new item in frontend unit
        cart.items.push({ productId, quantity, unit });
      }
    }

    await cart.save();
    await cart.populate("items.productId");

    // Optional: calculate total price per cart item based on listing price and cart unit
    const cartWithPrice = cart.toObject();
    cartWithPrice.items = cartWithPrice.items.map(item => {
      const listingQty = convertQuantity(item.quantity, item.unit, listingUnit);
      const price = listingQty * product.price; // price in listing unit
      return { ...item, totalPrice: parseFloat(price.toFixed(2)) };
    });

    return res.status(200).json({ message: "Cart updated", cart: cartWithPrice });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


// Remove a product from user's cart
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { unit } = req.query; // pass ?unit=kg or ?unit=mt

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid productId' });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(item => {
    if (unit) {
      return !(item.productId.equals(productId) && item.unit === unit);
    }
    return !item.productId.equals(productId);
  });

  await cart.save();
  await cart.populate('items.productId');

  return res.status(200).json({ message: 'Product removed from cart', cart });
};

// Get current user's cart with populated product info
export const getCart = async (req, res) => {
  const userId = req.user.id;
  
  const cart = await Cart.findOne({ userId }).populate('items.productId');

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  return res.status(200).json({ cart });
};

// Clear all items from user's cart
export const clearCart = async (req, res) => {
  const userId = req.user.id;

  const result = await Cart.findOneAndDelete({ userId });

  if (!result) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  return res.status(200).json({ message: 'Cart deleted successfully' });
};

// cart/update-quantities
export const updateCartQuantities = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  for (const { productId: cartItemId, quantity, unit } of items) {
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      continue; // skip invalid ids
    }

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
