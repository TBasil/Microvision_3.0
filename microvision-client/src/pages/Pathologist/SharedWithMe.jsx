import React from "react";

const SharedWithMe = () => {
  const sharedSlides = [
    {
      id: 1,
      title: "Kidney Biopsy - Case X",
      from: "Dr. Anjali Verma",
      date: "2025-05-23",
    },
    {
      id: 2,
      title: "Liver Tissue Sample",
      from: "Dr. Ramesh Nair",
      date: "2025-05-21",
    },
    {
      id: 3,
      title: "Melanoma Study",
      from: "Dr. Sunita Rao",
      date: "2025-05-19",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Slides Shared With Me</h1>

      <div className="bg-white rounded-2xl shadow border p-6">
        <ul className="space-y-4">
          {sharedSlides.map((slide) => (
            <li
              key={slide.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{slide.title}</p>
                <p className="text-sm text-gray-500">
                  Shared by {slide.from} on {slide.date}
                </p>
              </div>
              <button className="text-blue-600 text-sm hover:underline">
                View Slide
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SharedWithMe;
