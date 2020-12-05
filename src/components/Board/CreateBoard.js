import React from "react";
import BoardForm from "./BoardForm";

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }

  handleShow = () => {
    this.setState({ isShow: true });
  };

  handleClose = () => {
    this.setState({ isShow: false });
  };

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleShow}>
          Create new board
        </button>
        <BoardForm
          isShow={this.state.isShow}
          handleClose={this.handleClose}
          handleConfirm={this.props.handleConfirm}
          formTitle="Create new board"
        ></BoardForm>
      </div>
    );
  }
}

export default CreateBoard;
