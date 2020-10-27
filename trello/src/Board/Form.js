import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Form extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {boardname: 'Test'};
  }

  // handleChange = (event) => {
  //   this.setState({boardname: event.target.value});
  // }

  // handleSubmit = (event) => {
  //   alert('Podano nazwę listy: ' + this.state.boardname);
  //   event.preventDefault();
  // }

  render() {
    return (
            <Modal show={this.props.isShow}>
            <Modal.Header closeButton onHide={this.props.handleClose}>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
            </Modal>

    //   <form onSubmit={this.handleSubmit}>
    //     <label>
    //       Nazwa tablicy:
    //       <input type="text" value={this} onChange={this.handleChange} />
    //     </label>.state.value
    //     <input type="submit" value="Zatwierdź" />
    //   </form>
    );
  }
}

export default Form;