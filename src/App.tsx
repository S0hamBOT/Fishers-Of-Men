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
import { RecentActivity } from "./components/RecentActivity";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { getUserData } from "./lib/firebase";

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
  const [topicContainers, setTopicContainers] = useState([
    { name: "Array", solved: 0, total: 0 },
    { name: "Strings", solved: 0, total: 0 },
    { name: "Linked List", solved: 0, total: 0 },
    { name: "Trees", solved: 0, total: 0 },
    { name: "Stack", solved: 0, total: 0 },
    { name: "Queue", solved: 0, total: 0 },
  ]);
  const [loadingTopics, setLoadingTopics] = useState(true); // Loading state

  useEffect(() => {
    async function loadUserData() {
      const user = auth.currentUser;
      if (user) {
        const data = await getUserData(user.uid);
        setUserData(data);
      }
    }

    async function loadTopicData() {
      setLoadingTopics(true); // Set loading to true
      try {
        // Replace this with your actual data fetching logic
        const fetchedTopics = await Promise.all(
          topicContainers.map(async (topic) => {
            // Example: Simulate fetching data (replace with your API call/Firebase logic)
            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
            const solved = Math.floor(Math.random() * 10); // Random solved count
            const total = Math.floor(Math.random() * 20) + solved; // Random total count
            return { ...topic, solved, total };
          })
        );
        setTopicContainers(fetchedTopics);
      } catch (error) {
        console.error("Error fetching topic data:", error);
        // Handle error, e.g., display an error message
      } finally {
        setLoadingTopics(false); // Set loading to false regardless of success/failure
      }
    }

    loadUserData();
    loadTopicData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
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

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Topic Progress
        </h2>
        {loadingTopics ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicContainers.map((topic) => (
              <div
                key={topic.name}
                className="bg-gray-100 rounded-lg p-4 shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {topic.name}
                </h3>
                <p className="text-gray-500 mt-1">
                  {topic.solved} / {topic.total}
                </p>
              </div>
            ))}
          </div>
        )}
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
// import { RecentActivity } from "./components/RecentActivity";
// import { UpcomingEvents } from "./components/UpcomingEvents";
// import { getUserData } from "./lib/firebase";
// import { db } from "./lib/firebase"; // Your Firebase database instance

// import lightningIcon from "./icons/flash.png?url";
// import targetIcon from "./icons/target.png?url";
// import clockIcon from "./icons/timer.png?url";
// import trophyIcon from "./icons/trophy.png?url";
// import { Firestore } from "firebase/firestore";

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

// export async function getTopicData(topicName: string) {
//   // <-- Correct export
//   try {
//     const topicRef = ref(db, `topics/${topicName}`);
//     const snapshot = await get(topicRef);
//     if (snapshot.exists()) {
//       return snapshot.val();
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting topic data:", error);
//     return null;
//   }
// }

// function Dashboard() {
//   const [userData, setUserData] = useState<any>(null);
//   const [topicContainers, setTopicContainers] = useState([
//     { name: "Array", solved: 0, total: 0 },
//     { name: "Strings", solved: 0, total: 0 },
//     { name: "Linked List", solved: 0, total: 0 },
//     { name: "Trees", solved: 0, total: 0 },
//     { name: "Stack", solved: 0, total: 0 },
//     { name: "Queue", solved: 0, total: 0 },
//   ]);
//   const [loadingTopics, setLoadingTopics] = useState(true);

//   useEffect(() => {
//     async function loadUserData() {
//       const user = auth.currentUser;
//       if (user) {
//         const data = await getUserData(user.uid);
//         setUserData(data);
//       }
//     }

//     async function loadTopicData() {
//       setLoadingTopics(true);
//       try {
//         const fetchedTopics = await Promise.all(
//           topicContainers.map(async (topic) => {
//             try {
//               const topicData = await getTopicData(topic.name); // Use getTopicData
//               if (topicData) {
//                 return {
//                   ...topic,
//                   solved: topicData.solved || 0,
//                   total: topicData.total || 0,
//                 };
//               } else {
//                 return { ...topic, solved: 0, total: 0 }; // Handle missing data
//               }
//             } catch (error) {
//               console.error(`Error fetching data for ${topic.name}:`, error);
//               return { ...topic, solved: 0, total: 0 };
//             }
//           })
//         );
//         setTopicContainers(fetchedTopics);
//       } catch (error) {
//         console.error("Error fetching topic data:", error);
//       } finally {
//         setLoadingTopics(false);
//       }
//     }

//     loadUserData();
//     loadTopicData();
//   }, []);

//   return (
//     <div className="mx-auto max-w-7xl p-8">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-4">
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

//       <div className="mt-8 bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">
//           Topic Progress
//         </h2>
//         {loadingTopics ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {topicContainers.map((topic) => (
//               <div
//                 key={topic.name}
//                 className="bg-gray-100 rounded-lg p-4 shadow"
//               >
//                 <h3 className="text-lg font-medium text-gray-900">
//                   {topic.name}
//                 </h3>
//                 <p className="text-gray-500 mt-1">
//                   {topic.solved} / {topic.total}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
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
// function ref(db: Firestore, arg1: string) {
//   throw new Error("Function not implemented.");
// }

// function get(topicRef: void) {
//   throw new Error("Function not implemented.");
// }
