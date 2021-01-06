import React, { Component } from "react";
import AddComment from "./AddComment";

class CommentsView extends Component {
  render() {
    return (
      <div className="w-100 d-flex flex-column justify-content-start align-items-start">
        {this.props.comments}
        <div className="mt-3 w-100">
          <hr />
          <AddComment handleSubmit={this.props.addComment} />
        </div>
      </div>
    );
  }
}

export default CommentsView;
