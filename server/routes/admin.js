const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth'); // FIXED
const {
  getDashboardStats,
  getApprovedPathologists,
  getPendingPathologists,
  getPathologistDetails,
  updatePathologistStatus
} = require('../controllers/adminController');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  next();
};

// Apply authentication to all admin routes
router.use(authenticateToken); // FIXED
router.use(requireAdmin);

// GET /api/admin/dashboard/stats - Get dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

// GET /api/admin/pathologists/approved - Get all approved pathologists
router.get('/pathologists/approved', getApprovedPathologists);

// GET /api/admin/pathologists/pending - Get all pending pathologists
router.get('/pathologists/pending', getPendingPathologists);

// GET /api/admin/pathologists/:id - Get single pathologist details
router.get('/pathologists/:id', getPathologistDetails);

// PUT /api/admin/pathologists/:id/status - Update pathologist status
router.put('/pathologists/:id/status', updatePathologistStatus);

module.exports = router;