import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { ordervalidate } from '../middleware/validateRequest.js';
import wrapAsync from '../utils/wrapAsync.js';
import { createOrderSchema, updateOrderSchema } from '../validations/orderValidation.js';
import { createOrder, deleteOrderByUser, getUserOrders, updateOrderByUser } from '../controllers/orderController.js';
import { getAllOrders, getOrderDetail, updateOrderStatus } from '../controllers/Admin/orderAdminController.js';

const router = express.Router();

// ================= USER ROUTES =================

// Create new order (user must be authenticated)
router.post('/newOrder', authenticate,  wrapAsync(createOrder));

// Get all my orders for logged-in user
router.get('/myOrders', authenticate, wrapAsync(getUserOrders));

// Delete an order by user (only their own orders)
router.delete('/order/:orderId/delete', authenticate, wrapAsync(deleteOrderByUser));

// Update order by user (only their own orders)
router.put('/order/update/:orderId', authenticate, ordervalidate(updateOrderSchema), wrapAsync(updateOrderByUser));

// ================= ADMIN ROUTES =================

// Get all orders (admin only)
router.get('/allOrders', authenticate, authorizeAdmin, wrapAsync(getAllOrders));

// Get order detail (admin only)
router.get('/orders/:id', authenticate, authorizeAdmin, wrapAsync(getOrderDetail));

// Update order status (admin only)
router.patch('/orders/:orderId/status', authenticate, authorizeAdmin, wrapAsync(updateOrderStatus));

export default router;
