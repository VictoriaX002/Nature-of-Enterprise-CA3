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
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>Helpdesk</h1>

      <form onSubmit={handleSubmit} style={{
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px"
      }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Name:</label><br />
          <input id="name" name="name" type="text" required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="type">Issue Type:</label><br />
          <select id="type" name="type" required style={{ width: "100%", padding: "8px" }}>
            <option value="">Select</option>
            <option>IT Issue</option>
            <option>Facilities</option>
            <option>General</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Description:</label><br />
          <textarea id="description" name="description" required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="priority">Priority:</label><br />
          <select id="priority" name="priority" required style={{ width: "100%", padding: "8px" }}>
            <option value="">Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button style={{
          marginTop: "10px",
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Submit Ticket
        </button>
      </form>

      {submitted && <p style={{ color: "green" }}>Ticket submitted ✅</p>}

      <h2 style={{ marginTop: "30px" }}>Submitted Tickets</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tickets.map((ticket, index) => (
          <li key={index} style={{
            background: "#eee",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}>
            <strong>{ticket.name}</strong> - {ticket.type} ({ticket.priority})
            <br />
            {ticket.description}
          </li>
        ))}
      </ul>
    </div>
  );
}