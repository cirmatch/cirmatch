import { createSlice } from "@reduxjs/toolkit";
import { addmessage, deleteContact, getContact, replyContact } from "../../action/contactAction";


const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  AllContact: null
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: () => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(addmessage.pending, (state) => {
        state.isLoading = true;
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
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.AllContact = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(replyContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(replyContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Message sent Successfully";
      })
      .addCase(replyContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.AllContact = state.AllContact.filter(contact => contact._id !== action.meta.arg);
        state.message = action.payload.message;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
