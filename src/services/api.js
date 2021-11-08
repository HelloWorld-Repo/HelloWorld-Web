import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://192.168.15.100:3000',
  timeout: 15000,
  timeoutErrorMessage:
    'Isso está demorando mais do que deveria, você pode tentar de novo?',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
