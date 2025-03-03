import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ScheduleFormModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  schedule = null, 
  courses = [], 
  teachers = [] 
}) => {
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

  const [errors, setErrors] = useState({});

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
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleTimeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.format('HH:mm')
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.course) newErrors.course = 'Выберите курс';
    if (!formData.teacher) newErrors.teacher = 'Выберите преподавателя';
    if (!formData.room) newErrors.room = 'Укажите аудиторию';
    if (!formData.startTime) newErrors.startTime = 'Укажите время начала';
    if (!formData.endTime) newErrors.endTime = 'Укажите время окончания';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {schedule ? 'Редактировать занятие' : 'Добавить занятие'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.course}>
                <InputLabel>Курс</InputLabel>
                <Select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  label="Курс"
                >
                  {courses.map(course => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.course && (
                  <Typography color="error" variant="caption">
                    {errors.course}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>День недели</InputLabel>
                <Select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleChange}
                  label="День недели"
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <MenuItem key={day} value={day}>{day}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Время начала"
                  value={dayjs(formData.startTime, 'HH:mm')}
                  onChange={(newValue) => handleTimeChange('startTime', newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.startTime,
                      helperText: errors.startTime
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Время окончания"
                  value={dayjs(formData.endTime, 'HH:mm')}
                  onChange={(newValue) => handleTimeChange('endTime', newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.endTime,
                      helperText: errors.endTime
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Аудитория"
                name="room"
                value={formData.room}
                onChange={handleChange}
                error={!!errors.room}
                helperText={errors.room}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Тип занятия</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Тип занятия"
                >
                  <MenuItem value="lecture">Лекция</MenuItem>
                  <MenuItem value="practice">Практика</MenuItem>
                  <MenuItem value="lab">Лабораторная</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.teacher}>
                <InputLabel>Преподаватель</InputLabel>
                <Select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                  label="Преподаватель"
                >
                  {teachers.map(teacher => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {`${teacher.profile?.firstName} ${teacher.profile?.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
                {errors.teacher && (
                  <Typography color="error" variant="caption">
                    {errors.teacher}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Группа"
                name="group"
                value={formData.group}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          {schedule ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleFormModal; 