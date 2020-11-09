import React from "react";
import { Modal } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";

class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchiveConfirm: false,
    };
  }

  showArchiveConfirm = () => {
    this.setState({
      showArchiveConfirm: true,
    });
  };

  hideArchiveConfirm = () => {
    this.setState({
      showArchiveConfirm: false,
    });
  };

  render() {
    return (
      <div className="d-flex justify-content-end w-100 rounded-bottom border-top mt-3 p-1 border-dark">
        <button className="btn btn-danger" onClick={this.showArchiveConfirm}>
          Archive
        </button>
        <ConfirmationModal
          isShow={this.state.showArchiveConfirm}
          confirmMessage={
            'Are you sure you want to archive the "' +
            this.props.boardname +
            '" board?'
          }
          handleClose={this.hideArchiveConfirm}
          success={this.props.archiveBoard}
          boardId={this.props.id}
        />
      </div>
    );
  }
}

export default Archive;