// import React, { useEffect, useState } from "react";
// import { CheckCircle, Code, BookOpen } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   collection,
//   query,
//   orderBy,
//   limit,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../lib/firebase";

// // export function RecentActivity() {
// //   const { user } = useAuth();
// //   const [activities, setActivities] = useState<any[]>([]);

// //   useEffect(() => {
// //     if (!user) return;

// //     const activitiesRef = collection(db, "users", user.uid, "activities");
// //     const q = query(activitiesRef, orderBy("timestamp", "desc"), limit(5));

// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const newActivities = snapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setActivities(newActivities);
// //     });

// //     return () => unsubscribe();
// //   }, [user]);

// export function RecentActivity() {
//   const { user } = useAuth();
//   const [activities, setActivities] = useState<any[]>([]);

//   useEffect(() => {
//     if (!user) return;

//     const activitiesRef = collection(db, "users", user.uid, "activities");
//     const q = query(activitiesRef, orderBy("timestamp", "desc"), limit(5));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const newActivities = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setActivities(newActivities);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const getActivityIcon = (type: string) => {
//     switch (type) {
//       case "Quiz": // Updated to match the Firebase code
//         return BookOpen;
//       case "problem_solved":
//         return Code;
//       default:
//         return CheckCircle;
//     }
//   };

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-md">
//       <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
//       <div className="mt-6 flow-root">
//         <ul className="-mb-8">
//           {activities.map((activity, activityIdx) => {
//             const Icon = getActivityIcon(activity.type);
//             return (
//               <li key={activity.id}>
//                 <div className="relative pb-8">
//                   {activityIdx !== activities.length - 1 && (
//                     <span
//                       className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
//                       aria-hidden="true"
//                     />
//                   )}
//                   <div className="relative flex space-x-3">
//                     <div>
//                       <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
//                         <Icon className="h-5 w-5 text-indigo-600" />
//                       </span>
//                     </div>
//                     <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
//                       <div>
//                         <p className="text-sm text-gray-900">
//                           {activity.title || "Activity"}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {activity.description || activity.type}
//                         </p>
//                       </div>
//                       <div className="whitespace-nowrap text-right text-sm text-gray-500">
//                         <time>
//                           {activity.timestamp?.toDate().toLocaleDateString()}
//                         </time>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { CheckCircle, Code, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export function RecentActivity() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const activitiesRef = collection(db, "users", user.uid, "activities");
    const q = query(activitiesRef, orderBy("timestamp", "desc"), limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newActivities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(newActivities);
    });

    return () => unsubscribe();
  }, [user]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Quiz":
        return BookOpen;
      case "problem_solved":
        return Code;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      <div className="mt-6 flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 && (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                        <Icon className="h-5 w-5 text-indigo-600" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900">
                          {activity.title || "Activity"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.description || activity.type}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time>
                          {activity.timestamp?.toDate().toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
