import axios from "axios";
import { getAccessToken, storeTokens, clearTokens } from "@/utils/tokenHelper";


// Base URL for all API requests
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
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
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    // Prevent infinite loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !window.location.pathname.startsWith("/auth")
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        storeTokens(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch (err) {
        clearTokens();
        // Let the component handle the redirect based on Redux state
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
