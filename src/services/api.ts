import axios from 'axios';

const api = axios.create({ baseURL: '' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const initData = window.Telegram?.WebApp?.initData;
  if (initData) {
    config.headers['x-telegram-init-data'] = initData;
  }
  return config;
});

export default api;
