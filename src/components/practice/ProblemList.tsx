import { useState, useEffect } from "react";
import { ExternalLink, Clock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  saveProblemProgress,
  getUserData,
  logActivity,
} from "../../lib/firebase";

interface Problem {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeEstimate: string;
  completed?: boolean;
  leetCodeUrl: string;
}

// Sort problems by difficulty (Easy -> Medium -> Hard)
const sortByDifficulty = (problems: Problem[]) => {
  const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
  return [...problems].sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  );
};

const problems: Problem[] = [
  {
    id: "key-pair",
    title: "Key Pair",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "15 min",
    leetCodeUrl: "https://leetcode.com/problems/two-sum",
  },
  {
    id: "find-pivot-index",
    title: "Find Pivot Index",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl: "https://leetcode.com/problems/find-pivot-index",
  },
  {
    id: "missing-number",
    title: "Missing Number",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "15 min",
    leetCodeUrl: "https://leetcode.com/problems/missing-number",
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates From Sorted Array",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl:
      "https://leetcode.com/problems/remove-duplicates-from-sorted-array",
  },
  {
    id: "maximum-average-subarray",
    title: "Maximum Average Subarray 1",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "25 min",
    leetCodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i",
  },
  {
    id: "sort-colors",
    title: "Sort Colors",
    category: "Arrays",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/sort-colors",
  },
  {
    id: "move-negatives",
    title: "Moving All Negative Number to the Left Side of an Array",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl: "https://leetcode.com/problems/move-negatives-to-beginning",
  },
  {
    id: "find-duplicate",
    title: "Find Duplicate Number",
    category: "Arrays",
    difficulty: "Medium",
    timeEstimate: "25 min",
    leetCodeUrl: "https://leetcode.com/problems/find-the-duplicate-number",
  },
  {
    id: "missing-element-duplicates",
    title: "Missing Element From An Array [With Duplicates]",
    category: "Arrays",
    difficulty: "Medium",
    timeEstimate: "25 min",
    leetCodeUrl:
      "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array",
  },
  {
    id: "first-repeating",
    title: "Find First Repeating Element",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl: "https://leetcode.com/problems/first-repeating-element",
  },
  {
    id: "common-elements",
    title: "Common Element in 3 Sorted Array",
    category: "Arrays",
    difficulty: "Easy",
    timeEstimate: "25 min",
    leetCodeUrl:
      "https://leetcode.com/problems/intersection-of-three-sorted-arrays",
  },
  {
    id: "wave-matrix",
    title: "Wave Print A Matrix",
    category: "Arrays",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/wave-matrix",
  },
  {
    id: "spiral-matrix",
    title: "Spiral Print A Matrix",
    category: "Arrays",
    difficulty: "Medium",
    timeEstimate: "35 min",
    leetCodeUrl: "https://leetcode.com/problems/spiral-matrix",
  },
  {
    id: "large-factorial",
    title: "Factorial of A Large Number",
    category: "Arrays",
    difficulty: "Hard",
    timeEstimate: "40 min",
    leetCodeUrl: "https://leetcode.com/problems/factorial-trailing-zeroes",
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    category: "Strings",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl: "https://leetcode.com/problems/valid-anagram",
  },
  {
    id: "reverse-only-letters",
    title: "Reverse Only Letters",
    category: "Strings",
    difficulty: "Easy",
    timeEstimate: "25 min",
    leetCodeUrl: "https://leetcode.com/problems/reverse-only-letters",
  },
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    category: "Strings",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl: "https://leetcode.com/problems/longest-common-prefix",
  },
  {
    id: "reverse-vowels-of-a-string",
    title: "Reverse Vowels of a String",
    category: "Strings",
    difficulty: "Easy",
    timeEstimate: "25 min",
    leetCodeUrl: "https://leetcode.com/problems/reverse-vowels-of-a-string",
  },
  {
    id: "isomorphic-strings",
    title: "Isomorphic Strings",
    category: "Strings",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl: "https://leetcode.com/problems/isomorphic-strings",
  },
  {
    id: "reorganize-string",
    title: "Reorganize String",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/reorganize-string",
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/group-anagrams",
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "40 min",
    leetCodeUrl: "https://leetcode.com/problems/longest-palindromic-substring",
  },
  {
    id: "find-the-index-of-the-first-occurrence-in-a-string",
    title: "Find the Index of the First Occurrence in a String",
    category: "Strings",
    difficulty: "Easy",
    timeEstimate: "20 min",
    leetCodeUrl:
      "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string",
  },
  {
    id: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/string-to-integer-atoi",
  },
  {
    id: "string-compression",
    title: "String Compression",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/string-compression",
  },
  {
    id: "integer-to-roman",
    title: "Integer to Roman",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/integer-to-roman",
  },
  {
    id: "zigzag-conversion",
    title: "Zigzag Conversion",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl: "https://leetcode.com/problems/zigzag-conversion",
  },
  {
    id: "largest-number",
    title: "Largest Number",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "35 min",
    leetCodeUrl: "https://leetcode.com/problems/largest-number",
  },
  {
    id: "remove-all-adjacent-duplicates-in-the-string-ii",
    title: "Remove All Adjacent Duplicates in the String II",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "35 min",
    leetCodeUrl:
      "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii",
  },
  {
    id: "minimum-time-difference",
    title: "Minimum Time Difference",
    category: "Strings",
    difficulty: "Medium",
    timeEstimate: "35 min",
    leetCodeUrl: "https://leetcode.com/problems/minimum-time-difference",
  },
  {
    id: "number-of-laser-beams-in-a-bank",
    title: "Number of Laser Beams in a Bank",
    category: "Strings", // While the input is an array of strings, the core logic deals with string manipulation
    difficulty: "Medium",
    timeEstimate: "30 min",
    leetCodeUrl:
      "https://leetcode.com/problems/number-of-laser-beams-in-a-bank",
  },
];

