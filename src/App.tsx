// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Sidebar } from "./components/Sidebar";
// import { AuthProvider } from "./contexts/AuthContext";
// import { AuthRequired } from "./components/AuthRequired";
// import { Login } from "./pages/Login";
// import { Quiz } from "./pages/Quiz";
// import { Practice } from "./pages/Practice";
// import { Resources } from "./pages/Resources";
// import { Community } from "./pages/Community";
// import { Calendar } from "./pages/Calendar";
// import { getUserData } from "./lib/firebase";
// import { useAuth } from "./contexts/AuthContext";
// import { DashboardStats } from "./components/DashboardStats";
// import { RecentActivity } from "./components/RecentActivity";
// import { UpcomingEvents } from "./components/UpcomingEvents";
// import { problemData } from "./data/problems";

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
//     Object.entries(userData.problemProgress).forEach(
//       ([id, data]: [string, any]) => {
//         if (data.completed) {
//           const problem = problemData[id];
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
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 ml-64 overflow-y-auto">
//         <div className="mx-auto max-w-7xl p-8">
//           <div className="mb-8">
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Welcome back, {userData?.name || "Student"}!
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Here's what's happening with your progress today.
//             </p>
//           </div>

//           <div className="mb-8">
//             <DashboardStats progress={topicProgress} />
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//             <RecentActivity />
//             <UpcomingEvents />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/"
//             element={
//               <AuthRequired>
//                 <Dashboard />
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/quiz"
//             element={
//               <AuthRequired>
//                 <div className="flex min-h-screen bg-gray-100">
//                   <Sidebar />
//                   <main className="flex-1 ml-64">
//                     <Quiz />
//                   </main>
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/practice"
//             element={
//               <AuthRequired>
//                 <div className="flex min-h-screen bg-gray-100">
//                   <Sidebar />
//                   <main className="flex-1 ml-64">
//                     <Practice />
//                   </main>
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/resources"
//             element={
//               <AuthRequired>
//                 <div className="flex min-h-screen bg-gray-100">
//                   <Sidebar />
//                   <main className="flex-1 ml-64">
//                     <Resources />
//                   </main>
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/community"
//             element={
//               <AuthRequired>
//                 <div className="flex min-h-screen bg-gray-100">
//                   <Sidebar />
//                   <main className="flex-1 ml-64">
//                     <Community />
//                   </main>
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/calendar"
//             element={
//               <AuthRequired>
//                 <div className="flex min-h-screen bg-gray-100">
//                   <Sidebar />
//                   <main className="flex-1 ml-64">
//                     <Calendar />
//                   </main>
//                 </div>
//               </AuthRequired>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { AuthProvider } from "./contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./pages/Login";
import { Quiz } from "./pages/Quiz";
import { Practice } from "./pages/Practice";
import { Resources } from "./pages/Resources";
import { Community } from "./pages/Community";
import { Calendar } from "./pages/Calendar";
import { DashboardStats } from "./components/DashboardStats";
import { RecentActivity } from "./components/RecentActivity";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { getUserData } from "./lib/firebase";
import { problemData } from "./data/problems";

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
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    async function loadUserData() {
      const user = auth.currentUser;
      if (user) {
        const data = await getUserData(user.uid);
        setUserData(data);
      }
    }
    loadUserData();
  }, []);

  const calculateTopicProgress = () => {
    if (!userData?.problemProgress) return {};
    const progress: Record<string, number> = {};
    Object.entries(userData.problemProgress).forEach(
      ([id, data]: [string, any]) => {
        if (data.completed) {
          const problem = problemData[id];
          if (problem) {
            progress[problem.category] = (progress[problem.category] || 0) + 1;
          }
        }
      }
    );
    return progress;
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome back, {userData?.name || "Student"}!
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Here's what's happening with your progress today.
      </p>
      <DashboardStats progress={calculateTopicProgress()} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
