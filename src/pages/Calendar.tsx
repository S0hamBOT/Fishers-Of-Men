// import { useState, useEffect } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../lib/firebase";

// interface Class {
//   id: string;
//   name: string;
//   description: string;
//   notes?: string;
// }

// function isClass(obj: any): obj is Class {
//   return (
//     typeof obj === "object" &&
//     obj !== null &&
//     typeof obj.id === "string" &&
//     typeof obj.name === "string" &&
//     typeof obj.description === "string" &&
//     (obj.notes === undefined || typeof obj.notes === "string")
//   );
// }

// export function Calendar() {
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [selectedClass, setSelectedClass] = useState<Class | null>(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "calendar"), (snapshot) => {
//       const fetchedClasses = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return { id: doc.id, ...data };
//       });

//       const validClasses = fetchedClasses.filter(isClass);
//       setClasses(validClasses);

//       if (validClasses.length > 0) {
//         setSelectedClass(validClasses[0]);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleClassSelection = (cls: Class) => {
//     setSelectedClass(cls);
//   };

//   return (
//     <div className="flex h-screen p-8 flex-col md:flex-row w-full">
//       <div className="w-full md:w-1/4 space-y-4">
//         {classes.map((cls) => (
//           <button
//             key={cls.id}
//             onClick={() => handleClassSelection(cls)}
//             className="w-full py-3 px-4 bg-blue-200 rounded-lg text-center hover:bg-blue-300"
//           >
//             {cls.name}
//           </button>
//         ))}
//       </div>

//       <div className="hidden md:block w-1 border-r border-gray-400 mx-4"></div>

//       <div className="w-full md:flex-1 flex flex-col space-y-6">
//         {selectedClass ? (
//           <>
//             <div className="p-6 bg-blue-200 rounded-lg flex-[4] w-full">
//               <h2 className="text-lg font-bold">Description</h2>
//               <p>{selectedClass.description}</p>
//             </div>

//             <div className="p-6 bg-blue-200 rounded-lg flex-[1] w-full">
//               <h2 className="text-lg font-bold">Notes</h2>
//               <div className="h-full overflow-auto p-2 border bg-white rounded-md w-full">
//                 <p>{selectedClass.notes || "No notes available"}</p>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">Select a class to see details</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

interface Class {
  id: string;
  name: string;
  imagePath?: string;
  notes?: string;
}

export function Calendar() {
  const classes: Class[] = [
    {
      id: "class1",
      name: "Class 1 - 8th Feb",
      imagePath: "src/photos/8_Feb.png", // Replace with your image path
      notes:
        "https://drive.google.com/file/d/1Z0QXtVshOEouWvxrvKOhvEdSHkc5PfdQ/view?usp=sharing", // Replace with your link
    },
    {
      id: "class2",
      name: "Class 2 - 22nd Feb",
      imagePath: "src/photos/22_Feb.png", // Replace with your image path
      notes:
        "https://drive.google.com/file/d/1Z0QXtVshOEouWvxrvKOhvEdSHkc5PfdQ/view?usp=sharing", // Replace with your link
    },
    // {
    //   id: "class3",
    //   name: "Class 3 (Hardcoded)",
    //   imagePath: "images/class3.png", // Replace with your image path
    //   notes: "https://drive.google.com/hardcoded3", // Replace with your link
    // },
    // {
    //   id: "class4",
    //   name: "Class 4 (Hardcoded)",
    //   imagePath: "", //no image
    //   notes: "https://drive.google.com/hardcoded4", // Replace with your link
    // },
    // Add more classes as needed
  ];

  const [selectedClass, setSelectedClass] = useState<Class | null>(classes[0]);

  const handleClassSelection = (cls: Class) => {
    setSelectedClass(cls);
  };

  return (
    <div className="flex h-screen p-8 flex-col md:flex-row w-full">
      <div className="w-full md:w-1/4 space-y-4">
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => handleClassSelection(cls)}
            className="w-full py-3 px-4 bg-blue-200 rounded-lg text-center hover:bg-blue-300"
          >
            {cls.name}
          </button>
        ))}
      </div>

      <div className="hidden md:block w-1 border-r border-gray-400 mx-4"></div>

      <div className="w-full md:flex-1 flex flex-col space-y-6">
        {selectedClass ? (
          <>
            <div className="p-6 bg-blue-200 rounded-lg flex-[4] w-full">
              <h2 className="text-lg font-bold">Image</h2>
              {selectedClass.imagePath && (
                <img
                  src={selectedClass.imagePath}
                  alt={selectedClass.name}
                  className="w-full h-auto max-h-96 object-contain"
                />
              )}
            </div>

            <div className="p-6 bg-blue-200 rounded-lg flex-[1] w-full">
              <h2 className="text-lg font-bold">Notes</h2>
              <div className="h-full overflow-auto p-2 border bg-white rounded-md w-full">
                {selectedClass.notes ? (
                  <a
                    href={selectedClass.notes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {selectedClass.notes}
                  </a>
                ) : (
                  <p>No notes available</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a class to see details</p>
        )}
      </div>
    </div>
  );
}
