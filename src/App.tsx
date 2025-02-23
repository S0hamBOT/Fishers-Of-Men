// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   Router,
// } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/firebase";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import { Sidebar } from "./components/Sidebar";
// import { Login } from "./pages/Login";
// import { Quiz } from "./pages/Quiz";
// import { Practice } from "./pages/Practice";
// import { Resources } from "./pages/Resources";
// import Community from "./pages/Community";
// import { Calendar } from "./pages/Calendar";
// import { RecentActivity } from "./components/RecentActivity";
// import { UpcomingEvents } from "./components/UpcomingEvents";
// import { getUserData } from "./lib/firebase";

// // Import the icons (Make sure paths are correct)
// import lightningIcon from "./icons/flash.png?url";
// import targetIcon from "./icons/target.png?url";
// import clockIcon from "./icons/timer.png?url";
// import trophyIcon from "./icons/trophy.png?url";
// import { DashboardStats } from "./components/DashboardStats";
// import { problems } from "./components/practice/ProblemList";

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsAuthenticated(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 ml-64 overflow-y-auto">{children}</main>
//     </div>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// }

// function Dashboard() {
//   const { user } = useAuth();
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     async function loadUserData() {
//       if (user) {
//         const data = await getUserData(user.uid);
//         setUserData(data);
//       }
//     }
//     loadUserData();
//   }, [user]);

//   const calculateTopicProgress = () => {
//     if (!userData?.problemProgress) return {};

//     const progress: Record<string, number> = {};

//     // Count completed problems by category
//     Object.entries(userData.problemProgress).forEach(
//       ([id, data]: [string, any]) => {
//         if (data.completed) {
//           const problem = problems.find((p) => p.id === id);
//           if (problem) {
//             progress[problem.category] = (progress[problem.category] || 0) + 1;
//           }
//         }
//       }
//     );

//     return progress;
//   };

//   const topicProgress = calculateTopicProgress();

//   return (
//     <div className="mx-auto max-w-7xl p-8">
//       <h1 className="text-2xl font-semibold text-white-900 mb-4">
//         Welcome back, {userData?.name || "Student"}!
//       </h1>
//       <p className="text-sm text-gray-500 mb-6">
//         Here's what's happening with your progress today.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <img
//             src={lightningIcon}
//             alt="Code Streak"
//             className="w-10 h-10 mr-2"
//           />
//           <div>
//             <p className="text-gray-500">Code Streak</p>
//             <p className="text-lg font-semibold">7 days</p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <img
//             src={targetIcon}
//             alt="Problems Solved"
//             className="w-10 h-10 mr-2"
//           />
//           <div>
//             <p className="text-gray-500">Problems Solved</p>
//             <p className="text-lg font-semibold">42</p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <img src={clockIcon} alt="Time Spent" className="w-10 h-10 mr-2" />
//           <div>
//             <p className="text-gray-500">Time Spent</p>
//             <p className="text-lg font-semibold">24h</p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <img src={trophyIcon} alt="Current Rank" className="w-10 h-10 mr-2" />
//           <div>
//             <p className="text-gray-500">Current Rank</p>
//             <p className="text-lg font-semibold">1,234</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 mb-8">
//         <DashboardStats progress={topicProgress} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//         <RecentActivity />
//         <UpcomingEvents />
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/quiz"
//             element={
//               <PrivateRoute>
//                 <Quiz />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/practice"
//             element={
//               <PrivateRoute>
//                 <Practice />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/resources"
//             element={
//               <PrivateRoute>
//                 <Resources />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/community"
//             element={
//               <PrivateRoute>
//                 <Community />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/calendar"
//             element={
//               <PrivateRoute>
//                 <Calendar />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  db,
  getUserData,
  calculateUserRank,
  updateUserMetrics,
} from "./lib/firebase";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./pages/Login";
import { Quiz } from "./pages/Quiz";
import { Practice } from "./pages/Practice";
import { Resources } from "./pages/Resources";
import Community from "./pages/Community";
import { Calendar } from "./pages/Calendar";
import { RecentActivity } from "./components/RecentActivity";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { doc, onSnapshot } from "firebase/firestore";

import lightningIcon from "./icons/flash.png?url";
import targetIcon from "./icons/target.png?url";
import clockIcon from "./icons/timer.png?url";
import trophyIcon from "./icons/trophy.png?url";
import { DashboardStats } from "./components/DashboardStats";
import { problems } from "./components/practice/ProblemList";

interface UserMetrics {
  lastSolvedDate: string;
  currentStreak: number;
  problemsSolved: string[];
  timeSpent: number;
  totalProblems: number;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">{children}</main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [metrics, setMetrics] = useState<{
    streak: number;
    problemsSolved: number;
    timeSpent: number;
    rank: number;
  }>({
    streak: 0,
    problemsSolved: 0,
    timeSpent: 0,
    rank: 0,
  });

  useEffect(() => {
    let unsubscribe: () => void;

    async function initializeMetrics() {
      if (!user) return;

      const initialData = await getUserData(user.uid);
      setUserData(initialData);

      unsubscribe = onSnapshot(doc(db, "users", user.uid), async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const userMetrics: UserMetrics = data.metrics || {
            lastSolvedDate: "",
            currentStreak: 0,
            problemsSolved: [],
            timeSpent: 0,
            totalProblems: 0,
          };

          const currentRank = await calculateUserRank(user.uid);

          const today = new Date().toISOString().split("T")[0];
          const lastSolvedDate = userMetrics.lastSolvedDate;
          let newStreak = userMetrics.currentStreak;

          if (lastSolvedDate) {
            const lastSolved = new Date(lastSolvedDate);
            const todayDate = new Date();
            const diffTime = Math.abs(
              todayDate.getTime() - lastSolved.getTime()
            );
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              newStreak = newStreak + 1;
            } else if (diffDays > 1) {
              newStreak = 0;
            }
          }

          setMetrics({
            streak: newStreak,
            problemsSolved: userMetrics.problemsSolved?.length || 0,
            timeSpent: Math.round(userMetrics.timeSpent / 60),
            rank: currentRank,
          });
        }
      });
    }

    initializeMetrics();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const calculateTopicProgress = () => {
    if (!userData?.problemProgress) return {};

    const progress: Record<string, number> = {};

    Object.entries(userData.problemProgress).forEach(
      ([id, data]: [string, any]) => {
        if (data.completed) {
          const problem = problems.find((p) => p.id === id);
          if (problem) {
            progress[problem.category] = (progress[problem.category] || 0) + 1;
          }
        }
      }
    );

    return progress;
  };

  const topicProgress = calculateTopicProgress();

  // Function to extract username from email
  const getUsernameFromEmail = (email: string | null | undefined) => {
    if (!email) return "Guest"; // Default to "Guest" if no email
    return email.split("@")[0]; // Extract part before "@"
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-semibold text-white-900 mb-8">
        Welcome back, {getUsernameFromEmail(user?.email)}!
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Here's what's happening with your progress today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <img
            src={lightningIcon}
            alt="Code Streak"
            className="w-10 h-10 mr-2"
          />
          <div>
            <p className="text-gray-500">Code Streak</p>
            <p className="text-lg font-semibold">{metrics.streak} days</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <img
            src={targetIcon}
            alt="Problems Solved"
            className="w-10 h-10 mr-2"
          />
          <div>
            <p className="text-gray-500">Problems Solved</p>
            <p className="text-lg font-semibold">{metrics.problemsSolved}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <img src={clockIcon} alt="Time Spent" className="w-10 h-10 mr-2" />
          <div>
            <p className="text-gray-500">Time Spent</p>
            <p className="text-lg font-semibold">{metrics.timeSpent}h</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <img src={trophyIcon} alt="Current Rank" className="w-10 h-10 mr-2" />
          <div>
            <p className="text-gray-500">Current Rank</p>
            <p className="text-lg font-semibold">{metrics.rank}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8">
        <DashboardStats progress={topicProgress} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <RecentActivity />
        <UpcomingEvents />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <PrivateRoute>
                <Practice />
              </PrivateRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <PrivateRoute>
                <Resources />
              </PrivateRoute>
            }
          />
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <Community />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
