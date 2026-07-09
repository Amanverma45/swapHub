import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://swaphub-backend-855x.onrender.com/api",
});
let isRedirecting = false;

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