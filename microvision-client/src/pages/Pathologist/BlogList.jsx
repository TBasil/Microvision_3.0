import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isPathologist = user?.role === "pathologist";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error.response?.data || error.message);
        alert("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Published Blogs
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Explore recent insights, trends and research in digital pathology by our expert contributors.
        </p>

        {isPathologist && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/blogs/upload")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ➕ Write Blog
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-2xl shadow-md transition duration-300 overflow-hidden"
              >
                {blog.image_url ? (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    by {blog.author_name || "Unknown"} |{" "}
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {blog.content.length > 150
                      ? blog.content.slice(0, 150) + "..."
                      : blog.content}
                  </p>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-blue-600 text-sm hover:underline mt-3 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
