import React, { useState, useEffect } from 'react';
import './ScheduleForm.css';

const ScheduleForm = ({ schedule, onSubmit, courses, teachers }) => {
  const [formData, setFormData] = useState({
    course: '',
    dayOfWeek: 'Monday',
    startTime: '08:00',
    endTime: '09:30',
    room: '',
    type: 'lecture',
    teacher: '',
    group: '',
    semester: {
      year: new Date().getFullYear(),
      term: 'Fall'
    }
  });

  useEffect(() => {
    if (schedule) {
      setFormData(schedule);
    }
  }, [schedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('semester.')) {
      const semesterField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        semester: {
          ...prev.semester,
          [semesterField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Курс:</label>
        <select name="course" value={formData.course} onChange={handleChange} required>
          <option value="">Выберите курс</option>
          {courses?.map(course => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>День недели:</label>
        <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} required>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Начало:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Конец:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Аудитория:</label>
        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Тип занятия:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="lecture">Лекция</option>
          <option value="practice">Практика</option>
          <option value="lab">Лабораторная</option>
        </select>
      </div>

      <div className="form-group">
        <label>Преподаватель:</label>
        <select name="teacher" value={formData.teacher} onChange={handleChange} required>
          <option value="">Выберите преподавателя</option>
          {teachers?.map(teacher => (
            <option key={teacher._id} value={teacher._id}>
              {`${teacher.profile.firstName} ${teacher.profile.lastName}`}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Группа:</label>
        <input
          type="text"
          name="group"
          value={formData.group}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Год:</label>
          <input
            type="number"
            name="semester.year"
            value={formData.semester.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Семестр:</label>
          <select 
            name="semester.term" 
            value={formData.semester.term} 
            onChange={handleChange}
            required
          >
            <option value="Fall">Осенний</option>
            <option value="Spring">Весенний</option>
            <option value="Summer">Летний</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-button">
        {schedule ? 'Обновить' : 'Создать'} расписание
      </button>
    </form>
  );
};

export default ScheduleForm; 