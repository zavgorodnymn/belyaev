import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, Button, Card, CardContent } from '@mui/material';
import { 
  Schedule as ScheduleIcon, 
  School as SchoolIcon,
  Group as GroupIcon,
  Info as InfoIcon 
} from '@mui/icons-material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Приветственный баннер */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white'
        }}
      >
        <Typography variant="h3" gutterBottom>
          Система управления расписанием университета
        </Typography>
        <Typography variant="h6">
          Удобный просмотр и управление расписанием занятий, курсами и группами
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            component={Link} 
            to="/schedule"
            size="large"
            startIcon={<ScheduleIcon />}
          >
            Просмотреть расписание
          </Button>
        </Box>
      </Paper>

      {/* Основные разделы */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 'auto' }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Курсы
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Просматривайте доступные курсы и их описания
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/courses"
                startIcon={<SchoolIcon />}
                sx={{ mt: 2 }}
              >
                К курсам
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 'auto' }}>
                <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Факультеты
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Информация о факультетах и кафедрах
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/departments"
                startIcon={<GroupIcon />}
                sx={{ mt: 2 }}
              >
                К факультетам
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 'auto' }}>
                <InfoIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  О системе
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Узнайте больше о возможностях системы
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/about"
                startIcon={<InfoIcon />}
                sx={{ mt: 2 }}
              >
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Дополнительная информация */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Для авторизованных пользователей доступно:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              • Управление личным расписанием
            </Typography>
            <Typography variant="body1">
              • Запись на курсы
            </Typography>
            <Typography variant="body1">
              • Просмотр детальной информации
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/login"
                color="primary"
              >
                Войти в систему
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home; 