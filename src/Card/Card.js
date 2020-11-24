import React, { useState } from "react";
import CardView from "./CardView";
import * as Helpers from "../Helpers";

const Card = (props) => {
  const [isShow, setShow] = useState(false);
  const [token] = useState(sessionStorage.getItem("authToken"));

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const changeCardDescription = (newDescription) => {
    Helpers.changeCardDescription(
      token,
      props.id,
      props.listId,
      props.boardId,
      newDescription
    );
  };

  return (
    <>
      <div className="bg-dark p-2 mt-2 mb-1">
        <span style={{ cursor: "pointer" }} onClick={handleShow}>
          {props.name}
        </span>
      </div>
      <CardView
        isShow={isShow}
        handleClose={handleClose}
        name={props.name}
        description={props.description}
        changeCardDescription={changeCardDescription}
      />
    </>
  );
};

export default Card;
