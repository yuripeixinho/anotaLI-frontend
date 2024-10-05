import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:44353/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
