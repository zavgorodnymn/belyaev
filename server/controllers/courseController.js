const Course = require('../models/Course');

const courseController = {
  // Получить все курсы
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find()
        .populate('teacher', 'profile.firstName profile.lastName')
        .populate('students', 'profile.firstName profile.lastName');
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить курс по ID
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)
        .populate('teacher', 'profile.firstName profile.lastName')
        .populate('students', 'profile.firstName profile.lastName');
      if (!course) {
        return res.status(404).json({ message: 'Курс не найден' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Создать новый курс
  createCourse: async (req, res) => {
    try {
      const course = new Course(req.body);
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Обновить курс
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(course);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Удалить курс
  deleteCourse: async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Курс удален' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Записать студента на курс
  enrollStudent: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Курс не найден' });
      }

      const { studentId } = req.body;
      if (course.students.includes(studentId)) {
        return res.status(400).json({ message: 'Студент уже записан на курс' });
      }

      course.students.push(studentId);
      await course.save();

      res.json(course);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = courseController; 