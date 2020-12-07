import React, { useState } from "react";
import CardView from "./CardView";
import * as Helpers from "../../Helpers";
import DueDateBadge from "./DueDateBadge";

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
      props.cardDetails.id,
      props.cardDetails.list_id,
      props.boardId,
      newDescription
    );
  };

  const changeCardDueDate = async (date) => {
    await Helpers.changeDueDate(
      token,
      props.cardDetails.id,
      props.cardDetails.list_id,
      props.boardId,
      date
    );
    handleClose();
    props.refreshCards();
  };

  const archiveCard = async (cardId, listId) => {
    if (await Helpers.archiveCard(token, cardId, listId, props.boardId)) {
      props.refreshCards();
      props.refreshArchivedElements();
    }
  };

  const deleteCard = async (cardId, listId) => {
    if (await Helpers.deleteCard(token, cardId, listId, props.boardId)) {
      props.refreshCards();
      props.refreshArchivedElements();
    }
  };

  return (
    <>
      <div className="bg-dark p-2 mt-2 mb-1">
        <DueDateBadge date={props.cardDetails.deadline} />
        <span style={{ cursor: "pointer" }} onClick={handleShow}>
          {props.cardDetails.name}
        </span>
      </div>
      <CardView
        isShow={isShow}
        handleClose={handleClose}
        changeCardDescription={changeCardDescription}
        changeCardDueDate={changeCardDueDate}
        cardDetails={props.cardDetails}
        archiveCard={archiveCard}
        deleteCard={deleteCard}
      />
    </>
  );
};

export default Card;
