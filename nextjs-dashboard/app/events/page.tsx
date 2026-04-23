"use client";

import { useState } from "react";

type Event = {
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "done";
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState<Event>({
    title: "",
    date: "",
    location: "",
    status: "upcoming",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, form]);
    setForm({ title: "", date: "", location: "", status: "upcoming" });
  };

  const deleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const toggleStatus = (index: number) => {
    const updated = [...events];
    updated[index].status =
      updated[index].status === "upcoming" ? "done" : "upcoming";
    setEvents(updated);
  };

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((e) => e.status === filter);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Society Events</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg mb-6 space-y-3">
        <input
          placeholder="Event title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Event
        </button>
      </form>

      {/* FILTER */}
      <div className="mb-4 space-x-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("upcoming")}>Upcoming</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

      {/* EVENTS */}
      <div className="grid gap-4">
        {filteredEvents.map((event, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>

            <p className="mt-2">
              Status:
              <span
                className={
                  event.status === "upcoming"
                    ? "text-blue-600"
                    : "text-green-600"
                }
              >
                {" "}{event.status}
              </span>
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => toggleStatus(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => deleteEvent(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}