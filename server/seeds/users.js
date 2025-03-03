const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'admin',
    email: 'admin@university.com',
    password: 'admin123',
    role: 'admin',
    profile: {
      firstName: 'Главный',
      lastName: 'Администратор',
      phone: '+7 (999) 999-99-99'
    }
  },
  // Преподаватели
  {
    username: 'teacher1',
    email: 'ivanov@university.com',
    password: 'teacher123',
    role: 'teacher',
    profile: {
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '+7 (999) 111-11-11',
      department: 'Кафедра информатики',
      position: 'Профессор',
      academicDegree: 'Доктор технических наук'
    }
  },
  {
    username: 'teacher2',
    email: 'petrova@university.com',
    password: 'teacher123',
    role: 'teacher',
    profile: {
      firstName: 'Елена',
      lastName: 'Петрова',
      phone: '+7 (999) 222-22-22',
      department: 'Кафедра математики',
      position: 'Доцент',
      academicDegree: 'Кандидат физико-математических наук'
    }
  },
  {
    username: 'teacher3',
    email: 'smirnov@university.com',
    password: 'teacher123',
    role: 'teacher',
    profile: {
      firstName: 'Алексей',
      lastName: 'Смирнов',
      phone: '+7 (999) 333-33-33',
      department: 'Кафедра физики',
      position: 'Старший преподаватель',
      academicDegree: 'Кандидат физико-математических наук'
    }
  },
  // Студенты
  {
    username: 'student1',
    email: 'sidorov@university.com',
    password: 'student123',
    role: 'student',
    profile: {
      firstName: 'Павел',
      lastName: 'Сидоров',
      phone: '+7 (999) 444-44-44',
      studentId: '2020001',
      group: 'ИС-201',
      year: 3
    }
  },
  {
    username: 'student2',
    email: 'volkova@university.com',
    password: 'student123',
    role: 'student',
    profile: {
      firstName: 'Мария',
      lastName: 'Волкова',
      phone: '+7 (999) 555-55-55',
      studentId: '2020002',
      group: 'ИС-201',
      year: 3
    }
  },
  {
    username: 'student3',
    email: 'kozlov@university.com',
    password: 'student123',
    role: 'student',
    profile: {
      firstName: 'Дмитрий',
      lastName: 'Козлов',
      phone: '+7 (999) 666-66-66',
      studentId: '2020003',
      group: 'МТ-202',
      year: 2
    }
  }
];

const seedUsers = async () => {
  try {
    // Очищаем коллекцию пользователей
    await User.deleteMany({});

    // Хешируем пароли и создаем пользователей
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Вставляем пользователей в базу данных
    await User.insertMany(hashedUsers);

    console.log('База данных успешно заполнена тестовыми пользователями');
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
  }
};

module.exports = seedUsers; 