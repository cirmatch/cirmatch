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

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  userOrder: [],
  orders: [],
  order: null, // for getUserOrders or getAllOrders
  currentOrder: null, // for newly created or updated order
};

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    resetOrderState: () => initialState,
    clearOrderMessage: (state) => {
      state.message = "";
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Placing order...";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.order  || action.payload;
        state.message = action.payload.message || "Order placed successfully.";
        state.isError = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 📦 Get Order detail
      .addCase(getOrderDetail.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching your orders...";
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.message = "Orders fetched successfully.";
        state.isError = false;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🛠️ Get All Orders (admin)
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

            // 🛠️ Get user ORder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all orders...";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrder = action.payload.orders;
        state.message = "All orders fetched successfully.";
        state.isError = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✏️ Update Order (user)
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

      // 🛠️ Update Order Status (admin)
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating order status...";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload.message || "Order status updated.";
          state.isError = false;
        
          const updatedOrder = action.payload.order;
          state.currentOrder = updatedOrder; 
        

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

      // ❌ Delete Order (user)
      .addCase(deleteOrderByUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Deleting order...";
      })
      .addCase(deleteOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message || "Order deleted.";
        state.isError = false;

        // Optionally remove from `orders` array
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(deleteOrderByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrderState, clearOrderMessage } = orderSlice.actions;
export default orderSlice.reducer;
