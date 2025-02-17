import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./pages/Login";
import { Quiz } from "./pages/Quiz";
import { Practice } from "./pages/Practice";
import { Resources } from "./pages/Resources";
import { Community } from "./pages/Community";
import { Calendar } from "./pages/Calendar";
import { RecentActivity } from "./components/RecentActivity";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { getUserData } from "./lib/firebase";

// Import the icons (Make sure paths are correct)
import lightningIcon from "./icons/flash.png?url";
import targetIcon from "./icons/target.png?url";
import clockIcon from "./icons/timer.png?url";
import trophyIcon from "./icons/trophy.png?url";
import { DashboardStats } from "./components/DashboardStats";
import { problems } from "./components/practice/ProblemList";

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

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        const data = await getUserData(user.uid);
        setUserData(data);
      }
    }
    loadUserData();
  }, [user]);

  const calculateTopicProgress = () => {
    if (!userData?.problemProgress) return {};

    const progress: Record<string, number> = {};

    // Count completed problems by category
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

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-semibold text-white-900 mb-4">
        Welcome back, {userData?.name || "Student"}!
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
            <p className="text-lg font-semibold">7 days</p>
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
            <p className="text-lg font-semibold">42</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <img src={clockIcon} alt="Time Spent" className="w-10 h-10 mr-2" />
          <div>
            <p className="text-gray-500">Time Spent</p>
            <p className="text-lg font-semibold">24h</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <img src={trophyIcon} alt="Current Rank" className="w-10 h-10 mr-2" />
          <div>
            <p className="text-gray-500">Current Rank</p>
            <p className="text-lg font-semibold">1,234</p>
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
