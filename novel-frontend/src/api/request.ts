import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5173/api',
  timeout: 180000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    'Content-Type': 'application/json',
  },
});
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default service;
