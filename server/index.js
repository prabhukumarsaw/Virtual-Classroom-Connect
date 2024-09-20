const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/V1/authRoutes');
const userRoutes = require('./routes/V1/userRoutes');
const roomRoutes = require('./routes/V1/roomRoutes');
const errorHandler = require('./utils/errorHandler');
const colors = require('colors'); // For colorful console messages

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

const allowedOrigins = ['http://localhost:5173', ''];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // If you need to handle cookies or authentication
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Connect to the database
connectDB();

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// User routes
app.use('/api/V1', authRoutes);
app.use('/api/V1', userRoutes);
app.use('/api/V1', roomRoutes);

// Global error handler
app.use(errorHandler);

// Route to check if the server is running
app.get('/', (req, res) => {
  const message = `
    🚀 Server is up and running!<br>
    🌐 Port: ${PORT}<br>
    🔧 Environment: ${ENVIRONMENT}<br>
    📅 Started on: ${new Date().toLocaleString()}
  `;
  res.status(200).send(`<pre style="font-family:monospace">${message}</pre>`);
});

// Start the server
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log('='.repeat(50).green);
  console.log(`
  🚀 Server is up and running!
  🌐 Port: ${PORT}
  🔧 Environment: ${ENVIRONMENT}
  📅 Started on: ${new Date().toLocaleString()}
  `.bold.green);
  console.log('='.repeat(50).green);
});
