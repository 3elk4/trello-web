import React from "react";

const BoardListElement = (props) => {
  const moveList = () => {
    props.moveList(props.id);
  };

  return (
    <p>
      <a href="#" onClick={moveList}>
        {props.name}
      </a>
    </p>
  );
};

export default BoardListElement;
