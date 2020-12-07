import React, { createRef } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";
import Editable from "../Editable";
import DueDateBadge from "./DueDateBadge";
import DueDateForm from "./DueDateForm";

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConf: false,
      cardDescription: props.cardDetails.description,
      cardDetails: props.cardDetails,
    };
    this.cardDescriptionRef = createRef();

    this.actionType =
      props.cardDetails.archiving_date === null ? "archive" : "delete";
    this.confirmMessage = `Are you sure you want to ${this.actionType} the "${this.state.cardDetails.name}" card?`;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  changeCardDescription = () => {
    if (this.state.cardDescription !== this.state.cardDetails.description) {
      this.props.changeCardDescription(this.state.cardDescription);
    }
  };

  onConfirm = () => {
    if (this.actionType === "archive") {
      this.props.archiveCard(
        this.state.cardDetails.id,
        this.state.cardDetails.list_id
      );
    } else {
      this.props.deleteCard(
        this.state.cardDetails.id,
        this.state.cardDetails.list_id
      );
    }
    this.props.handleClose();
  };

  saveDueDate = (date) => {
    this.props.changeCardDueDate(date);
  };

  removeDueDate = () => {
    this.props.changeCardDueDate(null);
  };

  render() {
    return (
      <>
        <ConfirmationModal
          confirmMessage={this.confirmMessage}
          isShow={this.state.showConf}
          handleClose={() => this.setState({ showConf: false })}
          onConfirm={this.onConfirm}
        />
        <Modal show={this.props.isShow} onHide={this.props.handleClose}>
          <Modal.Header>
            <div>
              <DueDateBadge date={this.state.cardDetails.deadline} />
              {this.state.cardDetails.name}
            </div>
          </Modal.Header>
          <Modal.Body>
            <pre>
              <Editable
                text={this.state.cardDescription}
                type="textarea"
                placeholder="Enter card description..."
                childRef={this.cardDescriptionRef}
                originalText={this.state.cardDetails.description}
                onConfirm={this.changeCardDescription}
              >
                <textarea
                  className="form-control"
                  ref={this.cardDescriptionRef}
                  type="text"
                  name="cardDescription"
                  value={this.state.cardDescription}
                  onChange={this.handleChange}
                />
              </Editable>
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={this.actionType !== "archive" ? "danger" : "warning"}
              onClick={() => this.setState({ showConf: true })}
              style={{ textTransform: "capitalize" }}
            >
              {this.actionType}
            </Button>
            {this.actionType !== "delete" ? (
              <DueDateForm
                saveDate={this.saveDueDate}
                removeDate={this.removeDueDate}
                currentDate={this.state.cardDetails.deadline}
              />
            ) : null}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CardView;
