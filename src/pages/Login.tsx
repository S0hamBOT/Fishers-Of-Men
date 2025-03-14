// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth, signInWithGoogle } from "../lib/firebase";

// import loginGif from "/src/icons/giphy.gif";
// import image1 from "/src/icons/login-illustration-1.jpg";
// import image2 from "/src/icons/login-illustration-2.jpg";
// import image3 from "/src/icons/login-illustration-3.jpg";
// import image4 from "/src/icons/login-illustration-4.jpg";
// import image5 from "/src/icons/login-illustration-5.jpg";
// import image6 from "/src/icons/login-illustration-6.png";
// import image7 from "/src/icons/login-illustration-7.jpg";
// import googleLogo from "/src/icons/google-logo.png";

// const images = [
//   "https://storage.googleapis.com/a1aa/image/cSpFepiqkIjj8mG6cZzn7AVJ0aiM08ERp2fnDSFh5rE.jpg",
//   image1,
//   image2,
//   image3,
//   image4,
//   image5,
//   image6,
//   image7,
// ];

// const messages = [
//   "May your code run faster than your login!",
//   "Enter your credentials... or just brute-force your way in (just kidding!)",
//   "May your code be cleaner than your desktop!",
//   "May your compiler errors be easier to fix than your sleep schedule!",
//   "May your login be successful! Unlike your last relationship.",
//   "Hope this login is faster than your last breakup recovery!",
// ];

// export function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [currentImage, setCurrentImage] = useState(image1);

//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   useEffect(() => {
//     const shuffleArray = (array: any[]) =>
//       array.sort(() => Math.random() - 0.5);
//     setCurrentImage(shuffleArray(images)[0]);
//     setCurrentMessage(shuffleArray(messages)[0]);
//   }, []);

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     if (isLoading) return;

//     setError("");
//     setIsLoading(true);

//     try {
//       if (isSignUp) {
//         await signUp(email, password);
//       } else {
//         await signIn(email, password);
//       }
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError(
//         (err as any).message ||
//           (isSignUp ? "Failed to create account" : "Failed to sign in")
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setError("");
//     setIsLoading(true);
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError("Failed to sign in with Google");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="bg-cover bg-center min-h-screen flex items-center justify-center"
//       style={{ backgroundImage: `url(${loginGif})` }}
//     >
//       <div className="relative">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden z-10">
//           <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-blue-50 rounded-l-lg">
//             <img
//               src={currentImage}
//               alt="Login Illustration"
//               className="mb-4 max-w-full"
//               onError={() => setCurrentImage(image1)}
//             />
//             <h2 className="text-2xl font-bold text-center text-purple mb-2">
//               {currentMessage}
//             </h2>
//           </div>
//           <div className="w-1/2 p-8 flex flex-col justify-center">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//               {isSignUp ? "Create an account" : "Sign in to your account"}
//             </h2>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                   {error}
//                 </div>
//               )}
//               <input
//                 type="email"
//                 required
//                 className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={isLoading}
//               />
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   disabled={isLoading}
//                 />
//                 <div
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   <FontAwesomeIcon
//                     icon={showPassword ? faEye : faEyeSlash}
//                     className="text-gray-500"
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
//                 disabled={isLoading}
//               >
//                 {isSignUp ? "Sign up" : "Sign in"}
//               </button>
//               <button
//                 type="button"
//                 className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 flex items-center justify-center"
//                 onClick={handleGoogleSignIn}
//                 disabled={isLoading}
//               >
//                 <img src={googleLogo} alt="Google" className="h-5 w-5 mr-2" />{" "}
//                 Sign in with Google
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import loginGif from "/src/icons/giphy-3.gif";
import googleLogo from "/src/icons/google-logo.png";

export function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // ✅ Check if the user is in the 'allowedUsers' collection
  const checkUserAccess = async (userEmail: string | null) => {
    if (!userEmail) return false;

    try {
      const allowedUsersRef = collection(db, "allowedUsers");
      const snapshot = await getDocs(allowedUsersRef);
      const allowedEmails = snapshot.docs.map((doc) => doc.id);

      if (!allowedEmails.includes(userEmail)) {
        return false; // ❌ User is NOT in the allowed list
      }

      // ✅ User is allowed, now ensure they have a document in 'Users' collection
      const userRef = doc(db, "Users", userEmail);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.log("Creating user document for:", userEmail);
        await setDoc(userRef, {
          email: userEmail,
          createdAt: new Date().toISOString(),
          metrics: {
            currentStreak: 0,
            lastSolvedDate: null,
            problemsSolved: [],
          },
        });
      }

      return true;
    } catch (error) {
      console.error("Error checking user access:", error);
      return false;
    }
  };

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user is allowed and ensure they have a profile in 'Users'
      const isAllowed = await checkUserAccess(user.email);
      if (!isAllowed) {
        throw new Error(
          "Access Denied: You are not registered for this course."
        );
      }

      navigate(from, { replace: true });
    } catch (err) {
      setError(
        `Failed to sign in with Google. ${
          (err as Error).message || "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginGif})` }}
    >
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <button
        type="button"
        className="absolute top-[59%] left-[82%] transform -translate-x-1/2 -translate-y-1/2"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <img
          src={googleLogo}
          alt="Google Sign-In"
          className="h-12 w-12 hover:scale-110 transition duration-300 animate-pulse shadow-lg shadow-yellow-400/50"
        />
      </button>
    </div>
  );
}
