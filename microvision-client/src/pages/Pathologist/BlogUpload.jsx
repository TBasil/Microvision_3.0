import React, { useState } from "react";

const BlogUpload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, image });
    alert("Blog published (simulated)!");
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default BlogUpload;
