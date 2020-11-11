import React from "react";
import ActionButton from "../ActionButton";

const BoardCard = (props) => {
  const boardDetails = props.boardDetails;
  const actionType =
    boardDetails.archiving_date === null ? "archive" : "delete";
  const confirmMessage = `Are you sure you want to ${actionType} the "${boardDetails.name}" board?`;

  const onConfirm = (boardId) => {
    if (boardDetails.archiving_date === null) {
      props.archiveBoard(boardId);
    } else {
      props.deleteBoard(boardId);
    }
  };

  return (
    <div className="col-sm-3 pl-1 pr-1 mb-4 d-flex">
      <div className="card text-center bg-secondary text-white rounded-top w-100">
        <div className="card-header">
          {boardDetails.is_public ? "Public" : "Private"}
        </div>
        <div className="card-body" style={{ transform: "rotate(0)" }}>
          <a
            href={`/board/${boardDetails.id}`}
            className="alert-link text-white stretched-link"
          >
            {boardDetails.name}
          </a>
        </div>
        <div className="card-footer p-0">
          <ActionButton
            id={boardDetails.id}
            confirmMessage={confirmMessage}
            onConfirm={onConfirm}
            actionType={actionType}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
