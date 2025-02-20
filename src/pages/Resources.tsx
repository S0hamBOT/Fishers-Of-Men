// import React from 'react';
// import { Video, FileText, Headphones } from 'lucide-react';

// const resources = [
//   {
//     id: '1',
//     title: 'React Hooks Deep Dive',
//     description: 'Master React Hooks with this comprehensive video tutorial',
//     type: 'video',
//     tags: ['React', 'Hooks'],
//     completed: false,
//   },
//   {
//     id: '2',
//     title: 'TypeScript Best Practices',
//     description: 'Learn TypeScript best practices and advanced patterns',
//     type: 'article',
//     tags: ['TypeScript', 'Best Practices'],
//     completed: true,
//   },
//   {
//     id: '3',
//     title: 'Modern JavaScript Development',
//     description: 'Stay up to date with modern JavaScript features and practices',
//     type: 'podcast',
//     tags: ['JavaScript', 'ES6+'],
//     completed: false,
//   },
// ];

// const typeIcons = {
//   video: Video,
//   article: FileText,
//   podcast: Headphones,
// };

// export function Resources() {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-8">Learning Resources</h1>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {resources.map((resource) => {
//           const Icon = typeIcons[resource.type as keyof typeof typeIcons];
//           return (
//             <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <Icon className="h-6 w-6 text-indigo-600" />
//                 <h2 className="ml-2 text-lg font-medium text-gray-900">{resource.title}</h2>
//               </div>
//               <p className="text-gray-600 mb-4">{resource.description}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {resource.tags.map((tag) => (
//                   <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className={`text-sm ${resource.completed ? 'text-green-600' : 'text-gray-500'}`}>
//                   {resource.completed ? 'Completed' : 'Not started'}
//                 </span>
//                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
//                   {resource.completed ? 'Review' : 'Start Learning'}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import React from "react";
import {
  FaCode,
  FaChartLine,
  FaBook,
  FaBrain,
  FaProjectDiagram,
  FaNewspaper,
} from "react-icons/fa";

export function Resources() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen rounded-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <FaBook className="text-blue-500" /> Learning Resources
      </h1>
      <div className="mt-6 space-y-6 text-gray-800">
        {/* Coding Practice */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCode className="text-blue-500" /> For Coding Practice:
          </h2>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-6 block"
          >
            leetcode.com
          </a>
        </div>

        {/* Visualization */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaChartLine className="text-green-500" /> For Visualization:
          </h2>
          <a
            href="https://visualgo.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-6 block"
          >
            visualgo.net
          </a>
        </div>

        {/* Tutorials */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaBook className="text-purple-500" /> For Tutorials:
          </h2>
          <ul className="ml-6 space-y-2">
            <li>
              W3Schools:{" "}
              <a
                href="https://w3schools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                w3schools.com
              </a>
            </li>
            <li>
              GeekForGeeks:{" "}
              <a
                href="https://geeksforgeeks.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                geeksforgeeks.org
              </a>
            </li>
          </ul>
        </div>

        {/* AI Tools */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaBrain className="text-red-500" /> AI Tools:
          </h2>
          <div className="ml-6">
            <h3 className="font-semibold">For Conceptual Understanding:</h3>
            <ul className="ml-4 space-y-1 text-gray-700">
              <li>ChatGPT</li>
              <li>Gemini</li>
              <li>Claude</li>
            </ul>
            <h3 className="font-semibold mt-3">Coding:</h3>
            <ul className="ml-4 space-y-1 text-gray-700">
              <li>Blackbox.ai</li>
            </ul>
          </div>
        </div>

        {/* Full-Fledged Projects */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaProjectDiagram className="text-indigo-500" /> For Building
            Full-Fledged Projects:
          </h2>
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-6 block"
          >
            Bolt.new
          </a>
        </div>

        {/* Reading & Staying Updated */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaNewspaper className="text-yellow-500" /> Pages to Read or Stay
            Updated:
          </h2>
          <ul className="ml-6 space-y-1 text-gray-700">
            <li>Medium</li>
            <li>Dev.to</li>
            <li>Quora</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
