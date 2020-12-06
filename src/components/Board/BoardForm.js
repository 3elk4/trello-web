import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class BoardForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      boardName: null,
      isPublic: true,
    };

    this.state = this.initialState;
  }

  handleClose = () => {
    this.props.handleClose();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name + ": " + value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.boardName !== null && this.state.boardName !== "") {
      let params = {
        name: this.state.boardName,
        is_public: this.state.isPublic,
      };
      this.props.handleConfirm(params);
      this.setState(this.initialState);
    }
  };

  render() {
    return (
      <Modal show={this.props.isShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.formTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-group">
              <label htmlFor="boardName">Board name:</label>
              <input
                required
                type="text"
                className="form-control mb-3"
                id="boardName"
                name="boardName"
                onChange={this.handleChange}
              />
              <label>Board type:</label>
              <br />
              <ToggleButtonGroup
                type="radio"
                name="isPublic"
                defaultValue={true}
              >
                <ToggleButton value={true} onChange={this.handleChange}>
                  Public
                </ToggleButton>
                <br />
                <ToggleButton value={false} onChange={this.handleChange}>
                  Private
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={(event) => {
              this.handleSubmit(event);
              this.handleClose();
            }}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BoardForm;
