import axios from "axios";
import { getAccessToken, storeTokens, clearTokens } from "@/utils/tokenHelper";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
});

// Add access token to requests
client.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh access token on 401 errors
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(`${BASE_URL}/refresh-token`, {}, { withCredentials: true });
        const { accessToken } = refreshResponse.data;

        storeTokens(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/auth"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
