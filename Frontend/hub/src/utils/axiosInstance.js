import axios from "axios";

const axiosInstance = axios.create({
  // Local backend server par connect kar rahe hain
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

let isRedirecting = false;

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Session expired. Please login again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;