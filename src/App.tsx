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
// import "./index.css";

// function Dashboard() {
//   const { user } = useAuth();
//   const [userData, setUserData] = useState<any>(null);

//   // Declare problems array here in App.tsx
//   const problems = [
//     { id: "1", category: "Python" },
//     { id: "2", category: "JavaScript" },
//     { id: "3", category: "Data Structures" },
//     // Add more problems as needed
//   ];

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
//           const problem = problems.find((p: { id: string }) => p.id === id);
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
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 overflow-y-auto p-8">
//         <div className="mx-auto max-w-7xl">
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
//                 <div className="flex h-screen bg-gray-100">
//                   <Sidebar />
//                   <Quiz />
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/practice"
//             element={
//               <AuthRequired>
//                 <div className="flex h-screen bg-gray-100">
//                   <Sidebar />
//                   <Practice />
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/resources"
//             element={
//               <AuthRequired>
//                 <div className="flex h-screen bg-gray-100">
//                   <Sidebar />
//                   <Resources />
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/community"
//             element={
//               <AuthRequired>
//                 <div className="flex h-screen bg-gray-100">
//                   <Sidebar />
//                   <Community />
//                 </div>
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/calendar"
//             element={
//               <AuthRequired>
//                 <div className="flex h-screen bg-gray-100">
//                   <Sidebar />
//                   <Calendar />
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

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthRequired } from "./components/AuthRequired";
import { Login } from "./pages/Login";
import { Quiz } from "./pages/Quiz";
import { Practice } from "./pages/Practice";
import { Resources } from "./pages/Resources";
import { Community } from "./pages/Community";
import { Calendar } from "./pages/Calendar";
import { getUserData } from "./lib/firebase";
import { useAuth } from "./contexts/AuthContext";
import { DashboardStats } from "./components/DashboardStats";
import { RecentActivity } from "./components/RecentActivity";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { problemData } from "./data/problems";

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

  const topicProgress = calculateTopicProgress();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {userData?.name || "Student"}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your progress today.
            </p>
          </div>

          <div className="mb-8">
            <DashboardStats progress={topicProgress} />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <RecentActivity />
            <UpcomingEvents />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthRequired>
                <Dashboard />
              </AuthRequired>
            }
          />
          <Route
            path="/quiz"
            element={
              <AuthRequired>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1 ml-64">
                    <Quiz />
                  </main>
                </div>
              </AuthRequired>
            }
          />
          <Route
            path="/practice"
            element={
              <AuthRequired>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1 ml-64">
                    <Practice />
                  </main>
                </div>
              </AuthRequired>
            }
          />
          <Route
            path="/resources"
            element={
              <AuthRequired>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1 ml-64">
                    <Resources />
                  </main>
                </div>
              </AuthRequired>
            }
          />
          <Route
            path="/community"
            element={
              <AuthRequired>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1 ml-64">
                    <Community />
                  </main>
                </div>
              </AuthRequired>
            }
          />
          <Route
            path="/calendar"
            element={
              <AuthRequired>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1 ml-64">
                    <Calendar />
                  </main>
                </div>
              </AuthRequired>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
