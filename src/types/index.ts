// export interface User {
//   username: string;
//   codeStreak: number;
//   progress: number;
// }

// export interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   questionCount: number;
// }

// export interface Practice {
//   id: string;
//   title: string;
//   description: string;
//   tags: string[];
//   difficulty: 'Easy' | 'Medium' | 'Hard';
// }

// export interface Resource {
//   id: string;
//   title: string;
//   description: string;
//   type: 'video' | 'article' | 'podcast';
//   tags: string[];
//   completed: boolean;
// }

// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   author: string;
//   likes: number;
//   comments: number;
//   timestamp: Date;
// }

// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   date: Date;
//   type: 'course' | 'quiz' | 'practice';
// }

export interface User {
  username: string;
  codeStreak: number;
  progress: number;
  // Add user metrics here
  metrics?: {
    lastSolvedDate: string;
    currentStreak: number;
    problemsSolved: string[];
    timeSpent: number;
    totalProblems: number;
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
}

export interface Practice {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "podcast";
  tags: string[];
  completed: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  timestamp: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: "course" | "quiz" | "practice";
}
