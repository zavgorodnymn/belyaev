import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSchedule } from '../../hooks/useSchedule';
import { useTeachers } from '../../hooks/useTeachers';
import { useCourses } from '../../hooks/useCourses';
import ScheduleTable from './components/ScheduleTable';
import ScheduleFilters from './components/ScheduleFilters';
import ScheduleFormModal from './components/ScheduleFormModal';
import ScheduleDetailsModal from './components/ScheduleDetailsModal';
import ScheduleToolbar from './components/ScheduleToolbar';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { scheduleService } from '../../services/scheduleService';

const Schedule = () => {
  const { user } = useAuth();
  const { schedules, setSchedules, loading, error } = useSchedule(user?._id);
  const { teachers } = useTeachers();
  const { courses } = useCourses();

  // Состояния для модальных окон
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Состояния для фильтров
  const [filters, setFilters] = useState({
    dayOfWeek: 'all',
    type: 'all',
    teacher: 'all',
    course: 'all',
    group: 'all'
  });

  // Состояние для уведомлений
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Обработчики для расписания
  const handleCreateSchedule = async (scheduleData) => {
    try {
      const newSchedule = await scheduleService.createSchedule(scheduleData);
      
      // Проверяем конфликты
      const conflicts = checkScheduleConflicts(newSchedule, schedules);
      if (conflicts.length > 0) {
        setNotification({
          open: true,
          message: 'Обнаружены конфликты в расписании!',
          severity: 'warning'
        });
      }

      setSchedules([...schedules, newSchedule]);
      setIsFormModalOpen(false);
      setNotification({
        open: true,
        message: 'Расписание успешно создано',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  const handleEditSchedule = async (scheduleData) => {
    try {
      const updatedSchedule = await scheduleService.updateSchedule(scheduleData._id, scheduleData);
      setSchedules(schedules.map(s => s._id === updatedSchedule._id ? updatedSchedule : s));
      setIsFormModalOpen(false);
      setNotification({
        open: true,
        message: 'Расписание успешно обновлено',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await scheduleService.deleteSchedule(id);
      setSchedules(schedules.filter(s => s._id !== id));
      setNotification({
        open: true,
        message: 'Расписание успешно удалено',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  // Функция проверки конфликтов
  const checkScheduleConflicts = (newSchedule, existingSchedules) => {
    return existingSchedules.filter(schedule => {
      return schedule.dayOfWeek === newSchedule.dayOfWeek &&
        ((schedule.startTime <= newSchedule.startTime && schedule.endTime > newSchedule.startTime) ||
         (schedule.startTime < newSchedule.endTime && schedule.endTime >= newSchedule.endTime)) &&
        (schedule.teacher === newSchedule.teacher || schedule.room === newSchedule.room);
    });
  };

  // Фильтрация расписания
  const filteredSchedules = schedules.filter(schedule => {
    return (filters.dayOfWeek === 'all' || schedule.dayOfWeek === filters.dayOfWeek) &&
           (filters.type === 'all' || schedule.type === filters.type) &&
           (filters.teacher === 'all' || schedule.teacher._id === filters.teacher) &&
           (filters.course === 'all' || schedule.course._id === filters.course) &&
           (filters.group === 'all' || schedule.group === filters.group);
  });

  if (loading) return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Загрузка расписания...</Typography>
      </Box>
    </Container>
  );

  if (error) return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">Ошибка: {error}</Typography>
      </Box>
    </Container>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <ScheduleToolbar
          canEdit={!!user}
          onAddClick={() => {
            setSelectedSchedule(null);
            setIsFormModalOpen(true);
          }}
        />

        <ScheduleFilters
          filters={filters}
          onFiltersChange={setFilters}
          teachers={teachers}
          courses={courses}
        />

        <ScheduleTable
          schedules={filteredSchedules}
          onScheduleClick={(schedule) => {
            console.log(schedule);
            setSelectedSchedule(schedule);
            setIsDetailsModalOpen(true);
          }}
          onEditClick={(schedule) => {
            setSelectedSchedule(schedule);
            setIsFormModalOpen(true);
          }}
          onDeleteClick={handleDeleteSchedule}
          canEdit={!!user}
        />
      </Paper>

      <ScheduleFormModal
        open={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedSchedule(null);
        }}
        onSubmit={selectedSchedule ? handleEditSchedule : handleCreateSchedule}
        schedule={selectedSchedule}
        courses={courses}
        teachers={teachers}
      />

      <ScheduleDetailsModal
        open={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedSchedule(null);
        }}
        schedule={selectedSchedule}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Schedule; 