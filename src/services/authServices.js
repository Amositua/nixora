import axios from 'axios';

const API_BASE_URL = "https://nixora-image-latest.onrender.com/api/v1"; // or process.env

export const authService = {
  async login(email, password) {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  },

  async register(name, email, password) {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });

    return res.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) return null;

    return {
      token,
      user: JSON.parse(user),
    };
  },
};
