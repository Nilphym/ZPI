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
    const { data } = await axios.post(`${API_URL}signin`, { username, password });
    localStorage.setItem(TOKEN_KEY, data);
    return jwtDecode(data);
  },
  async register({ username, email, password }) {
    const { data } = await axios.post(`${API_URL}signup`, { username, email, password });
    return data;
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export default authService;
