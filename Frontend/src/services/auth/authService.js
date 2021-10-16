import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { API_URL, TOKEN_KEY } from '../../config';

const authService = {
  getDecodedToken() {
    const token = this.getToken();
    return token ? jwtDecode(token) : undefined;
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  async login({ username, password }) {
    const response = await axios.post(`${API_URL}signin`, { username, password });
    if (response.data) {
      localStorage.setItem(TOKEN_KEY, response.data);
    }
    return jwtDecode(response.data);
  },
  async register({ username, email, password }) {
    return axios.post(`${API_URL}signup`, {
      username,
      email,
      password
    });
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export default authService;
