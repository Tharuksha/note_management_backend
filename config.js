require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp',
  jwtSecret: process.env.JWT_SECRET || 'fgfd23221',
  frontendURI: process.env.FRONTEND_URI || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development'
};
