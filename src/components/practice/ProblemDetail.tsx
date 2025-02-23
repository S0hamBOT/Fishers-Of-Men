// import React, { useState, useEffect } from "react";
// import { ArrowLeft, ExternalLink } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import { useAuth } from "../../contexts/AuthContext";
// import { saveProblemNotes, getUserData } from "../../lib/firebase";
// import { problemData } from "../../data/problems";

// interface Problem {
//   title: string;
//   difficulty: string;
//   category: string;
//   description?: string;
//   examples?: { input: string; output: string; explanation?: string }[];
// }

// interface ProblemDetailProps {
//   problemId: string;
//   onBack: () => void;
// }

// const difficultyColors: Record<string, string> = {
//   Easy: "text-green-600",
//   Medium: "text-yellow-600",
//   Hard: "text-red-600",
// };

// export function ProblemDetail({ problemId, onBack }: ProblemDetailProps) {
//   const [notes, setNotes] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
//   const { user } = useAuth();
//   const problem: Problem | undefined =
//     problemData[problemId as keyof typeof problemData];

//   useEffect(() => {
//     async function loadNotes() {
//       if (user) {
//         try {
//           const userData = await getUserData(user.uid);
//           if (userData?.problemNotes?.[problemId]) {
//             setNotes(userData.problemNotes[problemId].notes);
//           }
//         } catch (err) {
//           console.error("Error loading notes:", err);
//           setError("Failed to load notes");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     }
//     loadNotes();
//   }, [problemId, user]);

//   let saveTimeout: NodeJS.Timeout;
//   const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const newNotes = e.target.value;
//     setNotes(newNotes);
//     setIsSaving(true);
//     setError("");

//     clearTimeout(saveTimeout);
//     saveTimeout = setTimeout(async () => {
//       try {
//         if (user) await saveProblemNotes(user.uid, problemId, newNotes);
//       } catch (err) {
//         console.error("Failed to save notes:", err);
//         setError("Failed to save notes");
//       } finally {
//         setIsSaving(false);
//       }
//     }, 1000);
//   };

//   if (!problem) {
//     return (
//       <div className="flex-1 bg-white p-8">
//         <button
//           onClick={onBack}
//           className="text-indigo-600 hover:text-indigo-700"
//         >
//           ← Back to Problems
//         </button>
//         <div className="mt-8 text-red-600">Problem not found.</div>
//       </div>
//     );
//   }

//   const difficultyColor =
//     difficultyColors[problem.difficulty] || "text-gray-600";
//   const hasDescription = "description" in problem;
//   const hasExamples = "examples" in problem;

//   return (
//     <div className="flex-1 bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={onBack}
//           className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
//           aria-label="Back to problems"
//         >
//           <ArrowLeft className="h-4 w-4 mr-1" />
//           Back to Problems
//         </button>

//         <div className="grid grid-cols-[2fr_1fr] gap-8">
//           <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {problem.title}
//                 </h1>
//                 <div className="mt-1">
//                   <span className={`font-medium ${difficultyColor}`}>
//                     {problem.difficulty}
//                   </span>
//                   <span className="mx-2">·</span>
//                   <span className="text-gray-500">{problem.category}</span>
//                 </div>
//               </div>
//               <a
//                 href={`https://leetcode.com/problems/${problemId}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-indigo-600 hover:text-indigo-700 inline-flex items-center"
//                 aria-label="View on LeetCode"
//               >
//                 View on LeetCode
//                 <ExternalLink className="h-4 w-4 ml-1" />
//               </a>
//             </div>

//             {hasDescription && (
//               <div className="prose max-w-none">
//                 <ReactMarkdown>{problem.description}</ReactMarkdown>
//               </div>
//             )}

