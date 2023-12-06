import DeleteBlock from "./DeleteBlock";
import PriorityComponent from "./Priority";
import Link from "next/link";

const TicketCard = ({ ticket }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(ticket.createdAt);

  let priorityClass = "";

  switch (ticket.priority.toLowerCase()) {
    case "low":
      priorityClass = "bg-green-200"; // Change background color for Low priority
      break;
    case "medium":
      priorityClass = "bg-blue-200"; // Change background color for Medium priority
      break;
    case "high":
      priorityClass = "bg-orange-200"; // Change background color for High priority
      break;
    case "very high":
      priorityClass = "bg-red-200"; // Change background color for Very High priority
      break;
    default:
      priorityClass = "bg-gray-200"; // Default background color
      break;
  }

  return (
    <div
      className={`flex flex-col hover:bg-card-hover rounded-md shadow-lg p-3 m-2 ${priorityClass}`}
      style={{ color: "midnightblue" }}
    >
      <div className="flex mb-3">
        {<PriorityComponent priority={ticket.priority} />}
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{ticket.title}</h4>
        <hr className="h-px  border-0 bg-page mb-2 "></hr>
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs  my-1">{createdDateTime}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
