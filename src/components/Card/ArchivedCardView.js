import React from "react";
import { Button, Modal } from "react-bootstrap";
import DueDateBadge from "./DueDateBadge";
import Labels from "./Labels";

export default class ArchivedCardView extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.isShow} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <div>
              {this.props.cardDetails.deadline ? (
                <div className="mb-0">
                  <DueDateBadge
                    date={this.props.cardDetails.deadline}
                    metDeadline={this.props.cardDetails.is_deadline_met}
                  />
                </div>
              ) : null}
              <Labels labels={this.props.labels} />
              {this.props.cardDetails.name}
            </div>
          </Modal.Header>
          <Modal.Body>
            <pre>
              <div className="p-3" style={{ backgroundColor: "#f0f0f0" }}>
                {this.props.cardDetails.description}
              </div>
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
