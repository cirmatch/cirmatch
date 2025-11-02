import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  loginFromToken,
  verifyEmail,
  resendCode,
  getUserStats,
  forgetPassword,
  resetPassword,
  getUser,
  changeRole,
} from "../../action/authAction";

const initialState = {
  allUser: null,
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
      state.isError = false;
      state.isSuccess = false;
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
          if (state.user) {
    state.user = { ...state.user, isVerified: true }; // ✅ manually mark verified
  }
        state.message = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loggedIn = false;
        state.message = action.payload || "Verification failed";
      })
      
          // FORGET PASSWORD
    .addCase(forgetPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "Sending reset code...";
    })
    .addCase(forgetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload.message || "Reset code sent successfully";
    })
    .addCase(forgetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload || "Failed to send reset code";
    })

    // RESET PASSWORD
    .addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "Resetting password...";
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload.message || "Password reset successful";
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload || "Failed to reset password";
    })

      // RESEND CODE
      .addCase(resendCode.pending, (state) => {
        state.isLoading = true;
        state.message = "Resending code...";
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.clear(); 
        return initialState; 
      })

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
        state.isLoading = false;
        state.user = null;
        state.message = action.payload || "Session expired";
      })
      // get user 
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.allUser = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      //Change Role
      .addCase(changeRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message
      })
      .addCase(changeRole.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
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
