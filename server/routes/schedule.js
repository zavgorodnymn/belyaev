const express = require('express');
const publicRouter = express.Router();
const protectedRouter = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Публичные маршруты
publicRouter.get('/', scheduleController.getAllSchedules);
publicRouter.get('/:id', scheduleController.getScheduleById);
publicRouter.get('/course/:courseId', scheduleController.getScheduleByCourse);
publicRouter.get('/teacher/:teacherId', scheduleController.getScheduleByTeacher);

// Защищенные маршруты
protectedRouter.post('/', scheduleController.createSchedule);
protectedRouter.put('/:id', scheduleController.updateSchedule);
protectedRouter.delete('/:id', scheduleController.deleteSchedule);

module.exports = {
  publicRoutes: publicRouter,
  protectedRoutes: protectedRouter
}; 