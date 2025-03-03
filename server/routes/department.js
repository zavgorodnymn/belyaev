const express = require('express');
const publicRouter = express.Router();
const protectedRouter = express.Router();
const departmentController = require('../controllers/departmentController');

// Публичные маршруты
publicRouter.get('/', departmentController.getAllDepartments);
publicRouter.get('/:id', departmentController.getDepartmentById);

// Защищенные маршруты
protectedRouter.post('/', departmentController.createDepartment);
protectedRouter.put('/:id', departmentController.updateDepartment);
protectedRouter.delete('/:id', departmentController.deleteDepartment);

module.exports = {
  publicRoutes: publicRouter,
  protectedRoutes: protectedRouter
}; 