import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import Editable from "../Editable";

const CardView = (props) => {
  const [cardDescription, setCardDescription] = useState(props.description);

  const cardDescriptionRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "cardDescription") {
      setCardDescription(value);
    }
  };

  const changeCardDescription = () => {
    if (cardDescription !== props.description) {
      props.changeCardDescription(cardDescription);
    }
  };

  return (
    <>
      <Modal show={props.isShow} onHide={props.handleClose}>
        <Modal.Header>{props.name}</Modal.Header>
        <Modal.Body>
          <pre>
            <Editable
              text={cardDescription}
              type="textarea"
              placeholder="Enter card description..."
              childRef={cardDescriptionRef}
              originalText={props.description}
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
      </Modal>
    </>
  );
};

export default CardView;
