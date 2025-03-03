import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courseService } from '../services/courseService';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!course) return null;

  return (
    <div>
      <h1>{course.title}</h1>
      <div className="course-details">
        <p><strong>Код курса:</strong> {course.code}</p>
        <p><strong>Описание:</strong> {course.description}</p>
        <p><strong>Преподаватель:</strong> {course.teacher?.profile?.firstName} {course.teacher?.profile?.lastName}</p>
        <h3>Расписание занятий</h3>
        {course.schedule?.map((slot, index) => (
          <div key={index} className="schedule-slot">
            <p>{slot.day} - {slot.time}</p>
            <p>Аудитория: {slot.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails; 