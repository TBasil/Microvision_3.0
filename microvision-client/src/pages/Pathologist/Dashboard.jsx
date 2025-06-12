import React from "react";

const Dashboard = () => {
  const recentUploads = [
    {
      id: 1,
      name: "Lung Biopsy - Case A",
      date: "2025-05-25",
    },
    {
      id: 2,
      name: "Skin Lesion - Patient B",
      date: "2025-05-24",
    },
    {
      id: 3,
      name: "Brain Tumor Sample",
      date: "2025-05-22",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Dr. Pathologist 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-lg font-semibold mb-2">Total Slides Uploaded</h2>
          <p className="text-3xl font-bold text-blue-600">36</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border">
        <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>
        <ul className="space-y-3">
          {recentUploads.map((slide) => (
            <li
              key={slide.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{slide.name}</p>
                <p className="text-sm text-gray-500">Uploaded on {slide.date}</p>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
