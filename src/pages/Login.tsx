// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// export function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";

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
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isSignUp ? "Create an account" : "Sign in to your account"}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="text-sm text-red-700">{error}</div>
//             </div>
//           )}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               type="button"
//               className="text-sm text-indigo-600 hover:text-indigo-500"
//               onClick={() => setIsSignUp(!isSignUp)}
//               disabled={isLoading}
//             >
//               {isSignUp
//                 ? "Already have an account? Sign in"
//                 : "Don't have an account? Sign up"}
//             </button>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//                 isLoading ? "opacity-75 cursor-not-allowed" : ""
//               }`}
//               disabled={isLoading}
//             >
//               {isLoading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const images = [
  "https://storage.googleapis.com/a1aa/image/cSpFepiqkIjj8mG6cZzn7AVJ0aiM08ERp2fnDSFh5rE.jpg",
  "/src/icons/login-illustration-1.jpg",
  "/src/icons/login-illustration-2.jpg",
  "/src/icons/login-illustration-3.jpg",
  "/src/icons/login-illustration-4.jpg",
  "/src/icons/login-illustration-5.jpg",
  "/src/icons/login-illustration-6.png",
  "/src/icons/login-illustration-7.jpg",
];

const messages = [
  "May your code run faster than your login!",
  "Enter your credentials... or just brute-force your way in (just kidding!)",
  "May your code be cleaner than your desktop!",
  "May your compiler errors be easier to fix than your sleep schedule!",
  "May your login be successful! Unlike your last relationship.",
  "Hope this login is faster than your last breakup recovery!",
  // ... more messages
];

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
    setCurrentMessage(messages[randomIndex]);
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
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
        <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-yellow-50 rounded-l-lg">
          <img
            src={currentImage}
            alt="Login Image"
            className="mb-4 max-w-full"
            style={{ width: "auto", height: "auto" }}
          />
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-2">
            {currentMessage}
          </h2>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
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
  );
}
