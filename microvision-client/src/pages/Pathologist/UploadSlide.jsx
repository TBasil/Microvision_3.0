// microvision-client/src/pages/Pathologist/UploadSlide.jsx
import React, { useState } from "react";
import axios from "axios";

const UploadSlide = () => {
  const [slideName, setSlideName] = useState("");
  const [collection, setCollection] = useState("");
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slideName || !collection || !file) {
      return alert("Please fill all fields and select a file.");
    }

    alert("✅ Slide uploaded (simulated, future database feature)!");
  };

  const handlePredict = async () => {
    if (!file) return alert("Please select an image first.");
    setLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append("slide", file);

      const res = await axios.post("http://localhost:5000/api/predict", formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error("❌ Prediction failed:", err);
      alert("Failed to get prediction from AI.");
    } finally {
      setLoading(false);
    }
  };

  const collections = ["Lung Cases", "Skin Lesions", "Brain Samples", "Others"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload New Slide</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md max-w-xl border">
        {/* Slide Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Slide Name</label>
          <input
            type="text"
            value={slideName}
            onChange={(e) => setSlideName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Upload Slide Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Slide Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            accept="image/*"
          />
          <p className="text-xs text-gray-500 mt-1">Note: Image will be resized automatically if needed</p>
        </div>

        {/* Collection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Choose Collection</label>
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">-- Select --</option>
            {collections.map((col, index) => (
              <option key={index} value={col}>{col}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload Slide
          </button>
          <button
            type="button"
            onClick={handlePredict}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict with AI"}
          </button>
        </div>
      </form>

      {/* Prediction Output */}
      {prediction && (
        <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Prediction Result</h2>
          <p><strong>Class:</strong> {prediction.predicted_class}</p>
          <p><strong>Confidence:</strong> {prediction.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default UploadSlide;
