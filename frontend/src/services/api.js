// services/api.js 
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API BASE URL:', BASE_URL); 

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API Request:', config.method?.toUpperCase(), config.url, config.data); // DEBUG
  return config;
});

// Log all responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data); // DEBUG
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url, error.response?.data); // DEBUG
    return Promise.reject(error);
  }
);

// Auth
export const signupAPI = (data) => api.post('/api/auth/signup', data);
export const loginAPI = (data) => api.post('/api/auth/login', data);
export const getMeAPI = () => api.get('/api/auth/me');

// User
export const getProfileAPI = () => api.get('/api/user/profile');
export const updateProfileAPI = (data) => api.put('/api/user/profile', data);

// Admin
export const getAllUsersAPI = () => api.get('/api/admin/users');
export const deleteUserAPI = (id) => api.delete(`/api/admin/users/${id}`);
export const updateUserRoleAPI = (id, role) => api.put(`/api/admin/users/${id}/role`, { role });

export default api;