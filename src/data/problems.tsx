export interface Problem {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
}

export const problemData = {
  "key-pair": {
    title: "Key Pair",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
  },
  "find-pivot-index": {
    title: "Find Pivot Index",
    description:
      "Given an array of integers nums, calculate the pivot index of this array. The pivot index is the index where the sum of all the numbers to the left of the index is equal to the sum of all the numbers to the right of the index. If no such index exists, return -1. If there are multiple pivot indexes, you should return the left-most pivot index.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [1,7,3,6,5,6]",
        output: "3",
        explanation:
          "The pivot index is 3.\nLeft sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11\nRight sum = nums[4] + nums[5] = 5 + 6 = 11",
      },
      {
        input: "nums = [1,2,3]",
        output: "-1",
        explanation: "There is no index that satisfies the conditions.",
      },
    ],
  },
  "missing-number": {
    title: "Missing Number",
    description:
      "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
        explanation:
          "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.",
      },
      {
        input: "nums = [0,1]",
        output: "2",
        explanation:
          "n = 2 since there are 2 numbers, so the range is [0,2]. 2 is the missing number since it does not appear in nums.",
      },
    ],
  },
  "remove-duplicates": {
    title: "Remove Duplicates From Sorted Array",
    description:
      "Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums. Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [1,1,2]",
        output: "2, nums = [1,2,_]",
        explanation:
          "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k (hence underscores).",
      },
      {
        input: "nums = [0,0,1,1,1,2,2,3,3,4]",
        output: "5, nums = [0,1,2,3,4,_,_,_,_,_]",
        explanation:
          "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. It does not matter what you leave beyond the returned k (hence underscores).",
      },
    ],
  },
  "maximum-average-subarray": {
    title: "Maximum Average Subarray 1",
    description:
      "You are given an integer array nums and an integer k. Find the contiguous subarray of length k that has the largest average and return its average.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [1,12,-5,-6,50,3], k = 4",
        output: "12.75000",
        explanation:
          "Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75",
      },
      {
        input: "nums = [1,2,3,4,5], k = 1",
        output: "5.00000",
        explanation: "",
      },
    ],
  },
  "sort-colors": {
    title: "Sort Colors",
    description:
      "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the colors red, white, and blue, respectively. You must solve this problem without using the library's sort function.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      {
        input: "nums = [2,0,2,1,1,0]",
        output: "[0,0,1,1,2,2]",
        explanation: "",
      },
      {
        input: "nums = [2,0,1]",
        output: "[0,1,2]",
        explanation: "",
      },
    ],
  },
  "move-negatives": {
    title: "Moving All Negative Number to the Left Side of an Array",
    description:
      "Given an array of integers, move all negative numbers to the left side of the array while maintaining the relative order of the positive numbers.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [-1, 2, -3, 4, -5, 6]",
        output: "[-1, -3, -5, 2, 4, 6]",
        explanation: "",
      },
      {
        input: "nums = [1, 2, 3, -4, -5]",
        output: "[-4, -5, 1, 2, 3]",
        explanation: "",
      },
    ],
  },
  "find-duplicate": {
    title: "Find Duplicate Number",
    description:
      "Given an array nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the original array nums and using only constant extra space.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      {
        input: "nums = [1,3,4,2,2]",
        output: "2",
        explanation: "",
      },
      {
        input: "nums = [3,1,3,4,2]",
        output: "3",
        explanation: "",
      },
    ],
  },
  "missing-element-duplicates": {
    title: "Missing Element From An Array [With Duplicates]",
    description:
      "Given an array of integers with duplicates, find the missing element in the range [1, n] where n is the size of the array.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      {
        input: "nums = [1, 2, 4, 4, 5]",
        output: "3",
        explanation: "",
      },
      {
        input: "nums = [1, 2, 3, 3, 5]",
        output: "4",
        explanation: "",
      },
    ],
  },
  "first-repeating": {
    title: "Find First Repeating Element",
    description:
      "Given an array of integers, find the first repeating element in the array.  If no repeating element exists, return -1.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input: "nums = [10, 5, 3, 4, 3, 5, 6]",
        output: "5",
        explanation: "5 is the first element that repeats.",
      },
      {
        input: "nums = [1, 2, 3, 4, 5]",
        output: "-1",
        explanation: "No element repeats.",
      },
      {
        input: "nums = [1, 2, 2, 1, 3]",
        output: "1",
        explanation:
          "1 is the first element that repeats (appearing at index 0 and then again at index 3).",
      },
    ],
  },
  "common-elements": {
    title: "Common Element in 3 Sorted Array",
    description:
      "Given three sorted arrays, find the common elements in all three arrays.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      {
        input:
          "arr1 = [1, 5, 10, 20, 40, 80], arr2 = [6, 7, 20, 80, 100], arr3 = [3, 4, 15, 20, 30, 70, 80]",
        output: "[20, 80]",
        explanation: "20 and 80 are present in all three arrays.",
      },
      {
        input: "arr1 = [1, 2, 3], arr2 = [4, 5, 6], arr3 = [7, 8, 9]",
        output: "[]",
        explanation: "No common elements.",
      },
    ],
  },
  "wave-matrix": {
    title: "Wave Print A Matrix",
    description:
      "Given a 2D matrix, print the elements in a wave-like pattern (horizontally then vertically, changing direction each time).",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      {
        input: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        explanation: "",
      },
      {
        input: "matrix = [[1, 2], [3, 4]]",
        output: "[1, 2, 4, 3]",
        explanation: "",
      },
    ],
  },
  "spiral-matrix": {
    title: "Spiral Print A Matrix",
    description: "Given a 2D matrix, print the elements in a spiral pattern.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      {
        input: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        explanation: "",
      },
      {
        input: "matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        output: "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
        explanation: "",
      },
    ],
  },
  "large-factorial": {
    title: "Factorial of A Large Number",
    description: "Given a number N, find the factorial of N.",
    difficulty: "Hard",
    category: "Arrays",
    examples: [
      {
        input: "N = 5",
        output: "[1, 2, 0]", // Represents 120
        explanation: "",
      },
      {
        input: "N = 10",
        output: "[3, 6, 2, 8, 8, 0, 0]", // Represents 3628800
        explanation: "",
      },
    ],
  },
};
