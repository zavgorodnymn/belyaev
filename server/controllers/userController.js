const User = require('../models/User');

const userController = {
  // Получить всех пользователей
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить пользователя по ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Создать пользователя
  createUser: async (req, res) => {
    try {
      const { username, email, password, role = 'student', profile } = req.body;
      const user = new User({
        username,
        email,
        password, // В реальном приложении пароль должен быть захеширован
        role,
        profile
      });
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Обновить пользователя
  updateUser: async (req, res) => {
    try {
      const { password, ...updateData } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      ).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Удалить пользователя
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json({ message: 'Пользователь удален' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить всех преподавателей
  getAllTeachers: async (req, res) => {
    try {
      const teachers = await User.find({ role: 'teacher' })
        .select('-password')
        .populate('profile');
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить всех студентов
  getAllStudents: async (req, res) => {
    try {
      const students = await User.find({ role: 'student' })
        .select('-password')
        .populate('profile');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController; 