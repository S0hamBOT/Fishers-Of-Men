import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  addDoc,
  getDocs,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { problemData } from "../data/problems";

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

interface UserMetrics {
  lastSolvedDate: Timestamp | null;
  currentStreak: number;
  problemsSolved: string[];
  timeSpent: number;
  totalProblems: number;
}

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

const allowedEmails = [
  "sohamjadhav.tech@gmail.com",
  "sanicamyana@gmail.com",
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
  "atharvalandge2022.comp@mmcoe.edu.in",
];

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email || !allowedEmails.includes(user.email)) {
      await auth.signOut();
      throw new Error("Access Denied: You are not registered for this course.");
    }

    const userRef = doc(db, "Users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "Unknown",
        email: user.email,
        photoURL: user.photoURL || "",
        metrics: {
          lastSolvedDate: null,
          currentStreak: 0,
          problemsSolved: [],
          timeSpent: 0,
          totalProblems: Object.keys(problemData).length,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Login failed:", (error as any).message);
    throw error;
  }
}

export const saveProblemProgress = async (
  userId: string,
  problemId: string,
  completed: boolean,
  timeSpent: number
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        problemProgress: {},
        metrics: {
          lastSolvedDate: null,
          currentStreak: 0,
          problemsSolved: [],
          timeSpent: 0,
          totalProblems: Object.keys(problemData).length,
        },
      });
    }

    const userData = userDoc.data()!;
    let problemProgress = userData.problemProgress || {};
    problemProgress = {
      ...problemProgress,
      [problemId]: { completed },
    };

    let metrics: UserMetrics = userData.metrics || {
      lastSolvedDate: null,
      currentStreak: 0,
      problemsSolved: [],
      timeSpent: 0,
      totalProblems: Object.keys(problemData).length,
    };

    if (completed) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const lastSolvedDate = metrics.lastSolvedDate
        ? metrics.lastSolvedDate.toDate()
        : null;

      if (lastSolvedDate) {
        lastSolvedDate.setUTCHours(0, 0, 0, 0);
        const timeDiff = today.getTime() - lastSolvedDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        if (daysDiff === 1) {
          metrics.currentStreak += 1;
        } else if (daysDiff !== 0) {
          metrics.currentStreak = 1;
        }
      } else {
        metrics.currentStreak = 1;
      }

      metrics.lastSolvedDate = Timestamp.fromDate(today);
      await updateDoc(userDocRef, {
        "metrics.problemsSolved": arrayUnion(problemId),
      });
    }

    await updateDoc(userDocRef, {
      problemProgress: problemProgress,
      metrics: metrics,
    });
  } catch (error) {
    console.error("Error saving problem progress:", error);
    throw error;
  }
};

export async function calculateUserRank(userId: string): Promise<number> {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);
  const userScores: { id: string; problems: number }[] = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    userScores.push({
      id: doc.id,
      problems: userData.metrics?.problemsSolved?.length || 0,
    });
  });

  userScores.sort((a, b) => b.problems - a.problems);
  const rank = userScores.findIndex((score) => score.id === userId) + 1;
  return rank;
}

export async function trackTimeSpent(userId: string, timeInMinutes: number) {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      "metrics.timeSpent": increment(timeInMinutes),
    });
  } catch (error) {
    console.error("Error updating time spent:", error);
  }
}

export async function updateUserMetrics(
  userId: string,
  newMetrics: UserMetrics
) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { metrics: newMetrics });
  } catch (error) {
    console.error("Error updating user metrics:", error);
  }
}

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
