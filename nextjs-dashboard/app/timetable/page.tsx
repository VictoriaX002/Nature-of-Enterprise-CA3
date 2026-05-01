"use client";
import Link from "next/link";

const timetable = [
  {
    day: "Monday",
    classes: [
      { time: "09:00 - 10:00", module: "Nature of Enterprise Computing", room: "Room 201, Grangegorman", lecturer: "Dr. Murphy" },
      { time: "11:00 - 12:00", module: "Mathematics for Computing", room: "Room 105, Grangegorman", lecturer: "Dr. O'Brien" },
      { time: "14:00 - 15:00", module: "Web Development", room: "Computer Lab A", lecturer: "Ms. Kelly" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "09:00 - 10:00", module: "Data Structures & Algorithms", room: "Room 302, Grangegorman", lecturer: "Dr. Walsh" },
      { time: "12:00 - 13:00", module: "Database Systems", room: "Computer Lab B", lecturer: "Mr. Ryan" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "10:00 - 11:00", module: "Nature of Enterprise Computing", room: "Room 201, Grangegorman", lecturer: "Dr. Murphy" },
      { time: "13:00 - 14:00", module: "Web Development", room: "Computer Lab A", lecturer: "Ms. Kelly" },
      { time: "15:00 - 16:00", module: "Professional Skills", room: "Room 110, Grangegorman", lecturer: "Ms. Brennan" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { time: "09:00 - 10:00", module: "Mathematics for Computing", room: "Room 105, Grangegorman", lecturer: "Dr. O'Brien" },
      { time: "11:00 - 13:00", module: "Database Systems Lab", room: "Computer Lab B", lecturer: "Mr. Ryan" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "10:00 - 11:00", module: "Data Structures & Algorithms", room: "Room 302, Grangegorman", lecturer: "Dr. Walsh" },
      { time: "12:00 - 13:00", module: "Professional Skills", room: "Room 110, Grangegorman", lecturer: "Ms. Brennan" },
    ],
  },
];

const dayColors: Record<string, string> = {
  Monday: "bg-blue-600",
  Tuesday: "bg-purple-600",
  Wednesday: "bg-green-600",
  Thursday: "bg-orange-500",
  Friday: "bg-pink-600",
};

export default function TimetablePage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-600 px-6 py-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-sm text-blue-100 hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">
            📆 Weekly Timetable
          </h1>
          <p className="text-blue-100 mt-1 text-sm">
            BSc Computing — Year 1 — Semester 2 — TU Dublin
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-3">
          {Object.entries(dayColors).map(([day, color]) => (
            <div key={day} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm font-medium text-gray-600">{day}</span>
            </div>
          ))}
        </div>

        {/* Timetable Grid */}
        <div className="space-y-6">
          {timetable.map((dayData) => (
            <div key={dayData.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Day Header */}
              <div className={`${dayColors[dayData.day]} px-6 py-3`}>
                <h2 className="text-lg font-bold text-white">{dayData.day}</h2>
              </div>

              {/* Classes */}
              <div className="divide-y divide-gray-50">
                {dayData.classes.map((cls, i) => (
                  <div key={i} className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 hover:bg-gray-50 transition-colors">

                    {/* Time */}
                    <div className="min-w-[130px]">
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {cls.time}
                      </span>
                    </div>

                    {/* Module */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{cls.module}</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        👤 {cls.lecturer}
                      </p>
                    </div>

                    {/* Room */}
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">
                        📍 {cls.room}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800">
          <strong>Note:</strong> This timetable contains fictional data created for the Campus Companion CA3 project. All module names, lecturers, and room numbers are fictional.
        </div>

      </div>
    </main>
  );
}