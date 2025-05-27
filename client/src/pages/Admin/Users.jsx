import React from 'react';

const users = [
  {
    id: 1,
    name: 'Dr. Ayesha Khan',
    email: 'ayesha@example.com',
    status: 'Pending',
    medicalId: 'MED12345',
  },
  {
    id: 2,
    name: 'Dr. Imran Ali',
    email: 'imran@example.com',
    status: 'Approved',
    medicalId: 'MED67890',
  },
  {
    id: 3,
    name: 'Dr. Maria Zain',
    email: 'maria@example.com',
    status: 'Blocked',
    medicalId: 'MED11111',
  },
];

export default function Users() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Medical ID</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.medicalId}</td>
                <td className="py-3 px-4">{user.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
