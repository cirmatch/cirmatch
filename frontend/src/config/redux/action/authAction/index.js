import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '@/config';
import { storeTokens, clearTokens } from '@/utils/tokenHelper';



// 🔐 Login Thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ identifier, password }, thunkAPI) => {
    try {
      const response = await client.post("/login", { identifier, password }, { withCredentials: true });
      const { accessToken } = response.data;
      if (accessToken) {
        storeTokens(accessToken);
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue("Access token not provided");
      }
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 🧾 Register Thunk
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, identifier, password }, thunkAPI) => {
    try {
      const response = await client.post("/register", {
        name,
        identifier,
        password,
      }, { withCredentials: true });
      const { accessToken } = response.data;
      if (accessToken) {
        storeTokens(accessToken);
        localStorage.setItem("identifier", identifier); // optional, if needed
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue("Access token not provided");
      }
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Email Verification
export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async ({ identifier, code }, thunkAPI) => {
    try {
      const response = await client.post("/verify-email", {  identifier, code }); 
      // Notice backend expects 'email' key? If backend expects 'identifier', update there too!
      return thunkAPI.fulfillWithValue(response.data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Email verification failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 🔁 Resend Code
export const resendCode = createAsyncThunk(
  "user/resendCode",
  async ({ identifier }, thunkAPI) => {
    try {
      const response = await client.post("/resend-code", { identifier }); 
      return thunkAPI.fulfillWithValue(response.data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Failed to resend code";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 🚪 Logout
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      clearTokens(); // just removes accessToken
      return thunkAPI.fulfillWithValue("Logged out successfully");
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// 🔐 Login from token (if used)
export const loginFromToken = createAsyncThunk(
  "user/loginFromToken",
  async (_, thunkAPI) => {
    try {
      const response = await client.get("/auth/validate"); // uses access token
      return { user: response.data.user };
    } catch (error) {
      clearTokens();
      return thunkAPI.rejectWithValue("Invalid or expired token");
    }
  }
);

// get userStats
export const getUserStats = createAsyncThunk(
  "user/getUserStats",
  async (_, thunkAPI) => {
    try {
      const response = await client.get("/getUserStats");
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      clearTokens();
      return thunkAPI.rejectWithValue("Invalid or expired token");
    }
  }
);
