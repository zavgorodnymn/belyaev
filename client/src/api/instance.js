import axios from 'axios';
import { API_CONFIG } from './config';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Добавляем токен к запросам если он есть
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обрабатываем ответы
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });

    // Редиректим на логин только если это защищенный эндпоинт и нет авторизации
    if (error.response?.status === 401 && isProtectedEndpoint(error.config.url)) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Список защищенных эндпоинтов, требующих авторизации
const protectedEndpoints = [
  '/schedules/create',
  '/schedules/update',
  '/schedules/delete',
  '/profile',
  '/dashboard',
  '/auth/me'
];

// Проверка является ли эндпоинт защищенным
const isProtectedEndpoint = (url) => {
  return protectedEndpoints.some(endpoint => url.includes(endpoint));
};

export default api; 