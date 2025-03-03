import api from '../instance';
import { API_ENDPOINTS } from '../config';

export const userApi = {
  getAll: () => api.get(API_ENDPOINTS.USERS),
  
  getById: (id) => api.get(API_ENDPOINTS.USER_BY_ID(id)),
  
  create: (userData) => api.post(API_ENDPOINTS.USERS, userData),
  
  update: (id, userData) => api.put(API_ENDPOINTS.USER_BY_ID(id), userData),
  
  delete: (id) => api.delete(API_ENDPOINTS.USER_BY_ID(id))
}; 