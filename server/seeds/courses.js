const Course = require('../models/Course');

const courses = [
  {
    title: 'Введение в программирование',
    code: 'CS101',
    description: 'Основы программирования на Python',
    credits: 5,
    level: 'Бакалавриат',
    year: 1,
    semester: 'Fall'
  },
  {
    title: 'Алгоритмы и структуры данных',
    code: 'CS201',
    description: 'Изучение основных алгоритмов и структур данных',
    credits: 6,
    level: 'Бакалавриат',
    year: 2,
    semester: 'Spring'
  },
  {
    title: 'Высшая математика',
    code: 'MATH101',
    description: 'Математический анализ и линейная алгебра',
    credits: 5,
    level: 'Бакалавриат',
    year: 1,
    semester: 'Fall'
  },
  {
    title: 'Общая физика',
    code: 'PHYS101',
    description: 'Основы механики и молекулярной физики',
    credits: 5,
    level: 'Бакалавриат',
    year: 1,
    semester: 'Fall'
  },
  {
    title: 'Базы данных',
    code: 'CS301',
    description: 'Проектирование и разработка баз данных',
    credits: 5,
    level: 'Бакалавриат',
    year: 3,
    semester: 'Fall'
  }
];

const seedCourses = async (teacherIds, departmentIds) => {
  try {
    await Course.deleteMany({});

    const coursesWithRefs = courses.map((course, index) => ({
      ...course,
      teacher: teacherIds[index % teacherIds.length],
      department: departmentIds[index % departmentIds.length]
    }));

    const createdCourses = await Course.insertMany(coursesWithRefs);
    console.log('Курсы успешно добавлены');
    return createdCourses;
  } catch (error) {
    console.error('Ошибка при добавлении курсов:', error);
    throw error;
  }
};

module.exports = seedCourses; 