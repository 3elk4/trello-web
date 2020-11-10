import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class BoardForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      boardname: null,
      is_public: true,
    };

    this.state = this.initialState;
  }

  handleClose = () => {
    this.props.handleClose();
  };

  handleRadioChange = (value) => {
    this.setState({ is_public: value });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.boardname !== null && this.state.boardname !== "") {
      let params = {
        name: this.state.boardname,
        is_public: this.state.is_public,
      };
      this.props.handleConfirm(params);
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
              <label htmlFor="boardname">Board name:</label>
              <input
                required
                type="text"
                className="form-control mb-3"
                id="boardname"
                name="boardname"
                onChange={this.handleChange}
              />
              <label>Board type:</label>
              <br />
              <ToggleButtonGroup
                type="radio"
                name="is_public"
                defaultValue={true}
                onChange={this.handleRadioChange}
              >
                <ToggleButton value={true}>Public</ToggleButton>
                <br />
                <ToggleButton value={false}>Private</ToggleButton>
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
