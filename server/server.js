const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app = express(); // ✅ Must be declared before using routes
const PORT = process.env.PORT || 5000;

// ✅ Check if .env is being loaded
console.log("\ud83d\udce6 DATABASE_URL:", process.env.DATABASE_URL);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('\u274c Error connecting to database:', err.message);
  } else {
    console.log('\u2705 Database connected successfully');
    release();
  }
});

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const blogRoutes = require('./routes/blog');
const predictRoute = require('./routes/predict'); // ✅ AI prediction route

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/predict', predictRoute); // ✅ Connected below app declaration

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'MicroVision Pathology API Server Running',
    status: 'Connected',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: 'Connected',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\ud83d\ude80 Server running on http://localhost:${PORT}`);
  console.log(`\ud83d\udec1 API endpoints available at http://localhost:${PORT}/api`);
});
