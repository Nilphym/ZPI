import axios from 'axios';

import authService from '../auth/authService';
import { API_URL } from '../../config';

const instance = axios.create({
  baseURL: API_URL
});

const getHeaders = (isAuth) => (isAuth ? authService.getAuthHeader() : {});

const server = {
  async get(url, isAuth) {
    return instance.get({
      url,
      headers: getHeaders(isAuth)
    });
  },

  async post(url, data, isAuth) {
    return instance.post({
      url,
      data,
      headers: getHeaders(isAuth)
    });
  },

  async put(url, data, isAuth) {
    return instance.post({
      url,
      data,
      headers: getHeaders(isAuth)
    });
  },

  async delete(url, isAuth) {
    return instance.post({
      url,
      headers: getHeaders(isAuth)
    });
  }
};

export default server;
