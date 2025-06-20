// microvision-client/src/pages/Pathologist/BlogUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogUpload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";

    try {
      // 1. Upload image to backend (then backend to Cloudinary)
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imgRes = await axios.post("http://localhost:5000/api/blogs/upload-image", formData);
        imageUrl = imgRes.data.url;
      }

      // 2. Submit blog post
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/blogs",
        { title, content, image_url: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Blog published successfully!");
      navigate("/blog");
    } catch (err) {
      console.error("❌ Error publishing blog:", err);
      alert("Failed to publish blog");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Write a New Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Content</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <p className="text-xs text-gray-500 mt-1">Image will be resized to max 800px wide</p>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full max-h-64 object-contain border rounded-md"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {uploading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogUpload;
