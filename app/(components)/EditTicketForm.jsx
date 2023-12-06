"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: "low",
    category: "IT Ticket",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    // Wait for 2 seconds before redirecting to home page
    setTimeout(() => {
      router.refresh();
      router.push("/");
    }, 2000);
  };

  const categories = [
    "IT Ticket",
    "HRdirect",
    "(OEC) Office of Ethics & Compliance",
    "Car Fleet",
    "Travel & Expense",
    "O2I On-Prem & Cloud",
    "Facility",
    "Procure to Pay",
  ];

  return (
    <div className=" flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Ticket Type</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories?.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-low"
            name="priority"
            type="radio"
            onChange={handleChange}
            value="Low"
            checked={formData.priority === "Low"}
          />
          <label className="text-green-200">Low</label>
          <input
            id="priority-medium"
            name="priority"
            type="radio"
            onChange={handleChange}
            value="Medium"
            checked={formData.priority === "Medium"}
          />
          <label className="text-blue-200">Medium</label>
          <input
            id="priority-high"
            name="priority"
            type="radio"
            onChange={handleChange}
            value="High"
            checked={formData.priority === "High"}
          />
          <label className="text-orange-200">High</label>
          <input
            id="priority-very-high"
            name="priority"
            type="radio"
            onChange={handleChange}
            value="Very High"
            checked={formData.priority === "Very High"}
          />
          <label className="text-red-200">Very High</label>
        </div>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default EditTicketForm;
