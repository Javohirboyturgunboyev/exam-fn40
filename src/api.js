import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
