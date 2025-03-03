import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Edit as EditIcon } from '@mui/icons-material';

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    phone: user?.profile?.phone || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await userService.updateProfile({
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        },
        email: formData.email
      });
      
      await checkAuth(); // Обновляем данные пользователя в контексте
      setSuccess(true);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mr: 3,
              bgcolor: 'primary.main',
              fontSize: '2rem'
            }}
          >
            {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              Профиль пользователя
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user?.role === 'admin' ? 'Администратор' :
               user?.role === 'teacher' ? 'Преподаватель' : 'Студент'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!editing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!editing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Телефон"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editing}
              />
            </Grid>

            {user?.role === 'student' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Группа"
                    value={user?.profile?.group || ''}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Курс"
                    value={user?.profile?.year || ''}
                    disabled
                  />
                </Grid>
              </>
            )}

            {user?.role === 'teacher' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Кафедра"
                    value={user?.profile?.department || ''}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Должность"
                    value={user?.profile?.position || ''}
                    disabled
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {!editing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditing(true)}
              >
                Редактировать
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setEditing(false)}
                >
                  Отмена
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Сохранить
                </LoadingButton>
              </>
            )}
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={success || !!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {success ? "Профиль успешно обновлен" : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 