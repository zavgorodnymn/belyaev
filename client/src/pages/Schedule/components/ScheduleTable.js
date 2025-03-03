import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Grid,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const ScheduleTable = ({
  schedules,
  onScheduleClick,
  onEditClick,
  onDeleteClick,
  canEdit
}) => {
  const timeSlots = [
    '08:00', '09:45', '11:30', 
    '13:30', '15:15', '17:00'
  ];

  const days = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];

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

  const getTypeColor = (type) => {
    const colors = {
      'lecture': 'primary',
      'practice': 'success',
      'lab': 'warning'
    };
    return colors[type] || 'default';
  };

  const getScheduleForTimeAndDay = (time, day) => {
    return schedules.filter(schedule => 
      schedule.dayOfWeek === day && 
      schedule.startTime === time
    );
  };

  return (
    <Paper elevation={3} sx={{ mt: 2, p: 2, overflowX: 'auto' }}>
      <Grid container spacing={2}>
        {/* Заголовок с днями недели */}
        <Grid item xs={2}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Время
            </Typography>
          </Box>
        </Grid>
        {days.map(day => (
          <Grid item xs={2} key={day}>
            <Typography variant="subtitle1" fontWeight="bold" align="center">
              {getDayName(day)}
            </Typography>
          </Grid>
        ))}

        {/* Временные слоты и занятия */}
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            <Grid item xs={2}>
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center' 
              }}>
                <Typography>{time}</Typography>
              </Box>
            </Grid>
            {days.map(day => (
              <Grid item xs={2} key={`${day}-${time}`}>
                {getScheduleForTimeAndDay(time, day).map(schedule => (
                  <Card 
                    key={schedule._id}
                    sx={{ 
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="subtitle2" noWrap>
                        {schedule.course?.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Chip 
                          label={getTypeName(schedule.type)}
                          size="small"
                          color={getTypeColor(schedule.type)}
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          {schedule.room}
                        </Typography>
                      </Box>
                      <Typography variant="caption" display="block" color="textSecondary">
                        {schedule.group}
                      </Typography>
                      <Typography variant="caption" display="block" color="textSecondary" noWrap>
                        {`${schedule.teacher?.profile?.lastName} ${schedule.teacher?.profile?.firstName?.[0]}.`}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        mt: 0.5 
                      }}>
                        <Tooltip title="Подробности">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onScheduleClick(schedule);
                            }}
                          >
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {canEdit && (
                          <>
                            <Tooltip title="Редактировать">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditClick(schedule);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Удалить">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteClick(schedule._id);
                                }}
                                color="error"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default ScheduleTable; 