"use client";

// --- Training data used to predict ticket priority ---
const trainingData = [
  { type: "IT Issue", description: "wifi not working in lab", priority: "High" },
  { type: "IT Issue", description: "cannot login to system", priority: "High" },
  { type: "Facilities", description: "door not working", priority: "Medium" },
  { type: "Facilities", description: "chair broken in classroom", priority: "Medium" },
  { type: "General", description: "question about timetable", priority: "Low" },
  { type: "General", description: "need information about event", priority: "Low" },
];

/**
 * Predicts the priority of a ticket based on its description and type.
 * It compares the new ticket against training examples using simple word matching.
 * The priority with the highest score wins.
 */
function predictPriority(description: string, type: string): string {
  const text = description.toLowerCase();

  // Start all priorities at 0
  let scores = { High: 0, Medium: 0, Low: 0 };

  trainingData.forEach((item) => {
    // Bonus points if the issue type matches
    if (item.type === type) {
      scores[item.priority as keyof typeof scores] += 2;
    }

    // Bonus points for each matching word in the description
    const words = item.description.split(" ");
    words.forEach((word) => {
      if (text.includes(word)) {
        scores[item.priority as keyof typeof scores] += 1;
      }
    });
  });

  // Return the priority with the highest score
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

import { useState } from "react";

// Shape of a single helpdesk ticket
type Ticket = {
  name: string;
  type: string;
  description: string;
  priority: string; // "High" | "Medium" | "Low"
  status: string;   // "Open" | "Resolved"
};

export default function Helpdesk() {
  // All submitted tickets
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // Controls the success message after submitting
  const [submitted, setSubmitted] = useState(false);

  // Runs when the user clicks "Submit Ticket"
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const description = formData.get("description") as string;

    // Build the new ticket, auto-predicting its priority
    const newTicket: Ticket = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description,
      priority: predictPriority(description, formData.get("type") as string),
      status: "Open",
    };

    setTickets([...tickets, newTicket]);
    setSubmitted(true);
    form.reset();

    // Hide the success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Flips a ticket between "Open" and "Resolved"
  const toggleStatus = (index: number) => {
    const updated = [...tickets];
    updated[index].status = updated[index].status === "Open" ? "Resolved" : "Open";
    setTickets(updated);
  };

  // Tailwind classes for each priority level badge
  const priorityStyles: Record<string, string> = {
    High: "bg-red-100 text-red-700 border border-red-200",
    Medium: "bg-amber-100 text-amber-700 border border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-200 px-4 py-10">

      {/* Background decorative blobs — purely visual, ignore these */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-300 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-indigo-300 opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-1">
            Support Portal
          </p>
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">
            University Helpdesk
          </h1>
          <p className="mt-1 text-sm text-blue-500">
            Submit an issue and track it in real time
          </p>
        </div>

        {/* Two-column layout: form on left, tickets on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ── FORM CARD ── */}
          <div className="bg-white/75 backdrop-blur-md border border-white/90 rounded-2xl shadow-lg shadow-blue-200 p-6">
            <h2 className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-5">
              New Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Alex Murphy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Issue type dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Issue Type
                </label>
                <select
                  name="type"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select a category</option>
                  <option>IT Issue</option>
                  <option>Facilities</option>
                  <option>General</option>
                </select>
              </div>

              {/* Description textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  placeholder="Describe your issue in detail..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none min-h-[90px]"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-600 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 shadow-md shadow-blue-300 hover:shadow-blue-400"
              >
                Submit Ticket →
              </button>
            </form>

            {/* Success message — shown briefly after submitting */}
            {submitted && (
              <div className="mt-4 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-sm">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ticket submitted successfully
              </div>
            )}
          </div>

          {/* ── TICKETS PANEL ── */}
          <div>

            {/* Stats row — only shown once there's at least one ticket */}
            {tickets.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Total",         value: tickets.length,                                      color: "text-blue-900" },
                  { label: "Open",          value: tickets.filter(t => t.status === "Open").length,     color: "text-red-600"  },
                  { label: "High Priority", value: tickets.filter(t => t.priority === "High").length,   color: "text-amber-600"},
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/75 backdrop-blur-md border border-white/90 rounded-xl p-3 text-center shadow shadow-blue-100">
                    <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-3">
              Submitted Tickets
            </h2>

            {/* Empty state */}
            {tickets.length === 0 ? (
              <div className="bg-white/50 border border-dashed border-blue-300 rounded-2xl py-10 text-center text-sm text-blue-400">
                No tickets yet — submit one to get started.
              </div>
            ) : (
              /* Ticket list */
              <div className="space-y-3">
                {tickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="bg-white/75 backdrop-blur-md border border-white/90 rounded-2xl p-4 shadow shadow-blue-100 hover:shadow-md hover:border-blue-300 hover:translate-x-0.5 transition-all duration-150"
                  >
                    {/* Ticket header: name + priority badge */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{ticket.name}</p>
                        <p className="text-xs text-slate-400">{ticket.type}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityStyles[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>

                    {/* Ticket description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{ticket.description}</p>

                    {/* Ticket footer: status badge + toggle button */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ticket.status === "Open"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                        {ticket.status}
                      </span>
                      <button
                        onClick={() => toggleStatus(index)}
                        className="text-xs font-medium text-slate-500 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-all duration-150"
                      >
                        Toggle status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
