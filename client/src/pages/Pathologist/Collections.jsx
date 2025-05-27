import React from "react";

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "Lung Cases",
      slideCount: 12,
    },
    {
      id: 2,
      name: "Skin Lesions",
      slideCount: 8,
    },
    {
      id: 3,
      name: "Brain Samples",
      slideCount: 5,
    },
    {
      id: 4,
      name: "Miscellaneous",
      slideCount: 3,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Collections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-white border rounded-2xl shadow p-5"
          >
            <h2 className="text-lg font-semibold mb-2">{collection.name}</h2>
            <p className="text-sm text-gray-600">
              {collection.slideCount} slides
            </p>
            <div className="mt-4">
              <button className="text-blue-600 text-sm hover:underline">
                View Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
