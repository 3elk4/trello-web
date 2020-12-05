import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";

const BoardCard = (props) => {
  const [showConf, setShowConf] = useState(false);
  const boardDetails = props.boardDetails;
  const actionType = boardDetails.archiving_date === null ? "close" : "delete";
  const confirmMessage = `Are you sure you want to ${actionType} the "${boardDetails.name}" board?`;

  const onConfirm = () => {
    if (actionType === "close") {
      props.archiveBoard(boardDetails.id);
    } else {
      props.deleteBoard(boardDetails.id);
    }
  };

  return (
    <>
      <ConfirmationModal
        confirmMessage={confirmMessage}
        isShow={showConf}
        handleClose={() => setShowConf(false)}
        onConfirm={onConfirm}
      />
      <div className="col-sm-3 col-md-2 pl-1 pr-1 mb-4 d-flex">
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
          <div className="card-footer p-1">
            <Button
              variant={actionType !== "close" ? "danger" : "warning"}
              onClick={() => setShowConf(true)}
              style={{ textTransform: "capitalize" }}
              className="float-right"
            >
              {actionType} board
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardCard;
