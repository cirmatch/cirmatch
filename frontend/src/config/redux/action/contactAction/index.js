import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '@/config';



export const addmessage = createAsyncThunk(
  "contact/addmessage",
  async ({ ContactDetail, organization, message }, thunkAPI) => {
    try {
      const response = await client.post("/contact", { ContactDetail, organization, message });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Sending message failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getContact = createAsyncThunk(
  "contact/getContact",
  async (_, thunkAPI) => {
    try {
      const response = await client.get("/get-contact");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Sending message failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const replyContact = createAsyncThunk(
  "contact/replyContact",
  async ({ message, subject,mail, id }, thunkAPI) => {
    try {
      const response = await client.post("/send-reply", {  message,subject,mail, id  });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Sending message failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
