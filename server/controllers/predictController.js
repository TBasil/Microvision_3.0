// server/controllers/predictController.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const predictSlide = async (req, res) => {
  try {
    // Check for file
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    // Prepare form data to send to Flask
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    // Send to Flask model server
    const flaskResponse = await axios.post('http://localhost:5001/predict', formData, {
      headers: formData.getHeaders(),
    });

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    return res.json({
      success: true,
      prediction: flaskResponse.data.prediction,
    });

  } catch (err) {
    console.error('Prediction error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to predict slide' });
  }
};

module.exports = {
  predictSlide,
};
