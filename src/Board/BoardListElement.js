import React from "react";

const BoardListElement = (props) => {
  const moveList = () => {
    props.moveList(props.id);
  };

  return (
    <button
      className="list-group-item list-group-item-action"
      style={{ cursor: "pointer" }}
      onClick={moveList}
    >
      {props.name}
    </button>
  );
};

export default BoardListElement;
