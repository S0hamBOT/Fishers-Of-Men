// import React, { useEffect, useState, useRef } from 'react';
// import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
// import { db } from '../lib/firebase';

// export function UpcomingEvents() {
//   const [events, setEvents] = useState<any[]>([]);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const now = new Date();
//     const eventsRef = collection(db, 'events');
//     const q = query(
//       eventsRef,
//       where('date', '>=', now),
//       orderBy('date'),
//       limit(5)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const newEvents = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setEvents(newEvents);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer || events.length <= 3) return;

//     let scrollPos = 0;
//     const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
//     const scrollSpeed = 50;

//     const scroll = () => {
//       if (!scrollContainer) return;

//       scrollPos = (scrollPos + 1) % (maxScroll + scrollContainer.clientHeight);
//       scrollContainer.scrollTop = scrollPos;
//     };

//     const interval = setInterval(scroll, scrollSpeed);
//     return () => clearInterval(interval);
//   }, [events]);

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-md">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
//       <div
//         ref={scrollRef}
//         className="overflow-hidden h-[300px]"
//       >
//         {events.map(event => (
//           <div
//             key={event.id}
//             className="mb-4 p-4 border border-gray-200 rounded-lg"
//           >
//             <h3 className="font-medium text-gray-900">{event.title}</h3>
//             <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//             <p className="text-sm text-gray-400 mt-2">
//               {event.date.toDate().toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export function UpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("date", ">=", now),
      orderBy("date"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(newEvents);
      setLoading(false);
    });

    // Initialize with some events if none exist
    const initializeEvents = async () => {
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        const initialEvents = [
          {
            title: "JavaScript Fundamentals Quiz",
            description: "Test your knowledge of JavaScript basics",
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 2 days from now
            type: "quiz",
          },
          {
            title: "React Hooks Workshop",
            description: "Learn advanced React Hook patterns",
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 5 days from now
            type: "course",
          },
          {
            title: "Algorithm Challenge",
            description: "Weekly algorithm practice session",
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            type: "practice",
          },
        ];

        for (const event of initialEvents) {
          try {
            const eventRef = collection(db, "events");
            await addDoc(eventRef, {
              ...event,
              date: Timestamp.fromDate(event.date),
            });
          } catch (error) {
            console.error("Error adding event:", error);
          }
        }
      }
    };

    initializeEvents();
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h2>
        <div className="animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h2>
        <p className="text-gray-500">No upcoming events scheduled.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Events
      </h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
          >
            <h3 className="font-medium text-gray-900">{event.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              {event.date.toDate().toLocaleDateString()} at{" "}
              {event.date
                .toDate()
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
