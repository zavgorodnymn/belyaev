import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid
} from '@mui/material';

const ScheduleFilters = ({ filters, onFiltersChange, teachers, courses }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFiltersChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>День недели</InputLabel>
            <Select
              name="dayOfWeek"
              value={filters.dayOfWeek}
              label="День недели"
              onChange={handleChange}
            >
              <MenuItem value="all">Все дни</MenuItem>
              <MenuItem value="Monday">Понедельник</MenuItem>
              <MenuItem value="Tuesday">Вторник</MenuItem>
              <MenuItem value="Wednesday">Среда</MenuItem>
              <MenuItem value="Thursday">Четверг</MenuItem>
              <MenuItem value="Friday">Пятница</MenuItem>
              <MenuItem value="Saturday">Суббота</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Тип занятия</InputLabel>
            <Select
              name="type"
              value={filters.type}
              label="Тип занятия"
              onChange={handleChange}
            >
              <MenuItem value="all">Все типы</MenuItem>
              <MenuItem value="lecture">Лекция</MenuItem>
              <MenuItem value="practice">Практика</MenuItem>
              <MenuItem value="lab">Лабораторная</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Преподаватель</InputLabel>
            <Select
              name="teacher"
              value={filters.teacher}
              label="Преподаватель"
              onChange={handleChange}
            >
              <MenuItem value="all">Все преподаватели</MenuItem>
              {teachers?.map(teacher => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {`${teacher.profile?.firstName} ${teacher.profile?.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Курс</InputLabel>
            <Select
              name="course"
              value={filters.course}
              label="Курс"
              onChange={handleChange}
            >
              <MenuItem value="all">Все курсы</MenuItem>
              {courses?.map(course => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Группа"
            name="group"
            value={filters.group === 'all' ? '' : filters.group}
            onChange={handleChange}
            placeholder="Введите группу"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleFilters; 