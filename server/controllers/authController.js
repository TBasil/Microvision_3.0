const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const jwt = require('../utils/jwt');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const login = async (req, res) => {
  console.log('🔍 Login attempt started');
  console.log('📨 Request body:', req.body);
  
  try {
    const { email, password } = req.body;
    
    console.log('📧 Email received:', email);
    console.log('🔑 Password received:', password ? 'Yes' : 'No');

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    console.log('🔄 Attempting database query...');
    
    // Find user by email
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    console.log('📊 SQL Query:', userQuery);
    console.log('📊 Query params:', [email]);
    
    const userResult = await pool.query(userQuery, [email]);
    console.log('📊 Query executed, rows found:', userResult.rows.length);

    if (userResult.rows.length === 0) {
      console.log('❌ User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = userResult.rows[0];
    console.log('👤 User found:', {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    });

    // Check if pathologist account is approved
    if (user.role === 'pathologist' && user.status !== 'approved') {
      console.log('⚠️ Pathologist account not approved, status:', user.status);
      return res.status(401).json({
        success: false,
        message: `Account is ${user.status}. Please contact administrator.`
      });
    }

    console.log('🔐 Comparing passwords...');
    console.log('🔐 Stored password:', user.hashed_password);
    
    // For development - check if it's plain text first, then try bcrypt
    let isValidPassword = false;
    
    // Check if stored password is plain text
    if (user.hashed_password === password) {
      console.log('🔐 Plain text password match: true');
      isValidPassword = true;
    } else {
      // Try bcrypt comparison
      console.log('🔐 Trying bcrypt comparison...');
      isValidPassword = await bcrypt.compare(password, user.hashed_password);
      console.log('🔐 Bcrypt comparison result:', isValidPassword);
    }

    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('🎟️ Generating JWT token...');
    
    // Generate JWT token
    const token = jwt.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    console.log('🎟️ Token generated successfully');

    // Prepare user data (exclude password)
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      hospital_institution: user.hospital_institution,
      specialization: user.specialization,
      status: user.status
    };

    console.log('✅ Login successful for user:', userData.email);
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('💥 LOGIN ERROR:', error);
    console.error('💥 Error message:', error.message);
    console.error('💥 Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const register = async (req, res) => {
  console.log('📝 Registration attempt started');
  console.log('📨 Request body:', req.body);
  
  try {
    const { email, password, full_name, hospital_institution, license_number, specialization } = req.body;
    
    console.log('📧 Registration email:', email);
    console.log('👤 Full name:', full_name);
    console.log('🏥 Hospital:', hospital_institution);
    console.log('📜 License:', license_number);
    console.log('🔬 Specialization:', specialization);

    // Validate required fields
    if (!email || !password || !full_name || !hospital_institution || !license_number) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Email, password, full name, hospital/institution, and license number are required'
      });
    }

    // Validate password length
    if (password.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Validate email format (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    console.log('🔄 Checking if email already exists...');
    
    // Check if email already exists
    const existingUserQuery = 'SELECT id FROM users WHERE email = $1';
    const existingUserResult = await pool.query(existingUserQuery, [email]);
    
    if (existingUserResult.rows.length > 0) {
      console.log('❌ Email already exists');
      return res.status(400).json({
        success: false,
        message: 'Email address is already registered'
      });
    }

    console.log('✅ Email is available');
    console.log('💾 Creating new pathologist account...');
    
    // For development - store plain text password (will be hashed in production)
    const hashedPassword = password; // For now, keeping it simple
    
    // Insert new pathologist
    const insertQuery = `
      INSERT INTO users (email, hashed_password, role, full_name, hospital_institution, license_number, specialization, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, email, role, full_name, hospital_institution, license_number, specialization, status, created_at
    `;
    
    const insertValues = [
      email,
      hashedPassword,
      'pathologist',
      full_name,
      hospital_institution,
      license_number,
      specialization || null,
      'pending'
    ];
    
    console.log('📊 Insert query:', insertQuery);
    console.log('📊 Insert values:', insertValues);
    
    const insertResult = await pool.query(insertQuery, insertValues);
    const newUser = insertResult.rows[0];
    
    console.log('✅ New pathologist registered:', {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    });

    // Prepare response data (exclude password)
    const userData = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      full_name: newUser.full_name,
      hospital_institution: newUser.hospital_institution,
      license_number: newUser.license_number,
      specialization: newUser.specialization,
      status: newUser.status,
      created_at: newUser.created_at
    };
    
    res.status(201).json({
      success: true,
      message: 'Registration successful! Your account is pending approval from the administrator.',
      user: userData
    });

  } catch (error) {
    console.error('💥 REGISTRATION ERROR:', error);
    console.error('💥 Error message:', error.message);
    console.error('💥 Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
};

module.exports = {
  login,
  register
};