// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// // Import images (adjust paths as needed)
// import image1 from "/src/icons/login-illustration-1.jpg";
// import image2 from "/src/icons/login-illustration-2.jpg";
// import image3 from "/src/icons/login-illustration-3.jpg";
// import image4 from "/src/icons/login-illustration-4.jpg";
// import image5 from "/src/icons/login-illustration-5.jpg";
// import image6 from "/src/icons/login-illustration-6.png";
// import image7 from "/src/icons/login-illustration-7.jpg";
// import defaultImage from "/src/icons/login-illustration-1.jpg"; // Fallback image

// const images = [
//   "https://storage.googleapis.com/a1aa/image/cSpFepiqkIjj8mG6cZzn7AVJ0aiM08ERp2fnDSFh5rE.jpg", // Skeleton working on laptop
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
//   const [currentImage, setCurrentImage] = useState(defaultImage);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";

//   useEffect(() => {
//     const shuffleArray = (array: string[]) => {
//       const newArray = [...array];
//       for (let i = newArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//       }
//       return newArray;
//     };

//     const shuffledImages = shuffleArray(images);
//     const shuffledMessages = shuffleArray(messages);

//     setCurrentImage(shuffledImages[0]);
//     setCurrentMessage(shuffledMessages[0]);
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
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex items-center justify-center min-h-screen">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
//         <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-yellow-50 rounded-l-lg">
//           <img
//             src={currentImage}
//             alt="Login Image"
//             className="mb-4 max-w-full"
//             style={{ width: "auto", height: "auto" }}
//             onError={() => setCurrentImage(defaultImage)}
//           />
//           <h2 className="text-2xl font-bold text-center text-purple-800 mb-2">
//             {currentMessage}
//           </h2>
//         </div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             {isSignUp ? "Create an account" : "Sign in to your account"}
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {error && (
//               <div
//                 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//                 role="alert"
//               >
//                 <strong className="font-bold">Error!</strong>
//                 <span className="block sm:inline">{error}</span>
//               </div>
//             )}
//             <div>
//               <input
//                 type="email"
//                 required
//                 className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={isLoading}
//               />
//             </div>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={isLoading}
//               />
//               <div
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <FontAwesomeIcon
//                   icon={showPassword ? faEye : faEyeSlash}
//                   className="text-gray-500"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <button
//                 type="button"
//                 className="text-indigo-600 hover:text-indigo-500 focus:outline-none"
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 disabled={isLoading}
//               >
//                 {isSignUp
//                   ? "Already have an account? Sign in"
//                   : "Don't have an account? Sign up"}
//               </button>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                   isLoading ? "opacity-75 cursor-not-allowed" : ""
//                 }`}
//                 disabled={isLoading}
//               >
//                 {isLoading
//                   ? "Please wait..."
//                   : isSignUp
//                   ? "Sign up"
//                   : "Sign in"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import loginGif from "/src/icons/giphy.gif"; // Path to your GIF
// Import images (adjust paths as needed)
import image1 from "/src/icons/login-illustration-1.jpg";
import image2 from "/src/icons/login-illustration-2.jpg";
import image3 from "/src/icons/login-illustration-3.jpg";
import image4 from "/src/icons/login-illustration-4.jpg";
import image5 from "/src/icons/login-illustration-5.jpg";
import image6 from "/src/icons/login-illustration-6.png";
import image7 from "/src/icons/login-illustration-7.jpg";
import defaultImage from "/src/icons/login-illustration-1.jpg"; // Fallback image

const images = [
  "https://storage.googleapis.com/a1aa/image/cSpFepiqkIjj8mG6cZzn7AVJ0aiM08ERp2fnDSFh5rE.jpg", // Skeleton working on laptop
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
];

const messages = [
  "May your code run faster than your login!",
  "Enter your credentials... or just brute-force your way in (just kidding!)",
  "May your code be cleaner than your desktop!",
  "May your compiler errors be easier to fix than your sleep schedule!",
  "May your login be successful! Unlike your last relationship.",
  "Hope this login is faster than your last breakup recovery!",
];

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(image1);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const shuffledImages = shuffleArray(images);
    const shuffledMessages = shuffleArray(messages);

    setCurrentImage(shuffledImages[0]);
    setCurrentMessage(shuffledMessages[0]);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        (err as any).message ||
          (isSignUp ? "Failed to create account" : "Failed to sign in")
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${loginGif})` }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden z-10">
          <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-yellow-50 rounded-l-lg relative">
            <img
              src={currentImage}
              alt="Login Illustration"
              className="mb-4 max-w-full"
              style={{ width: "auto", height: "auto" }}
              onError={() => setCurrentImage(image1)}
            />
            <h2 className="text-2xl font-bold text-center text-purple-800 mb-2 text-white">
              {currentMessage}
            </h2>
          </div>
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center text-white">
              {isSignUp ? "Create an account" : "Sign in to your account"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={isLoading}
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Please wait..."
                    : isSignUp
                    ? "Sign up"
                    : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
