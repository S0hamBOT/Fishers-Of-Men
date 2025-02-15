import React, { useState } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    questions: [
      {
        text: "What is JavaScript?",
        options: [
          "A scripting language",
          "A markup language",
          "A styling language",
          "A database language",
        ],
        correctAnswer: "A scripting language",
      },
      {
        text: "What is a closure in JavaScript?",
        options: [
          "A function inside a function",
          "A way to close a file",
          "A type of loop",
          "A method for error handling",
        ],
        correctAnswer: "A function inside a function",
      },
      {
        text: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "all of the above"],
        correctAnswer: "all of the above",
      },
      {
        text: "What does DOM stand for?",
        options: [
          "Document Object Model",
          "Data Object Model",
          "Design Object Model",
          "Display Object Model",
        ],
        correctAnswer: "Document Object Model",
      },
      {
        text: "What is the purpose of the `this` keyword in JavaScript?",
        options: [
          "Refers to the current function",
          "Refers to the object the function belongs to",
          "Refers to the global object",
          "It is not used",
        ],
        correctAnswer: "Refers to the object the function belongs to",
      },
      {
        text: "What is an event loop in JavaScript?",
        options: [
          "Handles asynchronous callbacks",
          "Manages function scope",
          "Optimizes code execution",
          "Handles errors",
        ],
        correctAnswer: "Handles asynchronous callbacks",
      },
      {
        text: "Which method is used to add elements to an array?",
        options: ["push()", "add()", "insert()", "append()"],
        correctAnswer: "push()",
      },
      {
        text: "What is JSON?",
        options: [
          "JavaScript Object Notation",
          "JavaScript Open Network",
          "Java Standard Output Node",
          "JavaScript Syntax Object",
        ],
        correctAnswer: "JavaScript Object Notation",
      },
      {
        text: "What does AJAX stand for?",
        options: [
          "Asynchronous JavaScript and XML",
          "Advanced JavaScript and XML",
          "Application JavaScript and XML",
          "Automated JavaScript and XML",
        ],
        correctAnswer: "Asynchronous JavaScript and XML",
      },
      {
        text: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "===", "=", "!="],
        correctAnswer: "===",
      },
    ],
  },
  {
    id: "2",
    title: "React Hooks",
    description: "Master React Hooks with this comprehensive quiz",
    questions: [
      {
        text: "What is useState used for?",
        options: [
          "Managing state in functional components",
          "Creating reusable components",
          "Handling side effects",
          "Routing",
        ],
        correctAnswer: "Managing state in functional components",
      },
      {
        text: "Which hook is used for side effects in React?",
        options: ["useEffect", "useLayoutEffect", "useCallback", "useMemo"],
        correctAnswer: "useEffect",
      },
      {
        text: "What is the purpose of useCallback?",
        options: [
          "Memoizing functions",
          "Memoizing values",
          "Managing state",
          "Handling refs",
        ],
        correctAnswer: "Memoizing functions",
      },
      {
        text: "What does useMemo do?",
        options: [
          "Memoizes computed values",
          "Memoizes components",
          "Memoizes state updates",
          "Memoizes side effects",
        ],
        correctAnswer: "Memoizes computed values",
      },
      {
        text: "Which hook is used to access the DOM directly?",
        options: ["useRef", "useDOM", "useAccess", "useElement"],
        correctAnswer: "useRef",
      },
      {
        text: "What is the difference between `useEffect` and `useLayoutEffect`?",
        options: [
          "`useLayoutEffect` runs synchronously after all DOM mutations",
          "`useEffect` runs synchronously before the DOM is updated",
          "They are the same",
          "`useLayoutEffect` is for server-side rendering",
        ],
        correctAnswer:
          "`useLayoutEffect` runs synchronously after all DOM mutations",
      },
      {
        text: "What is a custom hook?",
        options: [
          "A reusable function that uses other hooks",
          "A built-in React hook",
          "A way to manage global state",
          "A method for optimizing performance",
        ],
        correctAnswer: "A reusable function that uses other hooks",
      },
      {
        text: "How do you share state between components using hooks?",
        options: [
          "Context API or prop drilling",
          "Redux",
          "MobX",
          "All of the above",
        ],
        correctAnswer: "All of the above",
      },
      {
        text: "What is the purpose of the `useReducer` hook?",
        options: [
          "Managing complex state logic",
          "Replacing `useState`",
          "Handling side effects",
          "Creating custom hooks",
        ],
        correctAnswer: "Managing complex state logic",
      },
      {
        text: "Which hook is used to access the previous value of a prop or state?",
        options: ["usePrevious", "usePrev", "usePrior", "useLast"],
        correctAnswer: "usePrevious", // Although this is not a built-in hook, but a common pattern for creating one.
      },
    ],
  },
  {
    id: "3",
    title: "TypeScript Basics",
    description: "Learn TypeScript fundamentals through practice",
    questions: [
      {
        text: "What is the main purpose of TypeScript?",
        options: [
          "Adding static typing to JavaScript",
          "Making JavaScript run faster",
          "Replacing JavaScript",
          "Creating user interfaces",
        ],
        correctAnswer: "Adding static typing to JavaScript",
      },
      {
        text: "Which keyword is used to define an interface in TypeScript?",
        options: ["interface", "type", "class", "def"],
        correctAnswer: "interface",
      },
      {
        text: "What is the difference between an interface and a type alias?",
        options: [
          "Interfaces describe object shapes, type aliases can describe anything",
          "Type aliases describe object shapes, interfaces can describe anything",
          "They are the same",
          "Interfaces are for functions, type aliases are for objects",
        ],
        correctAnswer:
          "Interfaces describe object shapes, type aliases can describe anything",
      },
      {
        text: "How do you specify the type of a function parameter in TypeScript?",
        options: [
          "parameter: type",
          "type parameter",
          "parameter as type",
          "(parameter) : type",
        ],
        correctAnswer: "parameter: type",
      },
      {
        text: "What is a generic in TypeScript?",
        options: [
          "A way to create reusable components with type parameters",
          "A type that can hold any value",
          "A function that can accept any type of argument",
          "A way to define custom types",
        ],
        correctAnswer:
          "A way to create reusable components with type parameters",
      },
      {
        text: "Which symbol is used to indicate optional properties in TypeScript interfaces?",
        options: ["?", "!", "*", "&"],
        correctAnswer: "?",
      },
      {
        text: "What is a tuple in TypeScript?",
        options: [
          "An array with a fixed number of elements and known types",
          "A type alias for an array",
          "An object with key-value pairs",
          "A function that returns multiple values",
        ],
        correctAnswer:
          "An array with a fixed number of elements and known types",
      },
      {
        text: "How do you prevent a variable from being reassigned in TypeScript?",
        options: [
          "using the `const` keyword",
          "using the `readonly` keyword",
          "using the `final` keyword",
          "using the `immutable` keyword",
        ],
        correctAnswer: "using the `const` keyword",
      },
      {
        text: "What is the purpose of the `enum` type in TypeScript?",
        options: [
          "Defining a set of named constants",
          "Creating custom types",
          "Defining interfaces",
          "Working with generics",
        ],
        correctAnswer: "Defining a set of named constants",
      },
      {
        text: "What is type inference in TypeScript?",
        options: [
          "Automatically deducing the type of a variable",
          "Explicitly defining the type of a variable",
          "Converting one type to another",
          "Checking types at runtime",
        ],
        correctAnswer: "Automatically deducing the type of a variable",
      },
    ],
  },
];

