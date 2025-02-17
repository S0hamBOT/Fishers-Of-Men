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

  "valid-anagram": {
    title: "Valid Anagram",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: "Easy",
    category: "Strings",
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: "",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: "",
      },
    ],
  },
  "reverse-only-letters": {
    title: "Reverse Only Letters",
    description:
      "Given a string s, reverse the string according to the following rules: Only the letters can be reversed, not the non-letter characters. Preserve the position of the non-letter characters.",
    difficulty: "Easy",
    category: "Strings",
    examples: [
      {
        input: 's = "ab-cd"',
        output: '"dc-ba"',
        explanation: "",
      },
      {
        input: 's = "a-bC-dEf-ghIj"',
        output: '"j-Ih-gfE-dC-ba"',
        explanation: "",
      },
    ],
  },
  "longest-common-prefix": {
    title: "Longest Common Prefix",
    description:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    difficulty: "Easy",
    category: "Strings",
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
        explanation: "",
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "",
      },
    ],
  },
  "reverse-vowels-of-a-string": {
    title: "Reverse Vowels of a String",
    description:
      "Given a string s, reverse only the vowels of the string and return the new string.",
    difficulty: "Easy",
    category: "Strings",
    examples: [
      {
        input: 's = "hello"',
        output: '"holle"',
        explanation: "",
      },
      {
        input: 's = "leetcode"',
        output: '"leotcede"',
        explanation: "",
      },
    ],
  },
  "isomorphic-strings": {
    title: "Isomorphic Strings",
    description:
      "Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.",
    difficulty: "Easy",
    category: "Strings",
    examples: [
      {
        input: 's = "egg", t = "add"',
        output: "true",
        explanation: "",
      },
      {
        input: 's = "foo", t = "bar"',
        output: "false",
        explanation: "",
      },
    ],
  },
  "reorganize-string": {
    title: "Reorganize String",
    description:
      'Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s that satisfies this condition. If no possible rearrangement exists, return an empty string "".',
    difficulty: "Medium",
    category: "Strings",
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
        explanation: "",
      },
      {
        input: 's = "aaab"',
        output: '""',
        explanation: "",
      },
    ],
  },
  "group-anagrams": {
    title: "Group Anagrams",
    description:
      "Given an array of strings strs, group anagrams together. You can return the answer in any order.",
    difficulty: "Medium",
    category: "Strings",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: "",
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "",
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
        explanation: "",
      },
    ],
  },
  "longest-palindromic-substring": {
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    category: "Strings",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "",
      },
    ],
  },
  "find-the-index-of-the-first-occurrence-in-a-string": {
    title: "Find the Index of the First Occurrence in a String",
    description:
      "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
    difficulty: "Easy",
    category: "Strings",
    examples: [
      {
        input: 'haystack = "sadbutsad", needle = "sad"',
        output: "0",
        explanation: "",
      },
      {
        input: 'haystack = "leetcode", needle = "leeto"',
        output: "-1",
        explanation: "",
      },
    ],
  },
  "string-to-integer-atoi": {
    title: "String to Integer (atoi)",
    description:
      "Implement the myAtoi(string s) function, which converts a string into a 32-bit signed integer (integer). The algorithm for myAtoi(string s) is as follows: Read in and ignore any leading whitespace. Check if the next character (if not already at the end of the string) is '-' or '+'. Assume this is the sign of the integer to be converted (default positive). If neither '-' nor '+' is present, assume the integer is positive. Read in next the characters until the next non-digit character or the end of the input is reached. Convert these digits into an integer (int). Return the final integer.",
    difficulty: "Medium",
    category: "Strings",
    examples: [
      {
        input: 's = "42"',
        output: "42",
        explanation: "",
      },
      {
        input: 's = "   -42"',
        output: "-42",
        explanation: "",
      },
      {
        input: 's = "4193 with words"',
        output: "4193",
        explanation: "",
      },
    ],
  },
  "string-compression": {
    title: "String Compression",
    description:
      "Given an array of characters chars, compress it using the following algorithm: Begin with an empty string s. For each group of consecutive repeating characters in chars: If the group's length is 1, append the character to s. Otherwise, append the character followed by the group's length. The compressed string s should not be returned separately, but instead be written directly to the input array chars. As the compressed string might be shorter than the original array, overwrite the characters beyond the new length with any value. Return the new length of the compressed array.",
    difficulty: "Medium",
    category: "Strings",
    examples: {
      input: 'chars = ["a","a","b","b","c","c","c"]',
      output: "6",
    },
  },
  "delete-n-nodes-after-m-nodes": {
    title: "Delete N Nodes after M Nodes",
    description:
      "Given the head of a linked list and two integers m and n. Traverse the linked list and delete n nodes after every m nodes.",
    difficulty: "Easy",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3",
        output: "[1,2,6,7,11,12]",
        explanation: "",
      },
      {
        input: "head = [1,2,3,4,5,6,7,8,9,10,11], m = 1, n = 2",
        output: "[1,4,7,10]",
        explanation: "",
      },
    ],
  },
  "merge-two-sorted-lists": {
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    difficulty: "Easy",
    category: "Linked Lists",
    examples: [
      {
        input: "l1 = [1,2,4], l2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "",
      },
      {
        input: "l1 = [], l2 = []",
        output: "[]",
        explanation: "",
      },
      {
        input: "l1 = [], l2 = [0]",
        output: "[0]",
        explanation: "",
      },
    ],
  },
  "print-kth-node-from-the-end": {
    title: "Print kth Node from the End",
    description:
      "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    difficulty: "Easy",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]",
        explanation: "",
      },
      {
        input: "head = [1], n = 1",
        output: "[]",
        explanation: "",
      },
      {
        input: "head = [1,2], n = 1",
        output: "[1]",
        explanation: "",
      },
    ],
  },
  "intersection-of-two-linked-lists": {
    title: "Intersection of Two Linked Lists",
    description:
      "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
    difficulty: "Easy",
    category: "Linked Lists",
    examples: [
      {
        input: "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
        output: "8",
        explanation: "",
      },
      {
        input: "intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]",
        output: "2",
        explanation: "",
      },
      {
        input: "intersectVal = 0, listA = [2,6,4], listB = [1,5]",
        output: "null",
        explanation: "",
      },
    ],
  },
  "sort-lists-using-merge-sort": {
    title: "Sort Lists using Merge Sort",
    description:
      "Given the head of a linked list, return the list sorted in ascending order.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [-1,5,3,4,0]",
        output: "[-1,0,3,4,5]",
        explanation: "",
      },
      {
        input: "head = []",
        output: "[]",
        explanation: "",
      },
      {
        input: "head = [0]",
        output: "[0]",
        explanation: "",
      },
    ],
  },
  f4: {
    title: "F4 Linked List Problem",
    description:
      "This is a placeholder for the actual problem description for the 'f4' linked list problem.  Please replace this with the correct problem statement.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [], // Add examples as needed
  },
  "flatten-linked-list": {
    title: "Flatten Linked List",
    description:
      "You are given a doubly linked list of nodes. In addition to the next and prev pointers, each node has a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more levels of their own, and so on. Flatten the list such that all nodes appear in a single, doubly linked list. You must flatten the list in-place (i.e., without creating a new list).",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]",
        output: "[1,2,3,7,8,11,12,9,10,4,5,6]",
        explanation: "",
      },
    ],
  },
  "copy-list-with-random-pointer": {
    title: "Copy List with Random Pointer",
    description:
      "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list. The copy should be a new list, where each node in the new list has its val set to the same as the original node's val, and the pointers of the new list's nodes (next and random) should point to new nodes in the copied list.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
        explanation: "",
      },
      {
        input: "head = [[1,1],[2,1]]",
        output: "[[1,1],[2,1]]",
        explanation: "",
      },
      {
        input: "head = [[3,null]]",
        output: "[[3,null]]",
        explanation: "",
      },
    ],
  },
  "rotate-list": {
    title: "Rotate List",
    description:
      "Given the head of a linked list, rotate the list to the right by k steps.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,3,4,5], k = 2",
        output: "[4,5,1,2,3]",
        explanation: "",
      },
      {
        input: "head = [0,1,2], k = 4",
        output: "[2,0,1]",
        explanation: "",
      },
    ],
  },
  "find-minimum-and-maximum-number-of-nodes-between-critical-points": {
    title: "Find Minimum and Maximum Number of Nodes Between Critical Points",
    description:
      "A critical point in a linked list is a node that is not the first node and not the last node, and either its value is strictly greater than both of its neighbors, or its value is strictly smaller than both of its neighbors. Given the head of a linked list, return an array [minDistance, maxDistance] where minDistance is the minimum distance between any two distinct critical points and maxDistance is the maximum distance between any two distinct critical points. If there are no critical points, return [-1, -1].",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [3,1,4,1,1,1,2]",
        output: "[1,3]",
        explanation: "",
      },
      {
        input: "head = [5,3,1,2,3]",
        output: "[1,2]",
        explanation: "",
      },
      {
        input: "head = [1,3,2]",
        output: "[-1,-1]",
        explanation: "",
      },
    ],
  },
  "merge-nodes-in-between-zeros": {
    title: "Merge Nodes in between Zeros",
    description:
      "You are given the head of a linked list, which contains some integers sorted in non-decreasing order. The values 0 and 1 are the only integers that may occur. Merge all the nodes between any two consecutive 0's into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's. Return the head of the modified linked list.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [0,1,2,0,3,4,0]",
        output: "[0,3,7,0]",
        explanation: "",
      },
      {
        input: "head = [0,1,0,3,0,2,0]",
        output: "[0,1,3,2,0]",
        explanation: "",
      },
    ],
  },
  "odd-even-linked-list": {
    title: "Odd Even Linked List",
    description:
      "Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. The first node is considered odd, and the second node is considered even, and so on. The relative order inside both the even and odd groups should remain as it was in the input. You must solve the problem in O(1) extra space complexity.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[1,3,5,2,4]",
        explanation: "",
      },
      {
        input: "head = [2,1,3,5,6,4,7]",
        output: "[2,3,6,7,1,5,4]",
        explanation: "",
      },
    ],
  },
  "double-a-number-represented-as-a-linked-list": {
    title: "Double a Number Represented as a Linked List",
    description:
      "You are given the head of a non-empty linked list representing a non-negative integer without leading zeroes. Return the head of the linked list after doubling it.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,8,9]",
        output: "[3,7,8]",
        explanation: "",
      },
      {
        input: "head = [9,9,9]",
        output: "[1,9,9,8]",
        explanation: "",
      },
    ],
  },
  "remove-zero-sum-consecutive-nodes-from-linked-list": {
    title: "Remove Zero Sum Consecutive Nodes from Linked List",
    description:
      "Given the head of a linked list, remove all consecutive sublists of nodes that sum to 0, and return the head of the modified linked list.",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,-2,-1]",
        output: "[1]",
        explanation: "",
      },
      {
        input: "head = [1,2,-3,3,1]",
        output: "[1,1]",
        explanation: "",
      },
      {
        input: "head = [1,2,3,-3,-2]",
        output: "[1]",
        explanation: "",
      },
    ],
  },
  "swapping-nodes-in-a-linked-list": {
    title: "Swapping Nodes in a Linked List",
    description:
      "You are given the head of a linked list, and an integer k. Return the head of the linked list after swapping the nodes at the kth position from the front and the kth position from the end (the positions are 1-indexed).",
    difficulty: "Medium",
    category: "Linked Lists",
    examples: [
      {
        input: "head = [1,2,3,4,5], k = 2",
        output: "[4,2,3,1,5]",
        explanation: "",
      },
      {
        input: "head = [7,9,6,6,7,8,3,0,9,5], k = 5",
        output: "[7,9,6,6,8,7,3,0,9,5]",
        explanation: "",
      },
      {
        input: "head = [1], k = 1",
        output: "[1]",
        explanation: "",
      },
    ],
  },
};
