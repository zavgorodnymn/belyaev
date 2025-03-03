module.exports = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  accessTokenExpiration: '15m',
  refreshTokenExpiration: '7d',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}; 