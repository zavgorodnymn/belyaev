const Department = require('../models/Department');

const departments = [
  {
    name: 'Кафедра информатики',
    code: 'CS',
    description: 'Подготовка специалистов в области компьютерных наук и информационных технологий',
  },
  {
    name: 'Кафедра математики',
    code: 'MATH',
    description: 'Фундаментальная и прикладная математика',
  },
  {
    name: 'Кафедра физики',
    code: 'PHYS',
    description: 'Исследования в области физики и прикладных наук',
  }
];

const seedDepartments = async (teacherIds) => {
  try {
    await Department.deleteMany({});

    const departmentsWithRefs = departments.map((dept, index) => ({
      ...dept,
      head: teacherIds[index], // Назначаем заведующих кафедрами
      teachers: [teacherIds[index]] // Добавляем преподавателей на кафедры
    }));

    const createdDepartments = await Department.insertMany(departmentsWithRefs);
    console.log('Факультеты успешно добавлены');
    return createdDepartments;
  } catch (error) {
    console.error('Ошибка при добавлении факультетов:', error);
    throw error;
  }
};

module.exports = seedDepartments; 