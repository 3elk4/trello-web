import React, { createRef } from "react";
import { Button, Modal } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";
import Editable from "../Editable";
import DueDateBadge from "./DueDateBadge";
import DueDateForm from "./DueDateForm";
import * as Helpers from "../../Helpers";
import CommentsView from "../Comments/CommentsView";
import Comment from "../Comments/Comment";
import Labels from "./Labels";
import LabelsDropdown from "./LabelsDropdown";

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConf: false,
      cardDescription: props.cardDetails.description,
      cardDetails: props.cardDetails,
      boardId: props.boardId,
      userId: null,
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

  refreshComments = async () => {
    const comments = await Helpers.getCardComments(
      sessionStorage.getItem("authToken"),
      this.state.boardId,
      this.state.cardDetails.list_id,
      this.state.cardDetails.id
    ).then((comments) => {
      return comments.map((comment, index) => (
        <Comment key={index} text={comment.content} author={comment.username} />
      ));
    });
    this.setState({
      comments: comments,
    });
  };

  addComment = async (comment) => {
    if (
      await Helpers.addCardComment(
        sessionStorage.getItem("authToken"),
        this.state.boardId,
        this.state.cardDetails.list_id,
        this.state.cardDetails.id,
        comment
      )
    ) {
      this.refreshComments();
    }
  };

  assignLabel = async (labelId) => {
    if (
      await Helpers.assignLabel(
        sessionStorage.getItem("authToken"),
        this.state.cardDetails.id,
        labelId
      )
    ) {
      this.props.refresh();
    }
  };

  unassignLabel = async (labelId) => {
    if (
      await Helpers.unassignLabel(
        sessionStorage.getItem("authToken"),
        this.state.cardDetails.id,
        labelId
      )
    ) {
      this.props.refresh();
    }
  };

  componentDidMount = async () => {
    await this.refreshComments();
    const labels = await Helpers.getAllLabels(
      sessionStorage.getItem("authToken")
    );
    this.setState({ allLabels: labels });
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
              <DueDateBadge date={this.props.cardDetails.deadline} />
              <Labels labels={this.props.labels} />
              {this.state.cardDetails.name}
            </div>
            <LabelsDropdown
              actualCardLabels={this.props.labels}
              labels={this.state.allLabels}
              assignLabel={this.assignLabel}
              unassignLabel={this.unassignLabel}
            />
          </Modal.Header>
          <Modal.Body>
            <pre>
              <div style={{ backgroundColor: "#f0f0f0" }}>
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
              </div>
            </pre>
            <div className="d-flex flex-row justify-content-end">
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CommentsView
              comments={this.state.comments}
              addComment={this.addComment}
            />
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CardView;
