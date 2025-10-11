import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/config";

// 🔁 Reusable error handler
const extractErrorMessage = (error) =>
  error?.response?.data?.message || error.message || "Unknown error occurred";

// 🛒 Fetch user cart
export const userCart = createAsyncThunk("Cart/userCart", async (_, thunkApi) => {
  try {
    const response = await client.get("/usercart");

    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkApi.rejectWithValue(extractErrorMessage(error));
  }
});

// ➕ Add item to cart
export const addCart = createAsyncThunk(
  "Cart/addCart",
  async ({ quantity, productId,unit }, thunkApi) => {
    try {
      const response = await client.post("/add", { quantity, productId, unit});

      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ❌ Remove item from cart
export const removeFromCart = createAsyncThunk(
  "Cart/removeFromCart",
  async ({ cartId }, thunkApi) => {
    try {
      const response = await client.delete(`/remove/${ cartId }`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// 🧹 Clear entire cart
export const clearCart = createAsyncThunk("Cart/clearCart", async (_, thunkApi) => {
  try {
    const response = await client.delete("/clearcart");
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkApi.rejectWithValue(extractErrorMessage(error));
  }
});

// 📝 Update quantities in cart
export const updateCartQuantities = createAsyncThunk(
  "Cart/updateCartQuantities",
  async ({ items }, thunkApi) => {
    try {
      const response = await client.put("/cart/update-quantities", { items });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to update cart quantities"
      );
    }
  }
);