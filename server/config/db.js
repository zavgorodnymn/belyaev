module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/university',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
}; 