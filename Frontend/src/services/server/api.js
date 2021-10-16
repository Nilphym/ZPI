import axios from 'axios';

import authService from '../auth/authService';
import { API_URL } from '../../config';

const instance = axios.create({
  baseURL: API_URL
});

const server = (axiosInstance = instance) => ({
  async get({ url }) {
    const { data: fetchedData } = await axiosInstance.get(url, {
      headers: authService.getAuthHeader()
    });
    return fetchedData;
  },

  async post({ url, data }) {
    const { data: fetchedData } = await axiosInstance.post(url, data, {
      headers: authService.getAuthHeader()
    });
    return fetchedData;
  },

  async put({ url, data }) {
    const { data: fetchedData } = await axiosInstance.post(url, data, {
      headers: authService.getAuthHeader()
    });
    return fetchedData;
  },

  async delete({ url }) {
    const { data: fetchedData } = await axiosInstance.post(url, {
      headers: authService.getAuthHeader()
    });
    return fetchedData;
  }
});

export default server;
