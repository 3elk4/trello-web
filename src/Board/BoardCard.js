import React from "react";
import ActionButton from "./ActionButton";

const BoardCard = (props) => {
  const boardDetails = props.boardDetails;
  const actionType =
    boardDetails.archiving_date === null ? "archive" : "delete";
  const confirmMessage = `Are you sure you want to ${actionType} the ${boardDetails.name} board?`;

  const onConfirm = (boardId) => {
    if (boardDetails.archiving_date === null) {
      props.archiveBoard(boardId);
    } else {
      props.deleteBoard(boardId);
    }
  };

  return (
    <div className="col-sm-3 mb-4">
      <div className="card text-center bg-secondary text-white rounded-top">
        <div className="card-header">{boardDetails.name}</div>
        <div className="card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="card-footer pl-0 pr-0 pb-0">
          {boardDetails.is_public ? "Public" : "Private"}
          <ActionButton
            boardId={boardDetails.id}
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
