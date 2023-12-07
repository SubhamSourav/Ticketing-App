"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteBlock = ({ id, onDelete }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const deleteTicket = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${apiUrl}/api/Tickets/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(); // Triggering the callback to remove ticket from screen
        router.push("/"); // Navigating to the home page after deletion
      }
    } catch (error) {
      console.error("Error deleting ticket: ", error);
      setIsDeleting(false);
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className=" text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
