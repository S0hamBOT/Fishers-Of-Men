// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/firebase";
// import { AuthProvider } from "./contexts/AuthContext";
// import { Sidebar } from "./components/Sidebar";
// import { Login } from "./pages/Login";
// import { Quiz } from "./pages/Quiz";
// import { Practice } from "./pages/Practice";
// import { Resources } from "./pages/Resources";
// import { Community } from "./pages/Community";
// import { Calendar } from "./pages/Calendar";
// import { DashboardStats } from "./components/DashboardStats";
// import { RecentActivity } from "./components/RecentActivity";
// import { UpcomingEvents } from "./components/UpcomingEvents";
// import { getUserData } from "./lib/firebase";
// import { problemData } from "./data/problems";

// // Import Material UI components
// import { Container, Grid, Paper, Typography } from "@mui/material";

// // Import Material UI Icons
// import LightningIcon from "@mui/icons-material/FlashOn";
// import TargetIcon from "@mui/icons-material/TrackChanges";
// import ClockIcon from "@mui/icons-material/AccessTime";
// import TrophyIcon from "@mui/icons-material/EmojiEvents";

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
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     async function loadUserData() {
//       const user = auth.currentUser;
//       if (user) {
//         const data = await getUserData(user.uid);
//         setUserData(data);
//       }
//     }
//     loadUserData();
//   }, []);

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

//   const statPaperStyle = {
//     elevation: 0, // No elevation
//     p: 3,
//     display: "flex",
//     alignItems: "center",
//     border: "1px solid #e0e0e0",
//     borderRadius: "4px",
//     backgroundColor: "#fff",
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" component="h3" gutterBottom>
//         Welcome back, {userData?.name || "Student"}!
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         Here's what's happening with your progress today.
//       </Typography>

//       <Grid container spacing={2} sx={{ mt: 2 }}>
//         {[
//           {
//             icon: (
//               <LightningIcon
//                 sx={{ fontSize: 40, color: "warning.main", mr: 2 }}
//               />
//             ),
//             label: "Code Streak",
//             value: "7 days",
//           },
//           {
//             icon: (
//               <TargetIcon sx={{ fontSize: 40, color: "success.main", mr: 2 }} />
//             ),
//             label: "Problems Solved",
//             value: "42",
//           },
//           {
//             icon: (
//               <ClockIcon sx={{ fontSize: 40, color: "info.main", mr: 2 }} />
//             ),
//             label: "Time Spent",
//             value: "24h",
//           },
//           {
//             icon: (
//               <TrophyIcon
//                 sx={{ fontSize: 40, color: "secondary.main", mr: 2 }}
//               />
//             ),
//             label: "Current Rank",
//             value: "1,234",
//           },
//         ].map((item, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Paper sx={statPaperStyle}>
//               {item.icon}
//               <div>
//                 <Typography variant="h6">{item.label}</Typography>
//                 <Typography variant="h5" fontWeight="bold">
//                   {item.value}
//                 </Typography>
//               </div>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <div className="mt-6">
//         <DashboardStats progress={calculateTopicProgress()} />
//       </div>

//       <Grid container spacing={2} sx={{ mt: 2 }}>
//         <Grid item xs={12} lg={6}>
//           <RecentActivity />
//         </Grid>
//         <Grid item xs={12} lg={6}>
//           <UpcomingEvents />
//         </Grid>
//       </Grid>
//     </Container>
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

// Import the icons (Make sure paths are correct)
import lightningIcon from "./icons/flash.png?url";
import targetIcon from "./icons/target.png?url";
import clockIcon from "./icons/timer.png?url";
import trophyIcon from "./icons/trophy.png?url";

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
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome back, {userData?.name || "Student"}!
      </h1>
      <p className="text-sm text-gray-500">
        Here's what's happening with your progress today.
      </p>

      <div className="mt-6 flex space-x-6">
        {" "}
        {/* Key change: space-x-6 and w-full */}
        <div className="bg-white rounded-lg shadow p-4 w-full flex items-center">
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
        <div className="bg-white rounded-lg shadow p-4 w-full flex items-center">
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
        <div className="bg-white rounded-lg shadow p-4 w-full flex items-center">
          <img src={clockIcon} alt="Time Spent" className="w-10 h-10 mr-2" />
          <div>
            <p className="text-gray-500">Time Spent</p>
            <p className="text-lg font-semibold">24h</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 w-full flex items-center">
          <img src={trophyIcon} alt="Current Rank" className="w-10 h-10 mr-2" />
          <div>
            <p className="text-gray-500">Current Rank</p>
            <p className="text-lg font-semibold">1,234</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-6">
        <DashboardStats progress={calculateTopicProgress()} />
      </div> */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-8">
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
