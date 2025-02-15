import React from 'react';
import { Video, FileText, Headphones } from 'lucide-react';

const resources = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    description: 'Master React Hooks with this comprehensive video tutorial',
    type: 'video',
    tags: ['React', 'Hooks'],
    completed: false,
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    description: 'Learn TypeScript best practices and advanced patterns',
    type: 'article',
    tags: ['TypeScript', 'Best Practices'],
    completed: true,
  },
  {
    id: '3',
    title: 'Modern JavaScript Development',
    description: 'Stay up to date with modern JavaScript features and practices',
    type: 'podcast',
    tags: ['JavaScript', 'ES6+'],
    completed: false,
  },
];

const typeIcons = {
  video: Video,
  article: FileText,
  podcast: Headphones,
};

export function Resources() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Learning Resources</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => {
          const Icon = typeIcons[resource.type as keyof typeof typeIcons];
          return (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Icon className="h-6 w-6 text-indigo-600" />
                <h2 className="ml-2 text-lg font-medium text-gray-900">{resource.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${resource.completed ? 'text-green-600' : 'text-gray-500'}`}>
                  {resource.completed ? 'Completed' : 'Not started'}
                </span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {resource.completed ? 'Review' : 'Start Learning'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}