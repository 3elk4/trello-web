import React from "react";
import { Modal, Button } from "react-bootstrap";

class ConfirmationModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.isShow} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.confirmMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="dark"
            onClick={this.props.handleClose}
            className="pl-5 pr-5"
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              this.props.onConfirm(this.props.boardId);
              this.props.handleClose();
            }}
            className="pl-5 pr-5"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal;
