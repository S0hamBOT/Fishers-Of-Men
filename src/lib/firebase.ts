// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import {
//   getDocs,
//   collection,
//   query,
//   orderBy,
//   limit as firestoreLimit,
// } from "firebase/firestore";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
//   Timestamp,
// } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// // User Data
// export async function getUserData(userId: string) {
//   const userDoc = await getDoc(doc(db, "users", userId));
//   return userDoc.data();
// }

// export async function updateUserProfile(userId: string, data: any) {
//   await setDoc(doc(db, "users", userId), data, { merge: true });
// }

// // Problem Progress
// export async function saveProblemProgress(
//   userId: string,
//   problemId: string,
//   completed: boolean
// ) {
//   await updateDoc(doc(db, "users", userId), {
//     [`problemProgress.${problemId}`]: {
//       completed,
//       lastUpdated: Timestamp.now(),
//     },
//   });
// }

// export async function saveProblemNotes(
//   userId: string,
//   problemId: string,
//   notes: string
// ) {
//   await updateDoc(doc(db, "users", userId), {
//     [`problemNotes.${problemId}`]: {
//       notes,
//       lastUpdated: Timestamp.now(),
//     },
//   });
// }

// // Activity Tracking
// export async function logActivity(userId: string, activity: any) {
//   const activityData = {
//     ...activity,
//     timestamp: Timestamp.now(),
//   };

//   await setDoc(
//     doc(collection(db, "users", userId, "activities")),
//     activityData
//   );
// }

// // Quiz Functions
// export async function saveQuizResult(
//   userId: string,
//   quizId: string,
//   score: number
// ) {
//   await setDoc(doc(collection(db, "users", userId, "quizResults")), {
//     quizId,
//     score,
//     timestamp: Timestamp.now(),
//   });
// }

// // Events
// // export async function getUpcomingEvents(limit: number = 5) {
// //   const eventsRef = collection(db, 'events');
// //   const q = query(eventsRef, orderBy('date'), limit(limit));
// //   return q;
// // }

// export async function getUpcomingEvents(limitNumber: number = 5) {
//   const eventsRef = collection(db, "events");
//   const q = query(eventsRef, orderBy("date"), firestoreLimit(limitNumber)); // Renamed limit to firestoreLimit
//   const querySnapshot = await getDocs(q);
//   const events = querySnapshot.docs.map((doc) => doc.data());
//   return events;
// }

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  query,
  orderBy,
  limit,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { problemData } from "../data/problems";

// Define the problem type based on the data structure
type Problem = {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
};

// Create a type for the problemData object
type ProblemData = {
  [key: string]: Problem;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// User Data
export async function getUserData(userId: string) {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.data();
}

export async function updateUserProfile(userId: string, data: any) {
  await setDoc(doc(db, "users", userId), data, { merge: true });
}

// Problem Progress
export async function saveProblemProgress(
  userId: string,
  problemId: string,
  completed: boolean
) {
  // Cast problemData to ProblemData type to allow string indexing
  const typedProblemData = problemData as ProblemData;
  const problem = typedProblemData[problemId];

  if (!problem) {
    throw new Error(`Problem with ID ${problemId} not found`);
  }

  await updateDoc(doc(db, "users", userId), {
    [`problemProgress.${problemId}`]: {
      completed,
      lastUpdated: Timestamp.now(),
    },
  });

  if (completed) {
    await logActivity(userId, {
      type: "Practice",
      title: `Solved: ${problem.title}`,
      description: `Completed ${problem.title} (${problem.difficulty})`,
      problemId,
      category: problem.category,
      timestamp: Timestamp.now(),
    });
  }
}

export async function saveProblemNotes(
  userId: string,
  problemId: string,
  notes: string
) {
  await updateDoc(doc(db, "users", userId), {
    [`problemNotes.${problemId}`]: {
      notes,
      lastUpdated: Timestamp.now(),
    },
  });
}

// Activity Tracking
export async function logActivity(userId: string, activity: any) {
  await addDoc(collection(db, "users", userId, "activities"), activity);
}

// Quiz Functions
export async function saveQuizResult(
  userId: string,
  quizId: string,
  score: number,
  quizTitle: string
) {
  const result = {
    quizId,
    score,
    timestamp: Timestamp.now(),
  };

  await addDoc(collection(db, "users", userId, "quizResults"), result);

  await logActivity(userId, {
    type: "Quiz",
    title: `Completed: ${quizTitle}`,
    description: `Scored ${score}% on ${quizTitle}`,
    quizId,
    score,
    timestamp: Timestamp.now(),
  });
}

// Events
export async function addEvent(event: {
  title: string;
  description: string;
  date: Date;
  type: "quiz" | "practice" | "course";
}) {
  await addDoc(collection(db, "events"), {
    ...event,
    date: Timestamp.fromDate(event.date),
  });
}

// export async function getUpcomingEvents(limit: number = 5) {
//   const eventsRef = collection(db, 'events');
//   const q = query(
//     eventsRef,
//     orderBy('date', 'asc'),
//     limit(limit)
//   );
//   return q;
// }

export async function getUpcomingEvents(limitNumber: number = 5) {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, orderBy("date"), firestoreLimit(limitNumber)); // Renamed limit to firestoreLimit
  const querySnapshot = await getDocs(q);
  const events = querySnapshot.docs.map((doc) => doc.data());
  return events;
}

function firestoreLimit(
  _limitNumber: number
): import("@firebase/firestore").QueryConstraint {
  throw new Error("Function not implemented.");
}
