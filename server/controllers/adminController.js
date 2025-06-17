// server/controllers/adminController.js
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get dashboard stats (counts)
const getDashboardStats = async (req, res) => {
  try {
    // Get total approved pathologists
    const totalResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE role = $1 AND status = $2',
      ['pathologist', 'approved']
    );

    // Get pending pathologists
    const pendingResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE role = $1 AND status = $2',
      ['pathologist', 'pending']
    );

    // Get rejected pathologists (optional)
    const rejectedResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE role = $1 AND status = $2',
      ['pathologist', 'rejected']
    );

    res.json({
      success: true,
      data: {
        totalApproved: parseInt(totalResult.rows[0].count),
        pending: parseInt(pendingResult.rows[0].count),
        rejected: parseInt(rejectedResult.rows[0].count)
      }
    });

  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard statistics'
    });
  }
};

// Get all approved pathologists
const getApprovedPathologists = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, full_name, hospital_institution, license_number, 
              specialization, status, created_at 
       FROM users 
       WHERE role = $1 AND status = $2 
       ORDER BY created_at DESC`,
      ['pathologist', 'approved']
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error getting approved pathologists:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch approved pathologists'
    });
  }
};

// Get all pending pathologists
const getPendingPathologists = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, full_name, hospital_institution, license_number, 
              specialization, status, created_at 
       FROM users 
       WHERE role = $1 AND status = $2 
       ORDER BY created_at DESC`,
      ['pathologist', 'pending']
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error getting pending pathologists:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending pathologists'
    });
  }
};

// Get single pathologist details
const getPathologistDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, email, full_name, hospital_institution, license_number, 
              specialization, status, created_at, updated_at
       FROM users 
       WHERE id = $1 AND role = $2`,
      [id, 'pathologist']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pathologist not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error getting pathologist details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pathologist details'
    });
  }
};

// Update pathologist status (approve/reject)
const updatePathologistStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be approved, rejected, or pending'
      });
    }

    // Update the pathologist status
    const result = await pool.query(
      `UPDATE users 
       SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 AND role = $3 
       RETURNING id, email, full_name, status`,
      [status, id, 'pathologist']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pathologist not found'
      });
    }

    res.json({
      success: true,
      message: `Pathologist ${status} successfully`,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating pathologist status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update pathologist status'
    });
  }
};

module.exports = {
  getDashboardStats,
  getApprovedPathologists,
  getPendingPathologists,
  getPathologistDetails,
  updatePathologistStatus
};