import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (error) {
        console.error("❌ Error loading blog:", error.message);
        alert("Failed to load blog");
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center py-10 text-red-600">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl">
        {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{blog.title}</h1>
        <p className="text-gray-500 mb-6 text-sm">
          by {blog.author_name || "Unknown"} |{" "}
          {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>

        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
