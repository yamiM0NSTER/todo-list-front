import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3333';
const BASE_URL = process.env.REACT_APP_BASE_URL || '';
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
