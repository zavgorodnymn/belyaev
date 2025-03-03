// Базовая конфигурация для API
export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me'
  },
  USERS: '/users',
  TEACHERS: '/teachers',
  STUDENTS: '/students',
  COURSES: '/courses',
  DEPARTMENTS: '/departments',
  SCHEDULES: '/schedules',
  PROFILE: '/profile'
};

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}; 