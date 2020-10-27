import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class BoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardname: "" };
  }

  handleChange = (event) => {
    this.setState({ boardname: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Modal show={this.props.isShow}>
        <Modal.Header closeButton onHide={this.props.handleClose}>
          <Modal.Title>Board Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              Board name:&nbsp;&nbsp;&nbsp;
              <input type="text" onChange={this.handleChange} />
            </label>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(event) => {
              this.handleSubmit(event);
              this.props.handleClose();
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
