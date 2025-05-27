import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Pathologists</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">54</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">5</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Slides</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">182</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
        <ul className="bg-white shadow rounded-lg divide-y">
          <li className="p-4">Dr. Smith uploaded a slide to "Lung Cancer"</li>
          <li className="p-4">Dr. Ayesha registered and is pending approval</li>
          <li className="p-4">Dr. John shared a slide with Dr. Maria</li>
        </ul>
      </div>
    </div>
  );
}
