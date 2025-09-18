import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/config";

// 🔁 Reusable error handler
const extractErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message; // Backend custom message
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;   // Alternative error field
  }
  if (error?.response?.status) {
    return `Request failed with status ${error.response.status}`;
  }
  if (error?.message) {
    return error.message; // e.g. "Network Error"
  }
  return "Unknown error occurred";
};
// 🆕 Create a new order
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

// 🙋‍♂️ Get orders for the logged-in user
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


// 🛠️ Admin: Get all orders
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

// 📝 Admin: Update order status
export const updateOrderStatus = createAsyncThunk(
  "Order/updateOrderStatus",
  async ({ orderId, status }, thunkApi) => {
    try {
      const response = await client.patch(`/${orderId}/status`, { status });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// 🗑️ User: Delete order
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

// ✏️ User: Update order
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

// 🙋‍♂️ User: Get all orders of logged-in user
export const getUserOrders = createAsyncThunk(
  "Order/getUserOrders",
  async (_, thunkApi) => {
    try {
      const response = await client.get("/myorders"); // your backend route
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.error || error.message || "Unknown error occurred"
      );
    }
  }
);
