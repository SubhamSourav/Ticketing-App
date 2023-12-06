import React from "react";

const PriorityComponent = ({ priority }) => {
  let textColor = "";

  switch (priority.toLowerCase()) {
    case "low":
      textColor = "green";
      break;
    case "medium":
      textColor = "blue";
      break;
    case "high":
      textColor = "orange";
      break;
    case "very high":
      textColor = "red";
      break;
    default:
      textColor = "black";
      break;
  }

  return <div style={{ color: textColor }}>{priority} Priority</div>;
};

export default PriorityComponent;
