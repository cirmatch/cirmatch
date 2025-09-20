import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/config";

/**
 * 🔁 Reusable error handler
 * Extracts a meaningful error message from Axios error objects.
 * Supports backend custom messages, HTTP status codes, and network errors.
 */
const extractErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message; // Custom backend message
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;   // Alternative backend error field
  }
  if (error?.response?.status) {
    return `Request failed with status ${error.response.status}`; // HTTP status fallback
  }
  if (error?.message) {
    return error.message; // Generic error, e.g., network issues
  }
  return "Unknown error occurred"; // Fallback message
};

/**
 * 🆕 Create a new order
 * @param {object} orderData - Payload containing order details
 * Dispatches async request to backend to create an order.
 */
export const createOrder = createAsyncThunk(
  "Order/createOrder",
  async (orderData, thunkApi) => {
    try {
      const response = await client.post("/newOrder", orderData);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * 🙋‍♂️ Get details of a specific order
 * @param {string} orderId - ID of the order
 * Fetches order details for a logged-in user.
 */
export const getOrderDetail = createAsyncThunk(
  "Order/getOrderDetail",
  async (orderId, thunkApi) => {
    try {
      const response = await client.get(`/orders/${orderId}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * 🛠️ Admin: Get all orders
 * Fetches a list of all orders from the backend (Admin only).
 */
export const getAllOrders = createAsyncThunk(
  "Order/getAllOrders",
  async (_, thunkApi) => {
    try {
      const response = await client.get("/allOrders");
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * 📝 Admin: Update order status
 * @param {object} payload - Contains orderId and status
 * Updates the status of a specific order (Admin only).
 */
export const updateOrderStatus = createAsyncThunk(
  "Order/updateOrderStatus",
  async ({ orderId, status }, thunkApi) => {
    try {
      const response = await client.patch(`/orders/${orderId}/status`, { status });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * 🗑️ User: Delete an order
 * @param {string} orderId - ID of the order
 * Allows a user to delete their own order.
 */
export const deleteOrderByUser = createAsyncThunk(
  "Order/deleteOrderByUser",
  async (orderId, thunkApi) => {
    try {
      const response = await client.delete(`/order/delete/${orderId}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * ✏️ User: Update an order
 * @param {object} payload - Contains orderId and updated orderData
 * Allows a user to update their own order details.
 */
export const updateOrderByUser = createAsyncThunk(
  "Order/updateOrderByUser",
  async ({ orderId, orderData }, thunkApi) => {
    try {
      const response = await client.put(`/order/update/${orderId}`, orderData);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * 🙋‍♂️ User: Get all orders for logged-in user
 * Fetches all orders associated with the currently authenticated user.
 */
export const getUserOrders = createAsyncThunk(
  "Order/getUserOrders",
  async (_, thunkApi) => {
    try {
      const response = await client.get("/myorders"); // Backend route for user's orders
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.error || error.message || "Unknown error occurred"
      );
    }
  }
);
