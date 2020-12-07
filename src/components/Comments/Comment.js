import React, { Component } from "react";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      author: props.author,
    };
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-start w-100">
        <div>{this.state.author}:</div>
        <div className="px-2 py-1 mx-2" style={{ backgroundColor: "silver" }}>
          {this.state.text}
        </div>
      </div>
    );
  }
}

export default Comment;
