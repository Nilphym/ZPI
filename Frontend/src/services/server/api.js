import axios from 'axios';

import authService from '../auth/authService';
import { API_URL } from '../../config';

const instance = axios.create({
  baseURL: API_URL
});

const getHeaders = (isAuth) => (isAuth ? authService.getAuthHeader() : {});

const server = (axiosInstance = instance) => ({
  async get(url, isAuth) {
    return axiosInstance.get({
      url,
      headers: getHeaders(isAuth)
    });
  },

  async post(url, data, isAuth) {
    return axiosInstance.post({
      url,
      data,
      headers: getHeaders(isAuth)
    });
  },

  async put(url, data, isAuth) {
    return axiosInstance.post({
      url,
      data,
      headers: getHeaders(isAuth)
    });
  },

  async delete(url, isAuth) {
    return axiosInstance.post({
      url,
      headers: getHeaders(isAuth)
    });
  }
});

export default server;
