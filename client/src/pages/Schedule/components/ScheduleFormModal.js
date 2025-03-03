import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const ScheduleFormModal = ({
  open,
  onClose,
  onSubmit,
  schedule,
  courses,
  teachers,
  loading
}) => {
  const [formData, setFormData] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    type: '',
    room: '',
    course: '',
    teacher: '',
    group: '',
    semester: {
      year: new Date().getFullYear(),
      term: 'Fall'
    }
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (schedule) {
      setFormData({
        ...schedule,
        course: schedule.course?._id || '',
        teacher: schedule.teacher?._id || ''
      });
    } else {
      setFormData({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        type: '',
        room: '',
        course: '',
        teacher: '',
        group: '',
        semester: {
          year: new Date().getFullYear(),
          term: 'Fall'
        }
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
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
    setError(null);

    // Валидация
    if (!formData.dayOfWeek || !formData.startTime || !formData.endTime || 
        !formData.type || !formData.room || !formData.course || 
        !formData.teacher || !formData.group) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Проверка времени
    if (formData.startTime >= formData.endTime) {
      setError('Время начала должно быть раньше времени окончания');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {schedule ? 'Редактировать занятие' : 'Добавить занятие'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>День недели</InputLabel>
                <Select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  label="День недели"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Monday">Понедельник</MenuItem>
                  <MenuItem value="Tuesday">Вторник</MenuItem>
                  <MenuItem value="Wednesday">Среда</MenuItem>
                  <MenuItem value="Thursday">Четверг</MenuItem>
                  <MenuItem value="Friday">Пятница</MenuItem>
                  <MenuItem value="Saturday">Суббота</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Время начала"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Время окончания"
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Курс</InputLabel>
                <Select
                  name="course"
                  value={formData.course}
                  label="Курс"
                  onChange={handleChange}
                  required
                >
                  {courses?.map(course => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Преподаватель</InputLabel>
                <Select
                  name="teacher"
                  value={formData.teacher}
                  label="Преподаватель"
                  onChange={handleChange}
                  required
                >
                  {teachers?.map(teacher => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {`${teacher.profile?.lastName} ${teacher.profile?.firstName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Тип занятия</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Тип занятия"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="lecture">Лекция</MenuItem>
                  <MenuItem value="practice">Практика</MenuItem>
                  <MenuItem value="lab">Лабораторная</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Аудитория"
                name="room"
                value={formData.room}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Группа"
                name="group"
                value={formData.group}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Год"
                type="number"
                name="semester.year"
                value={formData.semester.year}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Семестр</InputLabel>
                <Select
                  name="semester.term"
                  value={formData.semester.term}
                  label="Семестр"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Fall">Осенний</MenuItem>
                  <MenuItem value="Spring">Весенний</MenuItem>
                  <MenuItem value="Summer">Летний</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Отмена
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
          >
            {schedule ? 'Сохранить' : 'Добавить'}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ScheduleFormModal; 