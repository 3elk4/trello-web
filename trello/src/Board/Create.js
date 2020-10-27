import React from 'react';
import Form from './Form';

class Create extends React.Component { 
    constructor(props){
      super(props)
      this.state = {isShow: false}
    }
    
    handleShow = () => {
      this.setState({isShow: true})
    }

    handleClose = () => {
      this.setState({isShow: false})
    }

      render() {
        return (
          <div>
            <button className="createListButton" onClick={this.handleShow}>Create new board</button>
            <Form isShow={this.state.isShow} handleClose={this.handleClose}></Form>
          </div>
        );
      }
}

export default Create;