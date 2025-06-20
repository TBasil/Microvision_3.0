// server/routes/predict.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const router = express.Router();

// ✅ Ensure 'uploads' directory exists and is valid
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
} else {
  const stat = fs.statSync(uploadDir);
  if (!stat.isDirectory()) {
    throw new Error(`Upload path ${uploadDir} exists but is not a directory`);
  }
}

// ✅ Multer setup: Store uploaded files in 'uploads/' directory
const upload = multer({ dest: uploadDir });

// @route   POST /api/predict
// @desc    Upload slide image to Flask model server
router.post('/', upload.single('slide'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Create form data for Flask
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));

    // Send image to Flask model server
    const flaskResponse = await axios.post('http://localhost:8000/predict', formData, {
      headers: formData.getHeaders()
    });

    // Clean up uploaded image file
    fs.unlinkSync(filePath);

    // Send result back to frontend
    res.json({ success: true, prediction: flaskResponse.data });
  } catch (err) {
    console.error('❌ Prediction error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to get prediction' });
  }
});

module.exports = router;
