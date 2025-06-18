const { Pool } = require('pg');

// Use the same DB config as in server.js
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create a new blog post
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image_url = req.body.image_url || null; // Optional

  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const author_id = req.user.userId;
    const author_name = req.user.email; // Ideally, you'd pull from full_name in DB

    const insertQuery = `
      INSERT INTO blogs (title, content, image_url, author_id, author_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, title, content, image_url, author_id, author_name, created_at
    `;

    const values = [title, content, image_url, author_id, author_name];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: result.rows[0]
    });

  } catch (error) {
    console.error('❌ Error creating blog:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Fetch all blogs
const getAllBlogs = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, content, image_url, author_name, created_at FROM blogs ORDER BY created_at DESC'
    );
    res.json({ success: true, blogs: result.rows });
  } catch (error) {
    console.error('❌ Error fetching blogs:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs
};