//             {hasExamples && <h3>Examples</h3>}
//             {hasExamples &&
//               problem.examples!.map((example, index) => (
//                 <div key={index} className="bg-yellow-50 p-4 rounded-md mb-4">
//                   <pre className="text-sm">
//                     <strong>Input:</strong> {example.input}
//                     <br />
//                     <strong>Output:</strong> {example.output}
//                     {example.explanation && (
//                       <>
//                         <br />
//                         <strong>Explanation:</strong> {example.explanation}
//                       </>
//                     )}
//                   </pre>
//                 </div>
//               ))}
//           </div>

//           <div className="bg-gray-50 rounded-lg p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
//             <textarea
//               value={notes}
//               onChange={handleNotesChange}
//               placeholder="Write your notes here..."
//               className="w-full h-[calc(100vh-300px)] p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//             {isSaving && <p className="text-gray-500 mt-2">Saving...</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../contexts/AuthContext";
import {
  saveProblemNotes,
  getUserData,
  saveProblemProgress,
} from "../../lib/firebase"; // Import saveProblemProgress
import { problemData } from "../../data/problems";

interface Problem {
  title: string;
  difficulty: string;
  category: string;
  description?: string;
  examples?: { input: string; output: string; explanation?: string }[];
}

interface ProblemDetailProps {
  problemId: string;
  onBack: () => void;
}

const difficultyColors: Record<string, string> = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
};

export function ProblemDetail({ problemId, onBack }: ProblemDetailProps) {
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSolved, setIsSolved] = useState(false); // New state for solved status
  const [startTime, setStartTime] = useState<number | null>(null); // New state for start time
  const { user } = useAuth();
  const problem = problemData[problemId as keyof typeof problemData];

  useEffect(() => {
    async function loadNotes() {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData?.problemNotes?.[problemId]) {
          setNotes(userData.problemNotes[problemId].notes);
        }
        if (userData?.problemProgress?.[problemId]?.completed) {
          setIsSolved(true); // Set solved status if already completed
        }
      }
    }
    loadNotes();
    setStartTime(Date.now()); // Record start time when component mounts
  }, [problemId, user]);

  const handleNotesChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    setIsSaving(true);

    try {
      if (user) {
        await saveProblemNotes(user.uid, problemId, newNotes);
      }
    } catch (error) {
      console.error("Failed to save notes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSolveClick = async () => {
    if (user) {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - (startTime || endTime)) / 1000); // Time spent in seconds
      try {
        await saveProblemProgress(user.uid, problemId, true, timeSpent); // Update problem progress
        setIsSolved(true);
      } catch (error) {
        console.error("Failed to mark problem as solved:", error);
      }
    }
  };

  if (!problem) {
    return (
      <div className="flex-1 bg-white p-8">
        <button
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Problems
        </button>
        <div className="mt-8">Problem not found.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Problems
        </button>

        <div className="grid grid-cols-2 gap-8">
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {problem.title}
                </h1>
                <div className="mt-1">
                  <span
                    className={`font-medium ${
                      difficultyColors[problem.difficulty]
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="mx-2">·</span>
                  <span className="text-gray-500">{problem.category}</span>
                </div>
              </div>
              <a
                href={`https://leetcode.com/problems/${problemId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 inline-flex items-center"
              >
                View on LeetCode
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="prose max-w-none">
              <ReactMarkdown>{problem.description}</ReactMarkdown>

              <h3>Examples</h3>
              {problem.examples &&
                Array.isArray(problem.examples) &&
                problem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                    <pre className="text-sm">
                      <strong>Input:</strong> {example.input}
                      <br />
                      <strong>Output:</strong> {example.output}
                      {example.explanation && (
                        <>
                          <br />
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                ))}
            </div>
            {!isSolved && (
              <button
                onClick={handleSolveClick}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Mark as Solved
              </button>
            )}
            {isSolved && (
              <p className="mt-4 text-green-600 font-semibold">
                Problem Solved!
              </p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              {isSaving && (
                <span className="text-sm text-gray-500">Saving...</span>
              )}
            </div>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Write your notes here..."
              className="w-full h-[calc(100vh-300px)] p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
