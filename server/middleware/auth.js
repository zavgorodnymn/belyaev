const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Отсутствует токен авторизации',
        details: 'No Authorization header found'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        message: 'Неверный формат токена',
        details: 'Token not found in Authorization header'
      });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        message: 'Токен истек',
        details: error.message
      });
    }
    res.status(401).json({ 
      message: 'Невалидный токен',
      details: error.message
    });
  }
};

module.exports = auth; 