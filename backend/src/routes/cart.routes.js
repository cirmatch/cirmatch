import express from 'express';
import { addToCart, removeFromCart, getCart, clearCart, updateCartQuantities } from '../controllers/cartController.js';
import wrapAsync from "../utils/wrapAsync.js";
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', authenticate, wrapAsync(addToCart));
router.delete('/remove/:cartId', authenticate, wrapAsync(removeFromCart));
router.get('/usercart', authenticate, wrapAsync(getCart));
router.delete('/clearcart', authenticate, wrapAsync(clearCart));
router.put("/cart/update-quantities", authenticate, wrapAsync(updateCartQuantities));

export default router;
