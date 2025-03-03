import api from '../api/instance';
import { API_ENDPOINTS } from '../api/config';

class UserService {
  async getAllUsers() {
    try {
      return await api.get(API_ENDPOINTS.USERS);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserById(id) {
    try {
      return await api.get(`${API_ENDPOINTS.USERS}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createUser(userData) {
    try {
      return await api.post(API_ENDPOINTS.USERS, userData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateUser(id, userData) {
    try {
      return await api.put(`${API_ENDPOINTS.USERS}/${id}`, userData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteUser(id) {
    try {
      return await api.delete(`${API_ENDPOINTS.USERS}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllTeachers() {
    try {
      return await api.get(API_ENDPOINTS.TEACHERS);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllStudents() {
    try {
      return await api.get(API_ENDPOINTS.STUDENTS);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProfile(userData) {
    try {
      return await api.put(API_ENDPOINTS.PROFILE, userData);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error('UserService Error:', error);
    throw error;
  }
}

export const userService = new UserService();