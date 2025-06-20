const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "disnrzwtf",
  api_key: "639254171713659",
  api_secret: "uXyif8qiJE-wZRl4lB2bwP_R5Ro",
  secure: true,
});

module.exports = cloudinary;
