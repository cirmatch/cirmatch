import { createSlice } from "@reduxjs/toolkit";
import { addmessage } from "../../action/contactAction";


const initialState = {
  isLoading: false,
  isError: false,
  message: "",
};

const contactSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    reset: () => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(addmessage.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching cart...";
      })
      .addCase(addmessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Message sent Successfully";
      })
      .addCase(addmessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
