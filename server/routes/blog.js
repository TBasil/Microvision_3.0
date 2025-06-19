const express = require('express');
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById
} = require('../controllers/blogController');

const {
  authenticateToken,
  requirePathologist
} = require('../middleware/auth');

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Pathologist-protected route
router.post('/', authenticateToken, requirePathologist, createBlog);

module.exports = router;
