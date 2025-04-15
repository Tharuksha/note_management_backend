const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const http = require('http');
const config = require('./config');

console.log('🚀 Initializing server...');

// routes
const notesRoutes = require('./routes/notes');
const foldersRoutes = require('./routes/folders');
const tagsRoutes = require('./routes/tags');
const authRoutes = require('./routes/auth');

// error handler middleware
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);

// Middleware 
console.log('🔧 Applying middlewares...');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Rate limiting
console.log('🚦 Setting up rate limiter...');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});
app.use(limiter);

// Routes
console.log('📦 Loading routes...');
console.log('📦 Routes mounted:');
console.log('  → /api/notes');
console.log('  → /api/folders');
console.log('  → /api/tags');
console.log('  → /api/auth');
app.use('/api/notes', notesRoutes);
app.use('/api/folders', foldersRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/auth', authRoutes);

// Global error handler
app.use(errorHandler);

// MongoDB Connection
console.log('🔌 Connecting to MongoDB...');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize Socket.IO 
console.log('📡 Initializing WebSockets...');
const io = require('./sockets')(server);
app.set('io', io);

// Start server
server.listen(config.port, () => {
  console.log(`🚀 Server is live and running at http://localhost:${config.port}`);
});
