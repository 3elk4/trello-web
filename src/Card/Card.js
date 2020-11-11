import { render } from "@testing-library/react";
import React from "react";

const Card = (props) => {
  return (
    <div className="card bg-dark mb-1 mt-1">
      <div className="card-header">{props.name}</div>
      <div className="card-body">LoremIpsum</div>
    </div>
  );
};

export default Card;
