const mongoose = require('mongoose');
const config = require('../config/db');
const User = require('../models/User');
const seedUsers = require('./users');
const seedDepartments = require('./departments');
const seedCourses = require('./courses');
const seedSchedules = require('./schedules');

const runSeeds = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB подключена');

    // Добавляем пользователей
    await seedUsers();

    // Получаем ID преподавателей для связей
    const teachers = await User.find({ role: 'teacher' });
    const teacherIds = teachers.map(teacher => teacher._id);

    // Добавляем факультеты
    const departments = await seedDepartments(teacherIds);
    const departmentIds = departments.map(dept => dept._id);

    // Добавляем курсы
    const courses = await seedCourses(teacherIds, departmentIds);

    // Добавляем расписание
    await seedSchedules(courses, teachers);

    console.log('Все сиды успешно выполнены');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при выполнении сидов:', error);
    process.exit(1);
  }
};

runSeeds(); 