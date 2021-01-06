import React, { Component } from "react";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentContent: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.commentContent != null) {
      this.props.handleSubmit(this.state.commentContent);
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            id="comment"
            name="commentContent"
            placeholder="New comment"
            onChange={this.handleChange}
          />
        </div>
        <div className="from-group">
          <button type="submit" className="btn btn-sm btn-info float-right">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default AddComment;
