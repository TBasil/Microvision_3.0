import React, { useState } from "react";

const Messages = () => {
  const [selectedThread, setSelectedThread] = useState(null);

  const messageThreads = [
    {
      id: 1,
      name: "Dr. Anjali Verma",
      lastMessage: "Please review the slide I sent.",
      date: "2025-05-26",
      messages: [
        { from: "them", text: "Please review the slide I sent." },
        { from: "me", text: "Sure, I will check it today." },
      ],
    },
    {
      id: 2,
      name: "Dr. Ramesh Nair",
      lastMessage: "Thanks for your feedback!",
      date: "2025-05-25",
      messages: [
        { from: "me", text: "The annotation looks great." },
        { from: "them", text: "Thanks for your feedback!" },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Threads List */}
        <div className="w-full md:w-1/3 bg-white border rounded-2xl shadow p-4">
          <input
            type="text"
            placeholder="Search pathologists..."
            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <ul className="space-y-3">
            {messageThreads.map((thread) => (
              <li
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedThread?.id === thread.id ? "bg-blue-50" : ""
                }`}
              >
                <p className="font-medium">{thread.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {thread.lastMessage}
                </p>
                <p className="text-xs text-gray-400">{thread.date}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Message View */}
        <div className="w-full md:w-2/3 bg-white border rounded-2xl shadow p-4">
          {selectedThread ? (
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">
                Chat with {selectedThread.name}
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {selectedThread.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-sm px-4 py-2 rounded-lg ${
                      msg.from === "me"
                        ? "bg-blue-100 self-end text-right"
                        : "bg-gray-100 self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a conversation to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
