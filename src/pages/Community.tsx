// import React from "react";
// import { MessageSquare, ThumbsUp } from "lucide-react";

// const posts = [
//   {
//     id: "1",
//     title: "Help with React useEffect",
//     content:
//       "I'm having trouble understanding the dependency array in useEffect. Can someone explain?",
//     author: "Sarah Johnson",
//     likes: 5,
//     comments: 3,
//     timestamp: new Date("2024-02-20T10:00:00"),
//   },
//   {
//     id: "2",
//     title: "TypeScript Generic Tips",
//     content:
//       "Here are some tips for working with TypeScript generics that I've learned...",
//     author: "Mike Chen",
//     likes: 12,
//     comments: 7,
//     timestamp: new Date("2024-02-19T15:30:00"),
//   },
// ];

// export function Community() {
//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Community Discussion
//         </h1>
//         <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
//           New Post
//         </button>
//       </div>
//       <div className="space-y-6">
//         {posts.map((post) => (
//           <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-medium text-gray-900 mb-2">
//               {post.title}
//             </h2>
//             <p className="text-gray-600 mb-4">{post.content}</p>
//             <div className="flex items-center justify-between text-sm text-gray-500">
//               <div className="flex items-center space-x-4">
//                 <span>{post.author}</span>
//                 <span>{new Date(post.timestamp).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
//                   <ThumbsUp className="h-4 w-4" />
//                   <span>{post.likes}</span>
//                 </button>
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
//                   <MessageSquare className="h-4 w-4" />
//                   <span>{post.comments}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../lib/firebase";
import styled from "styled-components";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface User {
  id: string;
  name: string;
  score: number;
}

const questions: Question[] = [
  {
    id: "1",
    text: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: "2",
    text: "Which language is used for web development?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
  },
];

const LiveQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const initializeUser = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUserScore(userData.score || 0);
          setUserName(userData.name || "");
        } else {
          await setDoc(userRef, {
            name: user.displayName || "Guest",
            score: 0,
          });
          setUserScore(0);
          setUserName(user.displayName || "Guest");
          console.log("New user document created!");
        }
      }
    };

    initializeUser();

    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !quizEnded) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (!quizEnded) {
      setQuizEnded(true);
      fetchLeaderboard();
      setShowLeaderboard(true);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, quizEnded]);

  const fetchLeaderboard = async () => {
    const leaderboardQuery = query(
      collection(db, "users"),
      orderBy("score", "desc")
    );
    const querySnapshot = await getDocs(leaderboardQuery);
    const leaderboardData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
    setLeaderboard(leaderboardData);
  };

  const handleAnswerSelect = async (answer: string) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const responseData = {
        userId: user.uid,
        questionId: currentQuestion.id,
        answer,
        isCorrect,
      };

      try {
        await addDoc(collection(db, "responses"), responseData);
        setResponses([...responses, responseData]);
      } catch (error) {
        console.error("Error recording response:", error);
      }

      if (isCorrect) {
        const userRef = doc(db, "users", user.uid);
        const updatedScore = userScore + 1;

        try {
          await updateDoc(userRef, { score: updatedScore });
          setUserScore(updatedScore); // Update score in state
          fetchLeaderboard(); // Refresh leaderboard
        } catch (error) {
          console.error("Error updating score:", error);
        }
      }

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
        } else {
          setQuizEnded(true);
          fetchLeaderboard();
          setShowLeaderboard(true);
        }
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <QuizContainer>
      <Timer>Time Left: {formatTime(timeLeft)}</Timer>

      {!quizEnded && (
        <QuestionContainer>
          <QuestionText>{questions[currentQuestionIndex].text}</QuestionText>
          <OptionsContainer>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                isSelected={selectedAnswer === option}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
        </QuestionContainer>
      )}

      {showLeaderboard && (
        <LeaderboardContainer>
          <LeaderboardTitle>Leaderboard</LeaderboardTitle>
          <LeaderboardTable>
            <thead>
              <tr>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Score</TableHeader>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.score}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </LeaderboardTable>
        </LeaderboardContainer>
      )}
    </QuizContainer>
  );
};

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const Timer = styled.div`
  font-size: 1.2rem;
  text-align: right;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const QuestionContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const QuestionText = styled.h2`
  margin-bottom: 25px;
  font-size: 1.5rem;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: grid;
  gap: 15px;
`;

const OptionButton = styled.button<{ isSelected?: boolean }>`
  padding: 15px;
  font-size: 1rem;
  background-color: ${(props) => (props.isSelected ? "#3498db" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#2c3e50")};
  border: 2px solid ${(props) => (props.isSelected ? "#3498db" : "#ccc")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #3498db;
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LeaderboardContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LeaderboardTitle = styled.h2`
  margin-bottom: 25px;
  font-size: 1.8rem;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #3498db;
  color: #fff;
  text-align: left;
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  color: #2c3e50;
  border: 1px solid #ddd;
`;

export default LiveQuiz;
