import React, { useState } from "react";

const UploadSlide = () => {
  const [slideName, setSlideName] = useState("");
  const [collection, setCollection] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ slideName, collection, file });
    alert("Slide uploaded (simulated)!");
  };

  const collections = ["Lung Cases", "Skin Lesions", "Brain Samples", "Others"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload New Slide</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-xl border"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Slide Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={slideName}
            onChange={(e) => setSlideName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select File</label>
          <input
            type="file"
            className="w-full"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Choose Collection
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            required
          >
            <option value="">-- Select Collection --</option>
            {collections.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Upload Slide
        </button>
      </form>
    </div>
  );
};

export default UploadSlide;
