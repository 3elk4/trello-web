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
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let params = {
      user_id: 1,
      name: this.state.boardname,
      is_public: this.state.is_public,
    };
    this.props.handleConfirm(params);
  };

  render() {
    return (
      <Modal show={this.props.isShow} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Board Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={(event) => event.preventDefault()}>
            <input type="hidden" value={this.props.userToken} />
            <label>
              Board name:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="boardname"
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Type:
              <br />
              <input
                type="radio"
                id="public_board"
                name="is_public"
                value="true"
                onChange={this.handleChange}
              />
              <label htmlFor="public_board">Public</label>
              <br />
              <input
                type="radio"
                id="private_board"
                name="is_public"
                value="false"
                onChange={this.handleChange}
              />
              <label htmlFor="private_board">Private</label>
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
