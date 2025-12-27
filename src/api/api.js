import axios from "axios";

const api = axios.create({
  baseURL: "https://nixora-image-latest.onrender.com/api",
  withCredentials: true, // important for httpOnly cookies
});

export default api;
