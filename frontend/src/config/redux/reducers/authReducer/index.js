import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  loginFromToken,
  verifyEmail,
  resendCode,
  getUserStats,
} from "../../action/authAction";

const initialState = {
  user: null,
  userGrowth: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    emptyMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Logging in...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loggedIn = true;
        state.user = action.payload.user ; 
        state.message = "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loggedIn = false;
        state.message = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Registering...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user || null;
        state.message = "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loggedIn = false;
        state.message = action.payload;
      })

      // EMAIL VERIFICATION
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.message = "Verifying email...";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loggedIn = false;
        state.message = action.payload || "Verification failed";
      })

      // RESEND CODE
      .addCase(resendCode.pending, (state) => {
        state.isLoading = true;
        state.message = "Resending code...";
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, () => initialState)

      // LOGIN FROM TOKEN
      
      .addCase(loginFromToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginFromToken.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.message = "Token session restored";
      })
      .addCase(loginFromToken.rejected, (state, action) => {
        state.loggedIn = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload || "Session expired";
      })
      // get user Stats
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userGrowth = action.payload || null;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.userGrowth = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, emptyMessage } = authSlice.actions;
export default authSlice.reducer;
