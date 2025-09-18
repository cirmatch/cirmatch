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
