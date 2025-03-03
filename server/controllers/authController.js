const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    jwtConfig.secret,
    { expiresIn: jwtConfig.accessTokenExpiration }
  );

  const refreshToken = jwt.sign(
    { userId },
    jwtConfig.secret,
    { expiresIn: jwtConfig.refreshTokenExpiration }
  );

  return { accessToken, refreshToken };
};

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Находим пользователя
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Проверяем пароль
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Генерируем токены
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Сохраняем refresh token в куки
      res.cookie('refreshToken', refreshToken, jwtConfig.cookieOptions);

      // Отправляем ответ с access token и данными пользователя
      res.json({
        accessToken,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          profile: user.profile
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Отсутствует refresh token' });
      }

      // Проверяем refresh token
      const decoded = jwt.verify(refreshToken, jwtConfig.secret);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      // Генерируем новые токены
      const tokens = generateTokens(user._id);

      // Обновляем refresh token в куки
      res.cookie('refreshToken', tokens.refreshToken, jwtConfig.cookieOptions);

      // Отправляем новый access token
      res.json({ accessToken: tokens.accessToken });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Refresh token истек' });
      }
      res.status(401).json({ message: 'Невалидный refresh token' });
    }
  },

  async logout(req, res) {
    try {
      // Очищаем refresh token из куки
      res.clearCookie('refreshToken', {
        ...jwtConfig.cookieOptions,
        maxAge: 0
      });
      res.json({ message: 'Успешный выход' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },

  async me(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json({
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profile: user.profile
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
};

module.exports = authController; 