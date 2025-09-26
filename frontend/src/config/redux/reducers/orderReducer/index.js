import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrderByUser,
  updateOrderByUser,
  getOrderDetail,
} from "../../action/orderAction";

/**
 * Initial state for order slice
 * Tracks loading, error, messages, and order data.
 */
const initialState = {
  isLoading: false,       // Tracks API request status
  isError: false,         // Tracks if an error occurred
  message: "",            // Stores success/error messages
  userOrder: [],          // Orders for the logged-in user
  orders: [],             // All orders (admin view)
  order: null,            // Single order details
  currentOrder: null,     // Recently created/updated order
};

/**
 * Redux slice for order-related operations
 * Handles async actions and state updates for both user and admin operations.
 */
const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    /**
     * Resets the order state to initial values
     */
    resetOrderState: () => initialState,

    /**
     * Clears message and error flags without affecting order data
     */
    clearOrderMessage: (state) => {
      state.message = "";
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======================
      // ✅ Create Order
      // ======================
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Placing order...";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.order || action.payload;
        state.message = action.payload.message || "Order placed successfully.";
        state.isError = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ======================
      // 📦 Get Order Detail (User)
      // ======================
      .addCase(getOrderDetail.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching your order details...";
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.message = "Order details fetched successfully.";
        state.isError = false;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ======================
      // 🛠️ Get All Orders (Admin)
      // ======================
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all orders...";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.message = "All orders fetched successfully.";
        state.isError = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ======================
      // 🙋‍♂️ Get Orders for Logged-in User
      // ======================
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching your orders...";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrder = action.payload.orders;
        state.message = "Your orders fetched successfully.";
        state.isError = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ======================
      // ✏️ Update Order (User)
      // ======================
      .addCase(updateOrderByUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating your order...";
      })
      .addCase(updateOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.order;
        state.message = action.payload.message || "Order updated successfully.";
        state.isError = false;
      })
      .addCase(updateOrderByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ======================
      // 🛠️ Update Order Status (Admin)
      // ======================
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating order status...";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message || "Order status updated successfully.";
        state.isError = false;

        const updatedOrder = action.payload.order;
        state.currentOrder = updatedOrder;

        // Update the order in the admin list if it exists
        const index = state.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ======================
      // ❌ Delete Order (User)
      // ======================
      .addCase(deleteOrderByUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Deleting order...";
      })
      .addCase(deleteOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message || "Order deleted successfully.";
        state.isError = false;

        // Remove deleted order from orders array
        state.orders = state.orders.filter(order => order._id !== action.meta.arg);
      })
      .addCase(deleteOrderByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export slice actions and reducer
export const { resetOrderState, clearOrderMessage } = orderSlice.actions;
export default orderSlice.reducer;
