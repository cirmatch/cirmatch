export const storeTokens = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => localStorage.getItem("accessToken");


export const getRefreshToken = () => null;

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
};
