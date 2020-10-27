import React from "react";
import BoardForm from "./BoardForm";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.createBoarEndpoint = "/create_board";
    this.state = { isShow: false };
  }

  handleShow = () => {
    this.setState({ isShow: true });
  };

  handleClose = () => {
    this.setState({ isShow: false });
  };

  handleConfirm = (params) => {
    let requestOps = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.props.userToken,
      },
      body: JSON.stringify(params),
    };

    fetch(this.createBoarEndpoint, requestOps)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <div>
        <button className="createListButton" onClick={this.handleShow}>
          Create new board
        </button>
        <BoardForm
          userToken={this.props.userToken}
          isShow={this.state.isShow}
          handleClose={this.handleClose}
          handleConfirm={this.handleConfirm}
        ></BoardForm>
      </div>
    );
  }
}

export default Create;
