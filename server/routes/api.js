const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const courseRoutes = require('./course');
const departmentRoutes = require('./department');
const scheduleRoutes = require('./schedule');
const auth = require('../middleware/auth');

// Публичные маршруты
router.use('/auth', authRoutes);

// Проверяем наличие роутов перед использованием
if (userRoutes?.publicRoutes) {
  router.use('/users', userRoutes.publicRoutes);
}
if (courseRoutes?.publicRoutes) {
  router.use('/courses', courseRoutes.publicRoutes);
}
if (departmentRoutes?.publicRoutes) {
  router.use('/departments', departmentRoutes.publicRoutes);
}
if (scheduleRoutes?.publicRoutes) {
  router.use('/schedules', scheduleRoutes.publicRoutes);
}

// Защищенные маршруты
if (userRoutes?.protectedRoutes) {
  router.use('/users/manage', auth, userRoutes.protectedRoutes);
  router.use('/profile', auth, userRoutes.protectedRoutes);
}
if (courseRoutes?.protectedRoutes) {
  router.use('/courses/manage', auth, courseRoutes.protectedRoutes);
}
if (departmentRoutes?.protectedRoutes) {
  router.use('/departments/manage', auth, departmentRoutes.protectedRoutes);
}
if (scheduleRoutes?.protectedRoutes) {
  router.use('/schedules/manage', auth, scheduleRoutes.protectedRoutes);
}

// Временный обработчик для отсутствующих маршрутов
router.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = router; 