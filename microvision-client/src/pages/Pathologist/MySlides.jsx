import React from "react";

const MySlides = () => {
  const slides = [
    {
      id: 1,
      title: "Lung Biopsy - Case A",
      date: "2025-05-20",
      collection: "Lung Cases",
    },
    {
      id: 2,
      title: "Skin Lesion - Patient B",
      date: "2025-05-18",
      collection: "Skin Lesions",
    },
    {
      id: 3,
      title: "Brain Tumor Sample",
      date: "2025-05-15",
      collection: "Brain Samples",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Uploaded Slides</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white border rounded-2xl shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{slide.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                Collection: <span className="font-medium">{slide.collection}</span>
              </p>
              <p className="text-sm text-gray-500">Uploaded on {slide.date}</p>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 text-sm hover:underline">
                View Slide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySlides;
