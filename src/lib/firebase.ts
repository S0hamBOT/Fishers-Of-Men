import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
  onSnapshot,
  increment,
} from "firebase/firestore";
import { problemData } from "../data/problems";

// Existing types
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

type ProblemData = {
  [key: string]: Problem;
};

// New types for metrics
interface UserMetrics {
  lastSolvedDate: string;
  currentStreak: number;
  problemsSolved: string; // Changed to array of strings
  timeSpent: number;
  totalProblems: number;
}

// Your existing Firebase config
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

// Existing allowed emails
const allowedEmails = [
  "sohamjadhav.tech@gmail.com",
  "urjadoshi12@gmail.com",
  "atharva.u2005@gmail.com",
  "virajtarade1603@gmail.com",
  "machalesamruddhi@gmail.com",
  "vidhikabra123@gmail.com",
  "yashsakhare011@gmail.com",
  "snehawankhede5121@gmail.com",
  "tejabhang2006@gmail.com",
  "prachikasar05@gmail.com",
  "kulkarniashu306@gmail.com",
  "ghatulemukta11@gmail.com",
  "swarahendre@gmail.com",
  "manetejashree37@gmail.com",
  "shrawaniaherwal2024.it@mmcoe.edu.in",
  "sakshiwaghmode3239@gmail.com",
  "riyarajput7925@gmail.com",
  "kateshivam2007@gmail.com",
  "thefanaticc0der@gmail.com",
  "atharvalandge2004@gmail.com",
  // Add other emails here
];

// Your existing functions
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email || !allowedEmails.includes(user.email)) {
      throw new Error("Access Denied: You are not registered for this course.");
    }

    return user;
  } catch (error) {
    console.error("Login failed:", (error as any).message);
    throw error;
  }
}

// Modified saveProblemProgress to include metrics update
export const saveProblemProgress = async (
  userId: string,
  problemId: string,
  completed: boolean,
  timeSpent: number
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      let problemProgress = userData.problemProgress || {};
      problemProgress = {
        ...problemProgress,
        [problemId]: { completed },
      };

      let metrics = userData.metrics || {
        lastSolvedDate: null, // Initialize as null
        currentStreak: 0,
        problemsSolved: [],
        timeSpent: 0,
        totalProblems: 0,
      };

      if (completed) {
        const currentDate = new Date();
        if (!isNaN(currentDate.getTime())) {
          const lastSolved = metrics.lastSolvedDate
            ? new Date(metrics.lastSolvedDate)
            : null;
          const today = new Date();

          // Calculate streak
          let newStreak = metrics.currentStreak || 0;
          if (
            lastSolved &&
            lastSolved.toDateString() ===
              today.setDate(today.getDate() - 1).toString()
          ) {
            newStreak += 1;
          } else if (!lastSolved) {
            newStreak = 1; // Start streak if no previous solved date
          } else {
            newStreak = 0; // Reset streak
          }

          metrics = {
            ...metrics,
            lastSolvedDate: currentDate.toISOString(),
            currentStreak: newStreak,
            problemsSolved:
              typeof metrics.problemsSolved === "string"
                ? [metrics.problemsSolved, problemId]
                : [...metrics.problemsSolved, problemId],
          };
        } else {
          console.error("Invalid date object created.");
        }
      }

      await updateDoc(userDocRef, {
        problemProgress: problemProgress,
        metrics: metrics,
      });
    }
  } catch (error) {
    console.error("Error saving problem progress:", error);
    throw error;
  }
};

// New function to calculate user rank
export async function calculateUserRank(userId: string): Promise<number> {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);
  const userScores: { id: string; problems: number }[] = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    userScores.push({
      id: doc.id,
      problems: userData.metrics?.problemsSolved?.length || 0, // Access problemsSolved as an array
    });
  });

  // Sort by problems solved (descending)
  userScores.sort((a, b) => b.problems - a.problems);

  // Find user's rank (1-based index)
  const rank =
    userScores.findIndex((score: { id: string }) => score.id === userId) + 1;
  return rank;
}

