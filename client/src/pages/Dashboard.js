import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Панель управления</h1>
      {user.role === 'admin' && (
        <div>
          <h2>Административные функции</h2>
          {/* Добавить административные функции */}
        </div>
      )}
      {user.role === 'teacher' && (
        <div>
          <h2>Функции преподавателя</h2>
          {/* Добавить функции преподавателя */}
        </div>
      )}
      {user.role === 'student' && (
        <div>
          <h2>Функции студента</h2>
          {/* Добавить функции студента */}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 