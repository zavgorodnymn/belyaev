import api from '../api/instance';
import { API_ENDPOINTS } from '../api/config';

class AuthService {
  async login(credentials) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('accessToken');
    } catch (error) {
      this.handleError(error);
    }
  }

  async refreshToken() {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCurrentUser() {
    try {
      return await api.get(API_ENDPOINTS.AUTH.ME);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error('AuthService Error:', error);
    throw error;
  }
}

export const authService = new AuthService(); 