import React from 'react';

const slides = [
  {
    id: 1,
    title: 'Lung Biopsy - Malignant',
    uploadedBy: 'Dr. Ayesha Khan',
    date: '2025-05-20',
    status: 'Approved',
  },
  {
    id: 2,
    title: 'Skin Lesion Sample',
    uploadedBy: 'Dr. Imran Ali',
    date: '2025-05-19',
    status: 'Pending Review',
  },
  {
    id: 3,
    title: 'Breast Cancer Tissue',
    uploadedBy: 'Dr. Maria Zain',
    date: '2025-05-18',
    status: 'Flagged',
  },
];

export default function Slides() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Uploaded Slides</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Uploaded By</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((slide) => (
              <tr key={slide.id} className="border-t">
                <td className="py-3 px-4">{slide.title}</td>
                <td className="py-3 px-4">{slide.uploadedBy}</td>
                <td className="py-3 px-4">{slide.date}</td>
                <td className="py-3 px-4">{slide.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
