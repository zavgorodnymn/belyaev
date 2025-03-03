const Schedule = require('../models/Schedule');

const scheduleController = {
  // Получить все занятия
  getAllSchedules: async (req, res) => {
    try {
      const schedules = await Schedule.find()
        .populate('course', 'title code')
        .populate('teacher', 'profile.firstName profile.lastName');
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить расписание по ID
  getScheduleById: async (req, res) => {
    try {
      const schedule = await Schedule.findById(req.params.id)
        .populate('course')
        .populate('teacher');
      if (!schedule) {
        return res.status(404).json({ message: 'Расписание не найдено' });
      }
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить расписание для конкретного курса
  getScheduleByCourse: async (req, res) => {
    try {
      const schedules = await Schedule.find({ course: req.params.courseId })
        .populate('course')
        .populate('teacher');
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Получить расписание преподавателя
  getScheduleByTeacher: async (req, res) => {
    try {
      const schedules = await Schedule.find({ teacher: req.params.teacherId })
        .populate('course')
        .populate('teacher');
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Создать новое расписание
  createSchedule: async (req, res) => {
    try {
      const schedule = new Schedule(req.body);
      const newSchedule = await schedule.save();
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Обновить расписание
  updateSchedule: async (req, res) => {
    try {
      const schedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(schedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Удалить расписание
  deleteSchedule: async (req, res) => {
    try {
      await Schedule.findByIdAndDelete(req.params.id);
      res.json({ message: 'Расписание удалено' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = scheduleController; 