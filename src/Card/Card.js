import React from "react";

const Card = (props) => {
  return (
    <div className="bg-dark p-2 mt-2 mb-1">
      <span style={{ cursor: "pointer" }}>{props.name}</span>
    </div>
  );
};

export default Card;
