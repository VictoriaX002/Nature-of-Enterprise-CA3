"use client";
import { useState } from "react";
import Link from "next/link";
import { seedEvents, type EventItem } from "@/app/lib/event_data";

const CATEGORIES = ["All", "Arts", "Technology", "Sports", "Music", "Games", "Academic", "Wellness", "Other"];

function getSimilarEvents(current: EventItem, all: EventItem[]): EventItem[] {
  return all.filter((e) => e.id !== current.id && e.category === current.category).slice(0, 2);
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(seedEvents);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", location: "", category: "Other", description: "", expectedAttendance: 20 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([{ ...form, id: `evt-${Date.now()}`, status: "upcoming" }, ...events]);
    setForm({ title: "", date: "", location: "", category: "Other", description: "", expectedAttendance: 20 });
    setShowForm(false);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  const toggleStatus = (id: string) => {
    setEvents(events.map((e) => e.id === id ? { ...e, status: e.status === "upcoming" ? "done" : "upcoming" } : e));
  };

  const filtered = events.filter((e) => {
    const statusMatch = statusFilter === "all" || e.status === statusFilter;
    const catMatch = categoryFilter === "All" || e.category === categoryFilter;
    return statusMatch && catMatch;
  });

  const similarEvents = selectedEvent ? getSimilarEvents(selectedEvent, events) : [];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
      </div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Society Events</h1>
          <p className="text-gray-500 mt-1">Browse and manage campus society events</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          {showForm ? "Cancel" : "+ Add Event"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6 space-y-4" aria-label="Add new event form">
          <h2 className="text-xl font-semibold text-gray-700">New Event</h2>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input id="title" type="text" required placeholder="e.g. Chess Club Meeting" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input id="date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input id="location" type="text" required placeholder="e.g. Room 204" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {CATEGORIES.filter((c) => c !== "All").map((cat) => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-1">Expected Attendance</label>
              <input id="attendance" type="number" min={1} value={form.expectedAttendance} onChange={(e) => setForm({ ...form, expectedAttendance: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" rows={2} placeholder="Brief description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Save Event</button>
        </form>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {["all", "upcoming", "done"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${statusFilter === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <select aria-label="Filter by category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📅</p>
          <p className="text-lg">No events found. Try a different filter or add a new event.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <div key={event.id} onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)} className={`bg-white rounded-xl shadow p-5 flex flex-col justify-between cursor-pointer border-2 transition-colors ${selectedEvent?.id === event.id ? "border-blue-500" : "border-transparent hover:border-blue-200"}`}>
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{event.category}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${event.status === "upcoming" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{event.status === "upcoming" ? "Upcoming" : "Done"}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mt-2">{event.title}</h2>
                <p className="text-sm text-gray-500 mt-1">📅 {event.date}</p>
                <p className="text-sm text-gray-500">📍 {event.location}</p>
                <p className="text-sm text-gray-500">👥 Expected: {event.expectedAttendance}</p>
                {event.description && <p className="text-sm text-gray-600 mt-2">{event.description}</p>}
              </div>
              <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => toggleStatus(event.id)} aria-label={`Mark ${event.title} as ${event.status === "upcoming" ? "done" : "upcoming"}`} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-1.5 rounded-lg transition-colors">
                  Mark {event.status === "upcoming" ? "Done" : "Upcoming"}
                </button>
                <button onClick={() => deleteEvent(event.id)} aria-label={`Delete ${event.title}`} className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">🤖 Similar Events to "{selectedEvent.title}"</h2>
          <p className="text-sm text-gray-500 mb-4">Recommended based on category matching — <span className="font-medium">{selectedEvent.category}</span></p>
          {similarEvents.length === 0 ? (
            <p className="text-gray-400 text-sm">No similar events found in this category yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {similarEvents.map((e) => (
                <div key={e.id} className="border border-blue-100 rounded-lg p-4 bg-blue-50">
                  <p className="font-semibold text-gray-800">{e.title}</p>
                  <p className="text-sm text-gray-500">📅 {e.date} · 📍 {e.location}</p>
                  <p className="text-sm text-gray-600 mt-1">{e.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
