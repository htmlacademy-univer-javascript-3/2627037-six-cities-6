import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { getToken } from './token-storage.ts';

const BACKEND_URL = 'https://14.design.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.headers) {
        config.headers['x-token'] = getToken();
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return api;
}