interface ProblemListProps {
  difficulty: string;
  category: string;
  searchQuery: string;
  onProblemSelect: (problemId: string) => void;
}

const difficultyColors = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
};

export function ProblemList({
  category,
  searchQuery,
  onProblemSelect,
}: ProblemListProps) {
  const { user } = useAuth();
  const [problemProgress, setProblemProgress] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    async function loadProgress() {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData?.problemProgress) {
          const progress: Record<string, boolean> = {};
          Object.entries(userData.problemProgress).forEach(
            ([id, data]: [string, any]) => {
              progress[id] = data.completed;
            }
          );
          setProblemProgress(progress);
        }
      }
    }
    loadProgress();
  }, [user]);

  const handleCheckboxChange = async (problemId: string, checked: boolean) => {
    if (!user) return;

    try {
      await saveProblemProgress(user.uid, problemId, checked);
      setProblemProgress((prev) => ({ ...prev, [problemId]: checked }));

      if (checked) {
        await logActivity(user.uid, {
          type: "problem_solved",
          problemId,
          category,
        });
      }
    } catch (error) {
      console.error("Failed to update problem progress:", error);
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesCategory =
      category === "all" ||
      problem.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProblems = sortByDifficulty(filteredProblems);

  return (
    <div className="bg-white rounded-lg">
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="grid grid-cols-12 text-sm font-medium text-gray-500">
          <div className="col-span-6">Problem</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Status</div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedProblems.map((problem) => (
          <div key={problem.id} className="px-4 py-4 hover:bg-gray-50">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-6">
                <div className="flex items-center">
                  <button
                    onClick={() => onProblemSelect(problem.id)}
                    className="text-base font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {problem.title}
                  </button>
                  <a
                    href={problem.leetCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="text-sm text-gray-500">{problem.category}</div>
              </div>
              <div
                className={`col-span-2 ${difficultyColors[problem.difficulty]}`}
              >
                {problem.difficulty}
              </div>
              <div className="col-span-2 flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {problem.timeEstimate}
              </div>
              <div className="col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                    checked={problemProgress[problem.id] || false}
                    onChange={(e) =>
                      handleCheckboxChange(problem.id, e.target.checked)
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
