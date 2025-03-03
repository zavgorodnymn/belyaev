import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Box
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Room as RoomIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Group as GroupIcon
} from '@mui/icons-material';

const ScheduleDetailsModal = ({ open, onClose, schedule }) => {
  if (!schedule) return null;

  const getDayName = (day) => {
    const days = {
      'Monday': 'Понедельник',
      'Tuesday': 'Вторник',
      'Wednesday': 'Среда',
      'Thursday': 'Четверг',
      'Friday': 'Пятница',
      'Saturday': 'Суббота'
    };
    return days[day] || day;
  };

  const getTypeName = (type) => {
    const types = {
      'lecture': 'Лекция',
      'practice': 'Практика',
      'lab': 'Лабораторная'
    };
    return types[type] || type;
  };

  const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Box sx={{ ml: 2 }}>
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Информация о занятии
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {schedule.course?.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {getTypeName(schedule.type)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <InfoRow
              icon={<ScheduleIcon color="action" />}
              label="Время"
              value={`${getDayName(schedule.dayOfWeek)}, ${schedule.startTime} - ${schedule.endTime}`}
            />

            <InfoRow
              icon={<RoomIcon color="action" />}
              label="Аудитория"
              value={schedule.room}
            />

            <InfoRow
              icon={<PersonIcon color="action" />}
              label="Преподаватель"
              value={`${schedule.teacher?.profile?.lastName} ${schedule.teacher?.profile?.firstName} ${schedule.teacher?.profile?.middleName}`}
            />

            <InfoRow
              icon={<GroupIcon color="action" />}
              label="Группа"
              value={schedule.group}
            />

            <InfoRow
              icon={<SchoolIcon color="action" />}
              label="Семестр"
              value={`${schedule.semester.term} ${schedule.semester.year}`}
            />
          </Grid>

          {schedule.course?.description && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Описание курса
                </Typography>
                <Typography variant="body2">
                  {schedule.course.description}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleDetailsModal; 