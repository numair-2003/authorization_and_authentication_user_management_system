import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchUsers = () => api.get('/users');

export const createUser = (userData) => api.post('/users', userData);

export const deleteUser = (id) => api.delete(`/users/${id}`);