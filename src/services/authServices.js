// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const API_BASE_URL = "https://nixora-image-latest.onrender.com/api/v1"; // or process.env

// export const authService = {
//   async login(email, password) {
//     const res = await axios.post(`${API_BASE_URL}/auth/login`, {
//       email,
//       password,
//     });

//     console.log("Response from login API:", res);
//     console.log("Response data:", res.data);
//     const accessToken = res.data.accessToken;
//     const user = jwtDecode(accessToken);

//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("user", JSON.stringify(user));

//     console.log("Stored token and user in localStorage");
//     console.log("accessToken:", accessToken);
//     console.log("User:", user);

//     return { accessToken, user };
//   },

//   async register(name, email, password) {
//     const res = await axios.post(`${API_BASE_URL}/auth/register`, {
//       name,
//       email,
//       password,
//     });

//     return res.data;
//   },

//   logout() {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//   },

//   getSession() {
//     const accessToken = localStorage.getItem("accessToken");
//     const user = localStorage.getItem("user");

//     if (!accessToken || !user) return null;

//     return {
//       accessToken,
//       user: JSON.parse(user),
//     };
//   },
// };
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

export const authService = {
  async login(email, password) {
    const res = await api.post("v1/auth/login", { email, password });

    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    const user = jwtDecode(accessToken);
   
    console.log("accessToken:", accessToken);
    console.log("User:", user);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    return { accessToken, user };
  },

  async register(name, email, password) {
    const res = await api.post("v1/auth/register", {
      name,
      email,
      password,
    });

    return res.data;
  },

  logout() {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("user");
    // localStorage.removeItem("loanDocuments");
    localStorage.clear();
    // window.location.href = "/login";
  },

  getSession() {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (!accessToken || !user) return null;

    return {
      accessToken,
      user: JSON.parse(user),
    };
  },
};
