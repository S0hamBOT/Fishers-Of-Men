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
  FaLaptopCode,
  FaProjectDiagram,
  FaNewspaper,
  FaQuestionCircle,
} from "react-icons/fa";

export function Resources() {
  const resources = [
    {
      title: "Coding Practice",
      icon: <FaCode className="text-blue-500 text-2xl" />,
      links: [{ name: "LeetCode", url: "https://leetcode.com" }],
    },
    {
      title: "Visualization",
      icon: <FaChartLine className="text-green-500 text-2xl" />,
      links: [{ name: "Visual Go", url: "https://visualgo.net" }],
    },
    {
      title: "Tutorials",
      icon: <FaBook className="text-purple-500 text-2xl" />,
      links: [
        { name: "W3Schools", url: "https://w3schools.com" },
        { name: "GeeksForGeeks", url: "https://geeksforgeeks.org" },
      ],
    },
    {
      title: "AI Tools",
      icon: <FaBrain className="text-red-500 text-2xl" />,
      subcategories: [
        {
          subtitle: "For Conceptual Understanding",
          links: [
            { name: "ChatGPT", url: "https://chat.com" },
            { name: "Gemini", url: "https://gemini.google.com" },
            { name: "Claude", url: "https://claude.ai" },
          ],
        },
        {
          subtitle: "Coding Assistance",
          links: [{ name: "Blackbox", url: "https://blackbox.ai" }],
        },
      ],
    },
    {
      title: "Full-Fledged Projects",
      icon: <FaProjectDiagram className="text-indigo-500 text-2xl" />,
      links: [{ name: "Bolt", url: "https://bolt.new" }],
    },
    {
      title: "Stay Updated",
      icon: <FaNewspaper className="text-yellow-500 text-2xl" />,
      links: [
        { name: "Medium", url: "https://medium.com" },
        { name: "Dev.to", url: "https://dev.to" },
        { name: "Quora", url: "https://quora.com" },
      ],
    },
    {
      title: "Doubt-Solving (For the OGs)",
      icon: <FaQuestionCircle className="text-orange-500 text-2xl" />,
      links: [{ name: "Stack Overflow", url: "https://stackoverflow.com" }],
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <FaBook className="text-blue-500" /> Learning Resources
      </h1>

      {/* Resource Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-4">
              {resource.icon}
              <h2 className="text-xl font-semibold text-gray-800">
                {resource.title}
              </h2>
            </div>
            {resource.links && (
              <ul className="space-y-2">
                {resource.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {resource.subcategories &&
              resource.subcategories.map((sub, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-medium text-gray-700">{sub.subtitle}:</h3>
                  <ul className="ml-4 space-y-1 text-gray-700">
                    {sub.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
