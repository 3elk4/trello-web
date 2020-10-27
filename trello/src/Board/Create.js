import React from "react";
import BoardForm from "./BoardForm";

class Create extends React.Component {
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
        <button className="createListButton" onClick={this.handleShow}>
          Create new board
        </button>
        <BoardForm
          isShow={this.state.isShow}
          handleClose={this.handleClose}
        ></BoardForm>
      </div>
    );
  }
}

export default Create;
