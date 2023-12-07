"use client";
import React, { useState, useEffect } from "react";
import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  const [ticketsData, setTicketsData] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const getTickets = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/Tickets`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await res.json();
      setTicketsData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-6xl font-bold mb-8">Error loading tickets.</p>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  const handleDelete = () => {
    setIsDeleted(true);
    getTickets();
  };

  if (
    !ticketsData ||
    !ticketsData.tickets ||
    ticketsData.tickets.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-6xl font-bold mb-8">No tickets available.</p>
        <p className="text-lg">Click on Ticket Logo to create a ticket.</p>
      </div>
    );
  }

  const tickets = ticketsData.tickets;

  const uniqueCategories = [
    ...new Set(tickets.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, index) => (
                  <TicketCard
                    id={index}
                    key={index}
                    ticket={filteredTicket}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