// export function Quiz() {
//   const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
//   const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
//   const [showResults, setShowResults] = useState(false);
//   const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

//   const handleStartQuiz = (quiz: Quiz) => {
//     setCurrentQuiz(quiz);
//     setUserAnswers({});
//     setShowResults(false);
//   };

//   const handleAnswerChange = (questionIndex: number, answer: string) => {
//     setUserAnswers({ ...userAnswers, [questionIndex]: answer });
//   };

//   const calculateScore = () => {
//     if (!currentQuiz) return 0;
//     return currentQuiz.questions.reduce((score, question, index) => {
//       return userAnswers[index] === question.correctAnswer ? score + 1 : score;
//     }, 0);
//   };

//   const handleShowResults = () => {
//     if (currentQuiz) {
//       setSubmitted({ ...submitted, [currentQuiz.id]: true });
//     }
//     setShowResults(true);
//   };

//   if (currentQuiz) {
//     return (
//       <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg w-full">
//         <button
//           onClick={() => setCurrentQuiz(null)}
//           className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" /> Go Back
//         </button>
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">
//           {currentQuiz.title}
//         </h2>
//         {currentQuiz.questions.map((question, index) => (
//           <div key={index} className="mb-8 border-b pb-4">
//             <p className="font-semibold text-xl mb-3">{question.text}</p>
//             {question.options.map((option, optionIndex) => {
//               let optionClass =
//                 "border rounded-lg p-4 block mb-2 cursor-pointer transition duration-200";
//               if (showResults) {
//                 if (option === question.correctAnswer) {
//                   optionClass += " bg-green-500 text-white";
//                 } else if (option === userAnswers[index]) {
//                   optionClass += " bg-red-500 text-white";
//                 } else {
//                   optionClass += " bg-gray-100";
//                 }
//               } else if (userAnswers[index] === option) {
//                 optionClass += " bg-blue-300";
//               } else {
//                 optionClass += " hover:bg-gray-200";
//               }
//               return (
//                 <label key={optionIndex} className={optionClass}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     checked={userAnswers[index] === option}
//                     onChange={() => handleAnswerChange(index, option)}
//                     className="hidden"
//                   />
//                   {option}
//                 </label>
//               );
//             })}
//           </div>
//         ))}
//         <button
//           onClick={handleShowResults}
//           className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
//         >
//           Submit Quiz
//         </button>
//         {showResults && (
//           <div className="mt-6 text-center">
//             <h3 className="text-2xl font-semibold">Results</h3>
//             <p className="text-lg text-gray-700 mt-2">
//               Your score: {calculateScore()} / {currentQuiz.questions.length}
//             </p>
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div className="p-10 max-w-6xl mx-auto w-full">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
//           Available Quizzes
//         </h1>
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {quizzes.map((quiz) => (
//             <div
//               key={quiz.id}
//               className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
//             >
//               <div className="flex items-center mb-4">
//                 <BookOpen className="h-8 w-8 text-indigo-600" />
//                 <h2 className="ml-3 text-xl font-semibold text-gray-900">
//                   {quiz.title}
//                 </h2>
//               </div>
//               <p className="text-gray-600 mb-4 text-lg">{quiz.description}</p>
//               {submitted[quiz.id] && (
//                 <p className="text-green-600 font-semibold">Submitted</p>
//               )}
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   {quiz.questions.length} questions
//                 </span>
//                 <button
//                   onClick={() => handleStartQuiz(quiz)}
//                   className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
//                 >
//                   {submitted[quiz.id] ? "Review" : "Start Quiz"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

export function Quiz() {
  const { user } = useAuth();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleStartQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;
    return currentQuiz.questions.reduce((score, question, index) => {
      return userAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const handleShowResults = async () => {
    if (currentQuiz) {
      setSubmitted({ ...submitted, [currentQuiz.id]: true });
    }
    setShowResults(true);

    if (user) {
      try {
        const activityRef = collection(db, "users", user.uid, "activities");
        await addDoc(activityRef, {
          type: "quiz_completed",
          title: `Completed Quiz: ${currentQuiz?.title}`,
          description: `You scored ${calculateScore()} / ${
            currentQuiz?.questions.length
          }`,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error logging activity:", error);
      }
    }
  };

  if (currentQuiz) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg w-full">
        <button
          onClick={() => setCurrentQuiz(null)}
          className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Go Back
        </button>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">
          {currentQuiz.title}
        </h2>
        {currentQuiz.questions.map((question, index) => (
          <div key={index} className="mb-8 border-b pb-4">
            <p className="font-semibold text-xl mb-3">{question.text}</p>
            {question.options.map((option, optionIndex) => {
              let optionClass =
                "border rounded-lg p-4 block mb-2 cursor-pointer transition duration-200";
              if (showResults) {
                if (option === question.correctAnswer) {
                  optionClass += " bg-green-500 text-white";
                } else if (option === userAnswers[index]) {
                  optionClass += " bg-red-500 text-white";
                } else {
                  optionClass += " bg-gray-100";
                }
              } else if (userAnswers[index] === option) {
                optionClass += " bg-blue-300";
              } else {
                optionClass += " hover:bg-gray-200";
              }
              return (
                <label key={optionIndex} className={optionClass}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="hidden"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        ))}
        <button
          onClick={handleShowResults}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
        >
          Submit Quiz
        </button>
        {showResults && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold">Results</h3>
            <p className="text-lg text-gray-700 mt-2">
              Your score: {calculateScore()} / {currentQuiz.questions.length}
            </p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="p-10 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Available Quizzes
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <h2 className="ml-3 text-xl font-semibold text-gray-900">
                  {quiz.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4 text-lg">{quiz.description}</p>
              {submitted[quiz.id] && (
                <p className="text-green-600 font-semibold">Submitted</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </span>
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                  {submitted[quiz.id] ? "Review" : "Start Quiz"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
