const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const http = require('http');
const config = require('./config');
const mongoSanitize = require('express-mongo-sanitize');

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
app.use(mongoSanitize()); // prevent SQL injection
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

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to Notes API</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #fefefe; color: #333; padding: 3rem; text-align: center;">
      <h1 style="font-size: 2.5rem; color: #4CAF50;">📚 Welcome to the Notes API</h1>
      <p style="font-size: 1.2rem; margin-top: 1rem;">
        Your personal knowledge base, organized and always available.
      </p>
      <div style="margin: 2rem auto; width: fit-content; background: #f4f4f4; padding: 1.5rem 2rem; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="font-size: 1rem;">
          🚀 Start exploring: 
          <code style="background: #e0e0e0; padding: 0.3rem 0.5rem; border-radius: 5px;">/api</code>
        </p>
        <p style="font-size: 0.95rem; color: #666;">Access endpoints for notes, folders, tags, and authentication.</p>
      </div>
      <footer style="margin-top: 3rem; font-size: 0.9rem; color: #888;">
        <p>Made with ❤️ Tharuksha</p>
      </footer>
    </body>
    </html>
  `);
});



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
