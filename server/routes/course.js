const express = require('express');
const publicRouter = express.Router();
const protectedRouter = express.Router();
const courseController = require('../controllers/courseController');

// Публичные маршруты
publicRouter.get('/', courseController.getAllCourses);
publicRouter.get('/:id', courseController.getCourseById);

// Защищенные маршруты
protectedRouter.post('/', courseController.createCourse);
protectedRouter.put('/:id', courseController.updateCourse);
protectedRouter.delete('/:id', courseController.deleteCourse);
protectedRouter.post('/:id/enroll', courseController.enrollStudent);

module.exports = {
  publicRoutes: publicRouter,
  protectedRoutes: protectedRouter
}; 