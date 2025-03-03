import api from '../api/instance';
import { API_ENDPOINTS } from '../api/config';

class DepartmentService {
  async getAllDepartments() {
    try {
      return await api.get(API_ENDPOINTS.DEPARTMENTS);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getDepartmentById(id) {
    try {
      return await api.get(`${API_ENDPOINTS.DEPARTMENTS}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createDepartment(departmentData) {
    try {
      return await api.post(API_ENDPOINTS.DEPARTMENTS, departmentData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateDepartment(id, departmentData) {
    try {
      return await api.put(`${API_ENDPOINTS.DEPARTMENTS}/${id}`, departmentData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteDepartment(id) {
    try {
      return await api.delete(`${API_ENDPOINTS.DEPARTMENTS}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error('DepartmentService Error:', error);
    throw error;
  }
}

export const departmentService = new DepartmentService();