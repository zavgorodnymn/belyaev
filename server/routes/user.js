const express = require('express');
const publicRouter = express.Router();
const protectedRouter = express.Router();
const userController = require('../controllers/userController');

// Публичные маршруты
publicRouter.get('/', userController.getAllUsers);
publicRouter.get('/:id', userController.getUserById);

// Защищенные маршруты
protectedRouter.put('/:id', userController.updateUser);
protectedRouter.delete('/:id', userController.deleteUser);

module.exports = {
  publicRoutes: publicRouter,
  protectedRoutes: protectedRouter
}; 