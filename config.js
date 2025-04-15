// config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp',
  jwtSecret: process.env.JWT_SECRET || 'fgfd23221',
  nodeEnv: process.env.NODE_ENV || 'development'
};
