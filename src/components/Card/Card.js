import React, { useState } from "react";
import CardView from "./CardView";
import * as Helpers from "../../Helpers";
import DueDateBadge from "./DueDateBadge";
import Labels from "./Labels";

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

  const changeCardName = async (newName) => {
    if (
      await Helpers.changeCardName(
        token,
        props.cardDetails.id,
        props.cardDetails.list_id,
        props.boardId,
        newName
      )
    ) {
      props.refreshCards();
    }
  };

  const changeCardDueDate = async (date) => {
    if (
      await Helpers.changeDueDate(
        token,
        props.cardDetails.id,
        props.cardDetails.list_id,
        props.boardId,
        date
      )
    ) {
      props.refreshCards();
    }
  };

  const archiveCard = async (cardId, listId) => {
    if (await Helpers.archiveCard(token, cardId, listId, props.boardId)) {
      Helpers.newActivity(
        token,
        props.boardId,
        sessionStorage.getItem("user_id"),
        `User <b>${sessionStorage.getItem("username")}</b> archived <b>${
          props.cardDetails.name
        }</b> card.`
      ).then(() => {
        props.refreshActivity();
        props.refreshCards();
        props.refreshArchivedElements();
      });
    }
  };

  const deleteCard = async (cardId, listId) => {
    if (await Helpers.deleteCard(token, cardId, listId, props.boardId)) {
      props.refreshCards();
      props.refreshArchivedElements();
      //TODO: Add activity information about card deletion, check if necessary
    }
  };

  return (
    <>
      <div
        className="bg-dark p-2 mt-2 mb-1 rounded"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <DueDateBadge
          date={props.cardDetails.deadline}
          metDeadline={props.cardDetails.is_deadline_met}
        />
        <Labels labels={props.labels} />
        <span>{props.cardDetails.name}</span>
      </div>
      <CardView
        isShow={isShow}
        handleClose={handleClose}
        changeCardDescription={changeCardDescription}
        changeCardName={changeCardName}
        changeCardDueDate={changeCardDueDate}
        cardDetails={props.cardDetails}
        archiveCard={archiveCard}
        deleteCard={deleteCard}
        boardId={props.boardId}
        labels={props.labels}
        refresh={props.refreshCards}
      />
    </>
  );
};

export default Card;
