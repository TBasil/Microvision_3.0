import React, { useState } from "react";
import axios from "axios";

const BlogUpload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Placeholder image logic
      let image_url = null;
      if (image) {
        // NOTE: This does NOT upload anywhere. It just simulates a preview URL.
        image_url = URL.createObjectURL(image);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to post a blog.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        {
          title,
          content,
          image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Blog published successfully!");
      console.log(response.data);

      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("❌ Error uploading blog:", error.response?.data || error.message);
      alert("Blog upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Publish a New Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-2xl border"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg h-40 focus:outline-none focus:ring focus:ring-blue-200"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Image (optional)</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogUpload;