// New function to track time spent
export async function trackTimeSpent(userId: string, timeInMinutes: number) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const currentTime = userData.metrics?.timeSpent || 0;

    try {
      await updateDoc(userRef, {
        "metrics.timeSpent": currentTime + timeInMinutes,
      });
    } catch (error) {
      console.error("Error updating time spent:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }
}

// Function to update user metrics
export async function updateUserMetrics(
  userId: string,
  newMetrics: UserMetrics
) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { metrics: newMetrics });
  } catch (error) {
    console.error("Error updating user metrics:", error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
}

// Your other existing functions remain unchanged
export async function getUserData(userId: string) {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.data();
}

export async function updateUserProfile(userId: string, data: any) {
  await setDoc(doc(db, "users", userId), data, { merge: true });
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

export async function logActivity(userId: string, activity: any) {
  await addDoc(collection(db, "users", userId, "activities"), activity);
}

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

export async function getUpcomingEvents(limitNumber: number = 5) {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, orderBy("date"), limit(limitNumber));
  const querySnapshot = await getDocs(q);
  const events = querySnapshot.docs.map((doc) => doc.data());
  return events;
}
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   User,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
//   increment,
//   Timestamp,
// } from "firebase/firestore";
// import { problemData } from "../data/problems";

// // Existing types
// type Problem = {
//   title: string;
//   description: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   category: string;
//   examples: Array<{
//     input: string;
//     output: string;
//     explanation?: string;
//   }>;
// };

// type ProblemData = {
//   [key: string]: Problem;
// };

// interface ProblemProgress {
//   [problemId: string]: { completed: boolean };
// }

// interface UserMetrics {
//   lastSolvedDate: Timestamp | null;
//   currentStreak: number;
//   problemsSolved: string[];
//   timeSpent: number;
//   totalProblems: number;
// }

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

// const allowedEmails = [
//   "sohamjadhav.tech@gmail.com",
//   "urjadoshi12@gmail.com",
//   "atharva.u2005@gmail.com",
//   "virajtarade1603@gmail.com",
//   "machalesamruddhi@gmail.com",
//   "vidhikabra123@gmail.com",
//   "yashsakhare011@gmail.com",
//   "snehawankhede5121@gmail.com",
//   "tejabhang2006@gmail.com",
//   "prachikasar05@gmail.com",
//   "kulkarniashu306@gmail.com",
//   "ghatulemukta11@gmail.com",
//   "swarahendre@gmail.com",
//   "manetejashree37@gmail.com",
//   "shrawaniaherwal2024.it@mmcoe.edu.in",
//   "sakshiwaghmode3239@gmail.com",
//   "riyarajput7925@gmail.com",
//   "kateshivam2007@gmail.com",
//   "thefanaticc0der@gmail.com",
// ];

// export async function signInWithGoogle(): Promise<User> {
//   const provider = new GoogleAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     if (!user.email || !allowedEmails.includes(user.email)) {
//       throw new Error("Access Denied: You are not registered for this course.");
//     }

//     return user;
//   } catch (error) {
//     if ((error as any).code === "auth/popup-closed-by-user") {
//       throw new Error("Login cancelled by user.");
//     }
//     console.error("Login failed:", (error as any).message);
//     throw error;
//   }
// }

// export const saveProblemProgress = async (
//   userId: string,
//   problemId: string,
//   completed: boolean,
//   timeSpent: number
// ) => {
//   try {
//     const userDocRef = doc(db, "users", userId);
//     const userDoc = await getDoc(userDocRef);

//     let userData = userDoc.exists() ? userDoc.data() : null;

//     if (!userData) {
//       const initialMetrics: UserMetrics = {
//         lastSolvedDate: null,
//         currentStreak: 0,
//         problemsSolved: [],
//         timeSpent: 0,
//         totalProblems: Object.keys(problemData).length,
//       };

//       await setDoc(userDocRef, {
//         problemProgress: {},
//         metrics: initialMetrics,
//       });
//       userData = { problemProgress: {}, metrics: initialMetrics };
//     }

//     const problemProgress: ProblemProgress = {
//       ...userData.problemProgress,
//       [problemId]: { completed },
//     };

//     let metrics: UserMetrics = userData.metrics;

//     if (completed) {
//       const today = Timestamp.fromDate(new Date());
//       const lastSolvedDate = metrics.lastSolvedDate;

//       if (lastSolvedDate) {
//         const timeDiff = today.toMillis() - lastSolvedDate.toMillis();
//         const daysDiff = timeDiff / (1000 * 3600 * 24);

//         if (daysDiff >= 0.9 && daysDiff <= 1.1) {
//           metrics.currentStreak += 1;
//         } else if (daysDiff > 1.1) {
//           metrics.currentStreak = 1;
//         }
//       } else {
//         metrics.currentStreak = 1;
//       }

//       metrics.lastSolvedDate = today;
//       if (!metrics.problemsSolved.includes(problemId)) {
//         metrics.problemsSolved.push(problemId);
//       }
//     }

//     await updateDoc(userDocRef, {
//       problemProgress: problemProgress,
//       "metrics.timeSpent": increment(timeSpent),
//       "metrics.lastSolvedDate": metrics.lastSolvedDate,
//       "metrics.currentStreak": metrics.currentStreak,
//       "metrics.problemsSolved": metrics.problemsSolved,
//     });
//   } catch (error) {
//     console.error("Error saving problem progress:", error);
//     throw error;
//   }
// };

// // Use Firestore's atomic increment for tracking time
// export async function trackTimeSpent(userId: string, timeInMinutes: number) {
//   const userRef = doc(db, "users", userId);
//   try {
//     await updateDoc(userRef, {
//       "metrics.timeSpent": increment(timeInMinutes),
//     });
//   } catch (error) {
//     console.error("Error updating time spent:", error);
//   }
// }
