import axios from "axios";
import { getAccessToken, storeTokens, clearTokens } from "@/utils/tokenHelper";

// Base URL for all API requests
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create an Axios instance with default settings
export const client = axios.create({
  baseURL: BASE_URL,               // All requests will be prefixed with this URL
  withCredentials: true,           // Send cookies (HttpOnly) with requests
  headers: { Accept: "application/json" }, // Default headers
});

// ========================
// REQUEST INTERCEPTOR
// ========================
// Attach the access token to every outgoing request if available
client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token in Authorization header
  }
  return config;
});

// ========================
// RESPONSE INTERCEPTOR
// ========================
// Handles 401 errors by attempting to refresh the access token
client.interceptors.response.use(
  (res) => res, // If response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized & prevent infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      try {
        // Attempt to refresh the access token using the refresh token stored in HttpOnly cookie
        const { data } = await axios.post(
          `${BASE_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Store new access token and retry the original request
        storeTokens(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch (err) {
        // If refresh fails, clear tokens and redirect to login
        clearTokens();
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }

    // For other errors or already retried requests, reject the promise
    return Promise.reject(error);
  }
);
