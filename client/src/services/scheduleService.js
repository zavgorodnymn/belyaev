import api from '../api/instance';
import { API_ENDPOINTS } from '../api/config';

class ScheduleService {
  async getAllSchedules() {
    try {
      return await api.get(API_ENDPOINTS.SCHEDULES);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getScheduleById(id) {
    try {
      return await api.get(`${API_ENDPOINTS.SCHEDULES}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTeacherSchedule(teacherId) {
    try {
      return await api.get(`${API_ENDPOINTS.SCHEDULES}/teacher/${teacherId}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseSchedule(courseId) {
    try {
      return await api.get(`${API_ENDPOINTS.SCHEDULES}/course/${courseId}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createSchedule(scheduleData) {
    try {
      return await api.post(API_ENDPOINTS.SCHEDULES, scheduleData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateSchedule(id, scheduleData) {
    try {
      return await api.put(`${API_ENDPOINTS.SCHEDULES}/${id}`, scheduleData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteSchedule(id) {
    try {
      return await api.delete(`${API_ENDPOINTS.SCHEDULES}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error('ScheduleService Error:', error);
    throw error;
  }
}

export const scheduleService = new ScheduleService();