import { createSlice } from "@reduxjs/toolkit";
import { userCart, addCart, removeFromCart,  updateCartQuantities, clearCart } from "../../action/cartAction";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  cart: null, 
  
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    reset: () => initialState,
    clearMessage: (state) => {
      state.message = "";
      state.isError = false;
  },
  },
  extraReducers: (builder) => {
    builder
      // 🛒 Fetch User Cart
      .addCase(userCart.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching cart...";
      })
      .addCase(userCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cart = action.payload.cart; 
        state.message = "Cart fetched successfully.";
      })
      .addCase(userCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ➕ Add to Cart
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
        state.message = "Adding item...";
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cart = action.payload.cart; // match backend format
        state.message = "Item added to cart.";
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ❌ Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.message = "Removing item...";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cart = action.payload.cart;
        state.message = "Item removed from cart.";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 🔄 Update Cart Quantities
      .addCase(updateCartQuantities.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating cart quantities...";
      })
      .addCase(updateCartQuantities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cart = action.payload.cart;
        state.message = "Cart quantities updated.";
      })
      .addCase(updateCartQuantities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🧹 Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.message = "Clearing cart...";
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cart = action.payload.cart;
        state.message = "Cart cleared.";
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset,clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
