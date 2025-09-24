// store only access token
export const storeTokens = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => localStorage.getItem("accessToken");

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
};
