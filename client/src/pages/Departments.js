import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentService } from '../services/departmentService';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAllDepartments();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <div>Загрузка факультетов...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h1>Факультеты</h1>
      <div className="departments-grid">
        {departments.map(department => (
          <div key={department._id} className="department-card">
            <h3>{department.name}</h3>
            <p>Код: {department.code}</p>
            <Link to={`/departments/${department._id}`}>Подробнее</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments; 