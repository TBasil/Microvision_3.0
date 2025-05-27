import React from "react";

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "Advancements in Digital Pathology",
      author: "Dr. Anjali Verma",
      summary:
        "Exploring how digital pathology is revolutionizing diagnosis and research workflows.",
      date: "2025-05-24",
    },
    {
      id: 2,
      title: "AI in Histopathological Analysis",
      author: "Dr. Ramesh Nair",
      summary:
        "Discussing the role of machine learning in improving slide analysis accuracy.",
      date: "2025-05-22",
    },
    {
      id: 3,
      title: "Best Practices for Slide Annotation",
      author: "Dr. Sunita Rao",
      summary:
        "Tips and standards for ensuring high-quality, collaborative slide annotations.",
      date: "2025-05-20",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Published Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border rounded-2xl shadow p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                by {blog.author} on {blog.date}
              </p>
              <p className="text-sm text-gray-700">{blog.summary}</p>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 text-sm hover:underline">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
