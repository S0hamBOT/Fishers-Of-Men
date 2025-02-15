// import { useState, useEffect } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../lib/firebase"; // Correct the path if needed
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

// interface Class {
//   id: string;
//   name: string;
//   description: string;
//   notes?: string;
//   notesPDF?: string;
// }

// function isClass(obj: any): obj is Class {
//   return (
//     typeof obj === "object" &&
//     obj !== null &&
//     typeof obj.id === "string" &&
//     typeof obj.name === "string" &&
//     typeof obj.description === "string" &&
//     (obj.notes === undefined || typeof obj.notes === "string") &&
//     (obj.notesPDF === undefined || typeof obj.notesPDF === "string")
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

//       // Set initial selected class if available
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
//     <div className="flex h-screen p-8">
//       <div className="w-1/4 space-y-4">
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

//       <div className="w-1 border-r border-gray-400 mx-4"></div>

//       <div className="w-3/4 space-y-6">
//         {selectedClass ? (
//           <>
//             <div className="p-6 bg-blue-200 rounded-lg">
//               <h2 className="text-lg font-bold">Description</h2>
//               <p>{selectedClass.description}</p>
//             </div>

//             <div className="p-6 bg-blue-200 rounded-lg">
//               <h2 className="text-lg font-bold">Notes</h2>
//               {selectedClass.notesPDF ? (
//                 <div className="h-96 overflow-auto border p-2">
//                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//                     <Viewer fileUrl={selectedClass.notesPDF} />
//                   </Worker>
//                 </div>
//               ) : (
//                 <div className="h-48 overflow-auto p-2 border bg-white rounded-md">
//                   <p>{selectedClass.notes || "No notes available"}</p>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">Select a class to see details</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Class {
  id: string;
  name: string;
  description: string;
  notes?: string;
}

function isClass(obj: any): obj is Class {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    (obj.notes === undefined || typeof obj.notes === "string")
  );
}

export function Calendar() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "calendar"), (snapshot) => {
      const fetchedClasses = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

      const validClasses = fetchedClasses.filter(isClass);
      setClasses(validClasses);

      if (validClasses.length > 0) {
        setSelectedClass(validClasses[0]);
      }
    });

    return () => unsubscribe();
  }, []);

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
              <h2 className="text-lg font-bold">Description</h2>
              <p>{selectedClass.description}</p>
            </div>

            <div className="p-6 bg-blue-200 rounded-lg flex-[1] w-full">
              <h2 className="text-lg font-bold">Notes</h2>
              <div className="h-full overflow-auto p-2 border bg-white rounded-md w-full">
                <p>{selectedClass.notes || "No notes available"}</p>
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
