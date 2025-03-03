const Department = require('../models/Department');

const departmentController = {
  // Получить все факультеты
  getAllDepartments: async (req, res) => {
    try {
      const departments = await Department.find()
        .populate('head', 'profile.firstName profile.lastName')
        .populate('teachers', 'profile.firstName profile.lastName')
        .populate('courses', 'title code');
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить факультет по ID
  getDepartmentById: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id)
        .populate('head', 'profile.firstName profile.lastName')
        .populate('teachers', 'profile.firstName profile.lastName')
        .populate('courses', 'title code');
      if (!department) {
        return res.status(404).json({ message: 'Факультет не найден' });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Создать новый факультет
  createDepartment: async (req, res) => {
    try {
      const department = new Department(req.body);
      const newDepartment = await department.save();
      res.status(201).json(newDepartment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Обновить факультет
  updateDepartment: async (req, res) => {
    try {
      const department = await Department.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(department);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Удалить факультет
  deleteDepartment: async (req, res) => {
    try {
      await Department.findByIdAndDelete(req.params.id);
      res.json({ message: 'Факультет удален' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = departmentController; 