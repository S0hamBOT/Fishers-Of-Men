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
// List of allowed emails (Alternatively, store in Firestore)
const allowedEmails = [
  "sohamjadhav.tech@gmail.com",
  //"",
  //"student3@example.com",
  // Add all 21 emails here
];

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the user's email is in the allowed list
    if (!user.email || !allowedEmails.includes(user.email)) {
      throw new Error("Access Denied: You are not registered for this course.");
    }

    return user;
  } catch (error) {
    console.error("Login failed:", (error as any).message);
    throw error;
  }
}

// User Data
export async function getUserData(userId: string) {
  // Change here: Fetch practice data from users/{uid}/practiceData
  const practiceDataRef = collection(db, "users", userId, "practiceData");
  const practiceDataSnapshot = await getDocs(practiceDataRef);

  const problemProgress: { [key: string]: any } = {};
  practiceDataSnapshot.forEach((doc) => {
    problemProgress[doc.id] = doc.data();
  });

  return { problemProgress }; // Return the problem progress
}

export async function updateUserProfile(userId: string, data: any) {
  await setDoc(doc(db, "users", userId), data, { merge: true });
}

// Problem Progress
export async function saveProblemProgress(
  userId: string,
  problemId: string,
  completed: boolean,
  p0: number
) {
  // Cast problemData to ProblemData type to allow string indexing
  const typedProblemData = problemData as unknown as ProblemData;
  const problem = typedProblemData[problemId];

  if (!problem) {
    throw new Error(`Problem with ID ${problemId} not found`);
  }

  // Corrected part: Store data in users/{userId}/practiceData
  const practiceDocRef = doc(
    collection(db, "users", userId, "practiceData"),
    problemId
  );

  await setDoc(practiceDocRef, {
    completed,
    lastUpdated: Timestamp.now(),
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
