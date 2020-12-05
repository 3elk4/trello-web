import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import ActionButton from "../ActionButton";
import Editable from "../Editable";

const CardView = (props) => {
  const [cardDescription, setCardDescription] = useState(
    props.cardDetails.description
  );
  const [cardDetails] = useState(props.cardDetails);

  const cardDescriptionRef = useRef();

  const actionType =
    props.cardDetails.archiving_date === null ? "archive" : "delete";
  const confirmMessage = `Are you sure you want to ${actionType} the "${cardDetails.name}" card?`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "cardDescription") {
      setCardDescription(value);
    }
  };

  const changeCardDescription = () => {
    if (cardDescription !== cardDetails.description) {
      props.changeCardDescription(cardDescription);
    }
  };

  const onConfirm = (cardId) => {
    if (actionType === "archive") {
      props.archiveCard(cardId, cardDetails.list_id);
    } else {
      props.deleteCard(cardId, cardDetails.list_id);
    }
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.isShow} onHide={props.handleClose}>
        <Modal.Header>{cardDetails.name}</Modal.Header>
        <Modal.Body>
          <pre>
            <Editable
              text={cardDescription}
              type="textarea"
              placeholder="Enter card description..."
              childRef={cardDescriptionRef}
              originalText={cardDetails.description}
              onConfirm={changeCardDescription}
            >
              <textarea
                className="form-control"
                ref={cardDescriptionRef}
                type="text"
                name="cardDescription"
                value={cardDescription}
                onChange={handleChange}
              />
            </Editable>
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <ActionButton
            id={cardDetails.id}
            confirmMessage={confirmMessage}
            onConfirm={onConfirm}
            actionType={actionType}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardView;
