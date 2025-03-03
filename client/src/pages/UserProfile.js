import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUsers';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useUser(userId);

  useEffect(() => {
    if (error?.response?.status === 404) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [error, navigate]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <div>
        <h2>{user.username}</h2>
        <p>Email: {user.email}</p>
        <p>Дата регистрации: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile; 