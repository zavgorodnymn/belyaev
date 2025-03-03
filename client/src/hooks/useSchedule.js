import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { scheduleService } from '../services/scheduleService';

export const useSchedule = (userId) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        let data;
        
        if (user?.role === 'teacher') {
          data = await scheduleService.getTeacherSchedule(userId);
        } else if (user?.role === 'student') {
          // В будущем можно добавить получение расписания для конкретной группы
          data = await scheduleService.getAllSchedules();
        } else {
          data = await scheduleService.getAllSchedules();
        }

        setSchedules(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userId, user]);

  return {
    schedules,
    loading,
    error,
    setSchedules
  };
}; 