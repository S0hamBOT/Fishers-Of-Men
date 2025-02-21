// import React from "react";
// import { MessageSquare, ThumbsUp } from "lucide-react";

// const posts = [
//   {
//     id: "1",
//     title: "Help with React useEffect",
//     content:
//       "I'm having trouble understanding the dependency array in useEffect. Can someone explain?",
//     author: "Sarah Johnson",
//     likes: 5,
//     comments: 3,
//     timestamp: new Date("2024-02-20T10:00:00"),
//   },
//   {
//     id: "2",
//     title: "TypeScript Generic Tips",
//     content:
//       "Here are some tips for working with TypeScript generics that I've learned...",
//     author: "Mike Chen",
//     likes: 12,
//     comments: 7,
//     timestamp: new Date("2024-02-19T15:30:00"),
//   },
// ];

// export function Community() {
//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Community Discussion
//         </h1>
//         <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
//           New Post
//         </button>
//       </div>
//       <div className="space-y-6">
//         {posts.map((post) => (
//           <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-medium text-gray-900 mb-2">
//               {post.title}
//             </h2>
//             <p className="text-gray-600 mb-4">{post.content}</p>
//             <div className="flex items-center justify-between text-sm text-gray-500">
//               <div className="flex items-center space-x-4">
//                 <span>{post.author}</span>
//                 <span>{new Date(post.timestamp).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
//                   <ThumbsUp className="h-4 w-4" />
//                   <span>{post.likes}</span>
//                 </button>
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
//                   <MessageSquare className="h-4 w-4" />
//                   <span>{post.comments}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";

export function Community() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "You" }]); // Simplified sender
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Chat Room</h1>
      <div
        ref={chatContainerRef}
        className="h-64 border rounded p-2 overflow-y-auto mb-4"
      >
        {messages.map((message, index) => (
          <div key={index} className="mb-1">
            <span className="font-semibold">{message.sender}:</span>{" "}
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded p-2 mr-2"
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white rounded p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
