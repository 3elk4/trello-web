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
            <div className="form-group">
              <label htmlFor="boardname">Board name:</label>
              <input
                type="text"
                className="form-control mb-3"
                id="boardname"
                name="boardname"
                onChange={this.handleChange}
              />
              <label>Board type:</label>
              <div className="custom-control custom-radio">
                <input
                  defaultChecked
                  type="radio"
                  className="custom-control-input"
                  id="public_board"
                  name="is_public"
                  value="true"
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="public_board">
                  Public
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  id="private_board"
                  name="is_public"
                  value="false"
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="private_board">
                  Private
                </label>
              </div>
            </div>
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
