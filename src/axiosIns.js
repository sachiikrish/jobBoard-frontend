import axios from "axios";

// Create an axios instance
const axiosIns = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // Ensure credentials (cookies) are sent with the request
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await axiosIns.post("/refreshToken", {}, { withCredentials: true });
    const { accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken); // Store the new token
      return accessToken;
    }
  } catch (error) {
    console.error("Error occurred while refreshing the access token:", error.message);
    return null;
  }
};

// Request interceptor to add access token to headers
let isRefreshing = false;
let failedQueue = [];

axiosIns.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosIns(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await refreshAccessToken();
      isRefreshing = false;

      failedQueue.forEach((prom) => prom.resolve(newToken)); // Retry the failed requests
      failedQueue = []; // Reset the queue

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosIns(originalRequest);
      } else {
        window.location.href = "/login";
        return Promise.reject("Token refresh failed.");
      }
    }

    return Promise.reject(error);
  }
);



// Response interceptor to handle token expiration and retry the request
axiosIns.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (unauthorized), try to refresh the token and retry the request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop of token refresh

      // Attempt to refresh the token
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Set the new token in the header and retry the request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosIns(originalRequest); // Retry the original request
      } else {
        // If token refresh fails, redirect to login
        return Promise.reject("Token refresh failed.");
      }
    }

    // Handle any other errors
    return Promise.reject(error);
  }
);

export default axiosIns;
