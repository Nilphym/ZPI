import axios from 'axios';

import authService from './auth';
import { API_URL } from '../config';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    ...authService.getAuthHeader()
  }
});

const server = (axiosInstance = instance) => ({
  async get({ url }) {
    const { data: fetchedData } = await axiosInstance.get(url);
    return fetchedData;
  },

  async post({ url, data }) {
    const { data: fetchedData } = await axiosInstance.post(url, data);
    return fetchedData;
  },

  async put({ url, data }) {
    const { data: fetchedData } = await axiosInstance.put(url, data);
    return fetchedData;
  },

  async delete({ url }) {
    const { data: fetchedData } = await axiosInstance.delete(url);
    return fetchedData;
  }
});

export default server;
