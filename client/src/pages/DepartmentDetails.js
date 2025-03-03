import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { departmentService } from '../services/departmentService';

const DepartmentDetails = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await departmentService.getDepartmentById(id);
        setDepartment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!department) return null;

  return (
    <div>
      <h1>{department.name}</h1>
      <div className="department-details">
        <p><strong>Код:</strong> {department.code}</p>
        <h3>Заведующий кафедрой</h3>
        <p>{department.head?.profile?.firstName} {department.head?.profile?.lastName}</p>
        
        <h3>Преподаватели</h3>
        <ul>
          {department.teachers?.map(teacher => (
            <li key={teacher._id}>
              {teacher.profile?.firstName} {teacher.profile?.lastName}
            </li>
          ))}
        </ul>

        <h3>Курсы</h3>
        <ul>
          {department.courses?.map(course => (
            <li key={course._id}>
              {course.title} ({course.code})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentDetails; 