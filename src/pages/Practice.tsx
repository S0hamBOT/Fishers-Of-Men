// import { useState } from "react";
// import { Code2, Filter } from "lucide-react";
// import { ProblemList } from "../components/practice/ProblemList";
// import { ProblemDetail } from "../components/practice/ProblemDetail";

// const categories = [
//   { id: "all", name: "All" },
//   { id: "arrays", name: "Arrays" },
//   { id: "strings", name: "Strings" },
//   { id: "linked-lists", name: "Linked Lists" },
//   { id: "trees", name: "Trees" },
//   { id: "stacks", name: "Stacks" },
//   { id: "queues", name: "Queues" },
// ];

// export function Practice() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   if (selectedProblem) {
//     return (
//       <ProblemDetail
//         problemId={selectedProblem}
//         onBack={() => setSelectedProblem(null)}
//         problems={{}} // Pass an empty object
//       />
//     );
//   }

//   return (
//     <div className="flex-1 bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Practice Problems
//           </h1>
//           <p className="mt-1 text-gray-500">
//             Sharpen your coding skills with our curated problems
//           </p>
//         </div>

//         <div className="flex items-center justify-between mb-6">
//           <div className="relative flex-1 max-w-lg">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Code2 className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           {/* <button className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//             <Filter className="h-4 w-4 mr-2" />
//             Filters
//           </button> */}
//         </div>

//         <div className="grid grid-cols-4 gap-6">
//           <div className="col-span-1">
//             <nav className="space-y-1">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => setSelectedCategory(category.id)}
//                   className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
//                     selectedCategory === category.id
//                       ? "bg-indigo-50 text-indigo-600"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="col-span-3">
//             <ProblemList
//               category={selectedCategory}
//               searchQuery={searchQuery}
//               onProblemSelect={setSelectedProblem}
//               difficulty={""}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Code2, Filter } from "lucide-react";
import { ProblemList } from "../components/practice/ProblemList";
import { ProblemDetail } from "../components/practice/ProblemDetail";

const categories = [
  { id: "all", name: "All Problems" },
  { id: "arrays", name: "Arrays" },
  { id: "strings", name: "Strings" },
  { id: "linked-lists", name: "Linked Lists" },
  { id: "searching-sorting", name: "Searching & Sorting" },
  { id: "stacks", name: "Stacks" },
  { id: "queues", name: "Queues" },
  { id: "trees", name: "Trees" },
];

export function Practice() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (selectedProblem) {
    return (
      <ProblemDetail
        problemId={selectedProblem}
        onBack={() => setSelectedProblem(null)}
      />
    );
  }

  const getCategoryDisplayName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Practice Problems
          </h1>
          <p className="mt-1 text-gray-500">
            Sharpen your coding skills with our curated problems
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Code2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    selectedCategory === category.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="col-span-3">
            <ProblemList
              category={
                selectedCategory === "all"
                  ? "all"
                  : getCategoryDisplayName(selectedCategory)
              }
              searchQuery={searchQuery}
              onProblemSelect={setSelectedProblem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
