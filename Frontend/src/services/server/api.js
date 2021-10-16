import axios from 'axios';

import authService from '../auth/authService';
import { API_URL } from '../../config';

const instance = axios.create({
  baseURL: API_URL
});

const server = (axiosInstance = instance) => ({
  async get({ url }) {
    return axiosInstance.get({
      url,
      headers: authService.getAuthHeader()
    });
  },

  async post({ url, data }) {
    return axiosInstance.post({
      url,
      data,
      headers: authService.getAuthHeader()
    });
  },

  async put({ url, data }) {
    return axiosInstance.post({
      url,
      data,
      headers: authService.getAuthHeader()
    });
  },

  async delete({ url }) {
    return axiosInstance.post({
      url,
      headers: authService.getAuthHeader()
    });
  }
});

export default server;
