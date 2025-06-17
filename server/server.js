const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// ✅ Check if .env is being loaded
console.log("📦 DATABASE_URL:", process.env.DATABASE_URL);

const app = express();
const PORT = process.env.PORT || 5000;

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
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); // ADD THIS LINE

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // ADD THIS LINE

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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});