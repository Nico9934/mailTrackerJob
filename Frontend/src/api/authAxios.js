import axios from 'axios';

const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = token;
    console.log('[Axios] Token incluido en el header:', token);
  }
  return config;
});

export default authAxios;