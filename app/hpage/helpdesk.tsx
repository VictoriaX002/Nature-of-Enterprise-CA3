"use client";

import { useState } from "react";

type Ticket = {
  name: string;
  type: string;
  description: string;
  priority: string;
  status: string;
};

export default function Helpdesk() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const newTicket: Ticket = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      priority: formData.get("priority") as string,
      status: "Open",
    };

    setTickets([...tickets, newTicket]);
    setSubmitted(true);
    form.reset();
  };

  const toggleStatus = (index: number) => {
    const updated = [...tickets];
    updated[index].status =
      updated[index].status === "Open" ? "Resolved" : "Open";
    setTickets(updated);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-gray-900 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-blue-300 pb-2">
          University Helpdesk
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input name="name" required className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Issue Type</label>
              <select name="type" required className="w-full border rounded-lg p-2">
                <option value="">Select</option>
                <option>IT Issue</option>
                <option>Facilities</option>
                <option>General</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" required className="w-full border rounded-lg p-2" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Priority</label>
              <select name="priority" required className="w-full border rounded-lg p-2">
                <option value="">Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
              Submit Ticket
            </button>
          </form>

          {submitted && (
            <p className="text-green-600 mt-4">Ticket submitted.</p>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Submitted Tickets
          </h2>

          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
              >
                <div>
                  <p className="font-bold text-lg">
                    {ticket.name} — {ticket.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    Priority: {ticket.priority}
                  </p>
                  <p className="mt-2">{ticket.description}</p>
                  <p className="mt-2 text-sm">
                    Status: 
                    <span
                      className={`ml-1 font-semibold ${
                        ticket.status === "Open"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => toggleStatus(index)}
                  className="ml-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg text-sm"
                >
                  Toggle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
