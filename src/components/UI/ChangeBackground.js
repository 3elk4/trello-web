import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import * as Helpers from "../../Helpers";

class ChangeBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundFile: null,
      token: sessionStorage.getItem("authToken"),
      boardId: props.boardId,
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      backgroundFile: file,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.backgroundFile != null) {
      if (
        await Helpers.addBackgroundToBoard(
          this.state.token,
          this.state.boardId,
          this.state.backgroundFile
        )
      ) {
        this.props.handleClose();
        window.location.reload();
      }
    }
  };

  render() {
    return (
      <Modal show={this.props.isShow} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="backgroundFile">Select file: </label>
              <input
                type="file"
                accept="image/*"
                className="form-control-file"
                id="backgroundFile"
                name="backgroundFile"
                onChange={this.handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChangeBackground;
