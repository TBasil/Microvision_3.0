const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const { Readable } = require('stream');

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

// Secure route for creating blogs
router.post('/', authenticateToken, requirePathologist, createBlog);

// ✅ NEW: Route for uploading image to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No image file provided' });

    const bufferStream = Readable.from(req.file.buffer);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'microvision_blogs', resource_type: 'image' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferStream.pipe(stream);
    });

    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);
    res.status(500).json({ success: false, message: 'Cloudinary upload failed' });
  }
});

module.exports = router;
