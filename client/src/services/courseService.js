import api from '../api/instance';
import { API_ENDPOINTS } from '../api/config';

class CourseService {
  async getAllCourses() {
    try {
      return await api.get(API_ENDPOINTS.COURSES);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseById(id) {
    try {
      return await api.get(`${API_ENDPOINTS.COURSES}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createCourse(courseData) {
    try {
      return await api.post(API_ENDPOINTS.COURSES, courseData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateCourse(id, courseData) {
    try {
      return await api.put(`${API_ENDPOINTS.COURSES}/${id}`, courseData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteCourse(id) {
    try {
      return await api.delete(`${API_ENDPOINTS.COURSES}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async enrollStudent(courseId, studentId) {
    try {
      return await api.post(`${API_ENDPOINTS.COURSES}/${courseId}/enroll`, { studentId });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error('CourseService Error:', error);
    throw error;
  }
}

export const courseService = new CourseService();