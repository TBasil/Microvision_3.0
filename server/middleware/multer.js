// server/middleware/multer.js
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // stores image in memory buffer

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb("Only .jpeg, .jpg, and .png files are allowed");
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
