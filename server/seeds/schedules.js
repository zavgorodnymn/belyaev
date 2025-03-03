const Schedule = require('../models/Schedule');

const generateSchedules = (courses, teachers) => {
  const schedules = [];
  const timeSlots = ['08:00', '09:45', '11:30', '13:30', '15:15', '17:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const types = ['lecture', 'practice', 'lab'];
  const rooms = ['101', '102', '103', '201', '202', '203'];
  const terms = ['Fall', 'Spring', 'Summer'];

  courses.forEach((course, index) => {
    // Создаем 2-3 занятия для каждого курса
    const numClasses = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < numClasses; i++) {
      const dayIndex = (index + i) % days.length;
      const timeIndex = (index + i) % timeSlots.length;
      
      schedules.push({
        course: course._id,
        teacher: teachers[index % teachers.length]._id,
        dayOfWeek: days[dayIndex],
        startTime: timeSlots[timeIndex],
        endTime: timeSlots[(timeIndex + 1) % timeSlots.length],
        room: rooms[(index + i) % rooms.length],
        type: types[i % types.length],
        group: i % 2 === 0 ? 'ИС-201' : 'МТ-202',
        semester: {
          year: 2024,
          term: terms[Math.floor(Math.random() * terms.length)] // Случайный семестр
        }
      });
    }
  });

  return schedules;
};

const seedSchedules = async (courses, teachers) => {
  try {
    await Schedule.deleteMany({});

    const schedules = generateSchedules(courses, teachers);
    console.log('Generated schedules:', schedules); // Для отладки

    const createdSchedules = await Schedule.insertMany(schedules);
    
    console.log('Расписание успешно добавлено');
    return createdSchedules;
  } catch (error) {
    console.error('Ошибка при добавлении расписания:', error);
    throw error;
  }
};

module.exports = seedSchedules; 