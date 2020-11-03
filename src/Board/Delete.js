import React from "react";
import { Modal } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showdDeleteConfirm: false,
    };
  }

  showDeleteConfirm = () => {
    this.setState({
      showdDeleteConfirm: true,
    });
  };

  hideDeleteConfirm = () => {
    this.setState({
      showdDeleteConfirm: false,
    });
  };

  render() {
    return (
      <div className="d-flex justify-content-end w-100 rounded-bottom border-top mt-3 p-1 border-dark">
        <button className="btn btn-danger" onClick={this.showDeleteConfirm}>
          Delete
        </button>
        <ConfirmationModal
          isShow={this.state.showdDeleteConfirm}
          confirmMessage={
            'Are you sure you want to delete the "' +
            this.props.boardname +
            '" board?'
          }
          handleClose={this.hideDeleteConfirm}
          deleteBoard={this.props.deleteBoard}
          boardId={this.props.id}
        />
      </div>
    );
  }
}

export default Delete;
