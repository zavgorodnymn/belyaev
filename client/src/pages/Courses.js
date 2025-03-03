import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Загрузка курсов...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h1>Курсы</h1>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Код курса: {course.code}</p>
            <Link to={`/courses/${course._id}`}>Подробнее</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 