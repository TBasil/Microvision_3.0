const express = require('express');
const router = express.Router();

const {
  createBlog,
  getAllBlogs
} = require('../controllers/blogController');

const {
  authenticateToken,
  requirePathologist
} = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all blogs (public)
router.get('/', getAllBlogs);

// @route   POST /api/blogs
// @desc    Create a new blog (only for authenticated pathologists)
router.post('/', authenticateToken, requirePathologist, createBlog);

module.exports = router;
